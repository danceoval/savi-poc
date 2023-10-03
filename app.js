const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const bodyParser = require('body-parser')
const {db, User} = require('./db')


const {openai} = require("./config/open-ai.js")
const {createManagerPrompt, createEmployeePrompt, createToolPrompt} = require("./config/prompts.js")


const PORT = process.env.PORT || 3000;

const hardcodedResponse = `<h3>Sentiment Analysis with Vertex AI</h3>
        
        <h4 class="highlight">Goals:</h4>
        <ul>
          <li>Prepare Teacher Interview training data for sentiment analysis</li>
          <li>Train a Sentiment Analysis model to identify top teaching improvement opportunities</li>
          <li>Evaluate the Sentiment Analysis model</li>
          <li>Leverage predictions for Teacher feedback and trainings</li>
        </ul>
        
        <h4 class="highlight">Step 1 — Data Collection and Preparation</h4>
        
        <ol>
          <li>Gather teacher interview notes</li>
          <li>Clean collected data</li>
          <li>Tag training set with Vertex AI</li>
        </ol>
        
        <p>Learn more about data preparation for sentiment analysis <u class='highlight'>here</u></p>
        
        <h4 class="highlight">Step 2 — Training a Sentiment Analysis model</h4>
        <ol>
          <li>Set up your project & environment</li>
          <li>Create text classification dataset</li>
          <li>Train classification model</li>
        </ol>
        
        <p>Learn about training a sentiment analysis model <u class='highlight'>here</u>.</p>
        
        <h4 class="highlight">Step 3 — Identifying Improvement Opportunities from Predictions</h4> 
        <ol>
          <li>Analyze individual teacher performance and student feedback</li>
          <li>Automatically generate personalized reports for each teacher, highlighting their strengths and areas for improvement</li>
        </ol>
        
        <p>Learn about using sentiment analysis to automate personalized report creation <u class='highlight'>here</u>.
        
        <h4 class="highlight">Step 4 — Teacher Support and Continuous Improvement</h4>
        <ol>
          <li>Hold individual meetings with teachers to discuss their personalized improvement opportunities</li>
          <li>Foster a collaborative environment where teachers can share their experiences and insights with each other</li>
          <li>Regularly update the playbook with new insights and practices based on ongoing data collection and analysis</li>
        </ol>`;


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
    const completedResponse = `<span class="highlight">Thank you</span> for answering our questions!
    We've identified an opportunitiy to use <strong><i>Sentiment Analysis</i></strong> to identify insights within teacher interview transcripts.
    This will allow you to quickly and accurately identify personalized improvement opportunities for each teacher and school.
    We can get your team set up using a tool called <strong class="highlight">Vertex AI</strong>. You can read more about it <u class='highlight'>here</u>.  `;
    io.emit('response', completedResponse); // Broadcast the message to front-end
  })

  socket.on('start-plan', async () => {
    console.log("SOCKET PLAN START")
    const planResponse = `<h3 class="highlight">Step 1 — Data Collection and Preparation</h3>
    
    <p>Your goals are as follows...</p>
    <ol>
        <li>Gather school observation data and quarterly student survey data from all relevant sources, ensuring the data is accurate and up-to-date</li>
        <li>Preprocess the data to remove any inconsistencies, missing values, and outliers that could skew the analysis</li>
        <li>Organize the data into a structured format that can be easily analyzed, such as a spreadsheet</li>
        <li>Learn more about data preparation for sentiment analysis <u class="highlight">here</u></li>
    </ol>
    
    When you are ready, <i>upload a spreadsheet, pdf or doc evincing your completion of these goals!</i>
    
    <h4>Recommended Content:</h4>
      <ul>
        <li ><u class="highlight">Overview: Sentiment Analysis for Educational Data</u></span> (8 mins) </li>
        <li ><u class="highlight">Jumpstart: Sentiment Analysis with Vertex AI</u> </span> (7 mins) </li>
        <li ><u class="highlight">Cleaning Text with Vertex AI</u> </span> (5 mins)</li>
      </ul>`;

    io.emit('response', planResponse);
  })



  socket.on('send-evidence', async (file) => {
    const evidenceResponse = `You made the following mistakes in your documentation:
    1) Lack of Negation Handling: Not accounting for negations (words like "not" or "never") can result in misclassified sentiments, as these words can reverse the sentiment orientation of a sentence 
    2) Lack of text normalization (stemming, lemmatization)
    3) There are 273 irrelevant characters, symbols, and special characters`;
    io.emit('response', evidenceResponse);

  })


  socket.on('employee-message', async (info) => {
    console.log("USE CASE FROM EMPLPOYEE ", info)
    prompt = createEmployeePrompt(info);
    history = [['system', prompt]]
    const messages = history.map(([role, content]) => ({role, content}));
    const completedResponse = await getCompletion(messages)
    io.emit('response', completedResponse); // Broadcast the message to front-end
  })

  socket.on('show-plan', async (message) => {
    try{
      const messages = history.map(([role, content]) => ({role, content}));
      messages.push({role : 'user', content: message});
      io.emit('response', hardcodedResponse);
    }catch (err) {
      console.log('Oh no! ', err)
    }
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