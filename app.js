const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const bodyParser = require('body-parser')
const {db, User} = require('./db')


const {openai} = require("./config/open-ai.js")
const {createManagerPrompt, createEmployeePrompt, createToolPrompt} = require("./config/prompts.js")


const PORT = process.env.PORT || 3000;

const hardcodedResponse = `
        You should use Vertex AI to perform sentiment analysis on school observation and quarterly student survey data.
        
        
        Step 1 — Data Collection and Preparation
        Gather school observation data and quarterly student survey data from all relevant sources, ensuring the data is accurate and up-to-date
        Preprocess the data to remove any inconsistencies, missing values, and outliers that could skew the analysis
        Organize the data into a structured format that can be easily analyzed, such as a spreadsheet
        Learn more about data preparation for sentiment analysis here

        
        Step 2 — Sentiment Analysis
        Perform sentiment analysis on the student survey data to quantify the positive and negative sentiments associated with different teaching methods
        Learn about sentiment analysis here

        
        Step 3 — Identification of Best Practices 
        Based on the analysis, pinpoint teaching methods that consistently resonate most positively with students
        Collaborate with education experts and instructional designers, if necessary, to validate the identified best practices
        Document these best practices in a comprehensive playbook, including explanations, examples, and implementation guidelines

        
        Step 4 — Playbook Creation and Distribution 
        Compile the best practices and insights into a well-structured playbook format.
        Ensure the playbook is easily accessible and user-friendly, considering digital formats (PDFs, web pages, etc) for distribution
        Distribute the playbook to all teachers you support, providing video recordings, training sessions, and workshops to explain its content and implementation strategies
        
        
        Step 5 — Personalized Improvement Opportunities 
        Use Vertex AI to quickly process and analyze individual teacher performance and student feedback
        Automatically generate personalized reports for each teacher, highlighting their strengths and areas for improvement based on sentiment analysis results
        Learn about using sentiment analysis to automate personalized report creation here
        
        
        Step 6 — Teacher Support and Continuous Improvement
        Hold individual meetings with teachers to discuss their personalized improvement opportunities and provide guidance on implementing best practices
        Foster a collaborative environment where teachers can share their experiences and insights with each other
        Regularly update the playbook with new insights and practices based on ongoing data collection and analysis
        
        
        Step 7 — Monitoring and Evaluation 
        Continuously monitor the impact of the implemented best practices on student engagement, learning outcomes, and overall satisfaction
        Collect feedback from teachers about the effectiveness and usability of the playbook, making necessary adjustments
        Periodically review and refine the sentiment analysis algorithms to improve accuracy and relevance
        
        
        Step 8 — Reporting and Communication 
        Create reports summarizing the improvements in teaching methods and their impact on student satisfaction and learning outcomes
        Share these reports with school administrators, stakeholders, and teachers to demonstrate the value of the implemented strategies
        
        
        Step 9 — Iteration and Adaptation 
        Regularly review the effectiveness of the playbook and the sentiment analysis process
        Adapt the playbook and strategies as education trends, student preferences, and teaching methodologies evolve

      `;


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

  socket.on('start-plan', async () => {
    console.log("SOCKET PLAN START")
    const planResponse = `
      Let's get started!

      Your current objective is — Data Collection and Preparation
      
      Your goals are as follows...
      - Gather school observation data and quarterly student survey data from all relevant sources, ensuring the data is accurate and up-to-date
      - Preprocess the data to remove any inconsistencies, missing values, and outliers that could skew the analysis
      - Organize the data into a structured format that can be easily analyzed, such as a spreadsheet
      - Learn more about data preparation for sentiment analysis here

      When you are ready, upload a spreadsheet, pdf or doc evincing your completion of these goals.
    `;

    io.emit('response', planResponse);
  })



  socket.on('send-evidence', async (file) => {
    const evidenceResponse = `  
    You made the following mistakes in your documentation:
    
    1) Lack of Negation Handling: Not accounting for negations (words like "not" or "never") can result in misclassified sentiments, as these words can reverse the sentiment orientation of a sentence
    
    2) Lack of text normalization (stemming, lemmatization)
    
    3) There are 273 irrelevant characters, symbols, and special characters
    `;
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