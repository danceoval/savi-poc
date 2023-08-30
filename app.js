const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const bodyParser = require('body-parser')
const {db, User} = require('./db')


const {openai} = require("./config/open-ai.js")
const {createManagerPrompt, createEmployeePrompt, createToolPrompt} = require("./config/prompts.js")


const PORT = process.env.PORT || 3000;

/*
Auth Setup
*/

app.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
});

app.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})


/* Chat GPT Setup */
async function getCompletion(messages){
  let model = "gpt-3.5-turbo";
  try {
        const completion = await openai.createChatCompletion({
            model,
            messages
        })
        return completion.data.choices[0].message.content
    } catch (e) {
        console.log(e)
    }
}



/* Socket Setup */
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:1234",
    methods: ["GET", "POST"]
  }
});



io.on('connection', (socket) => {
  console.log('A user connected');
  let history; 

  socket.on('userConnected', async (info) => {
    prompt = createManagerPrompt(info);
    history = [['system', prompt]]
    const messages = history.map(([role, content]) => ({role, content}));
    //const completedResponse = await getCompletion(messages)
    const completedResponse = `
    You should take advantage of school observation and quarterly student survey data to pinpoint teaching methods that resonate most positively with students.
    Based on the insights, you should create a best practice playbook that he distributed to all teachers you support. 
    You should also use sentiment analysis to quickly and accurately identify personalized improvement opportunities for each teacher and school
    Doing all of the above will improve your effectiveness as an Educational Consultant
    `;
    io.emit('response', completedResponse); // Broadcast the message to front-end
  })


  socket.on('employee-message', async (info) => {
    console.log("USE CASE FROM EMPLPOYEE ", info)
    prompt = createEmployeePrompt(info);
    history = [['system', prompt]]
    const messages = history.map(([role, content]) => ({role, content}));
    const completedResponse = await getCompletion(messages)
    io.emit('response', completedResponse); // Broadcast the message to front-end
  })

  socket.on('message', async (message) => {
    try {
        const messages = history.map(([role, content]) => ({role, content}));
        messages.push({role : 'user', content: message});
        const completedResponse = await getCompletion(messages)
        io.emit('response', completedResponse); // Broadcast the message to front-end
      } catch (e){
        console.error(e)
      }
    
  });

  socket.on('get-tools', async (plan) => {
    try {
      const prompt = createToolPrompt(plan);
      const completedResponse = await getCompletion(messages)
      io.emit('set-tools', completedResponse); // Broadcast the message to front-end
    } catch(e){
      console.error(e)
    }
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, async () => {
  await db.sync()
  console.log(`Server is running on port ${PORT}`);
});