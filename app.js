const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const bodyParser = require('body-parser')
const {db, User} = require('./db')


const {openai} = require("./config/open-ai.js")
const {createManagerPrompt, createEmployeePrompt, createToolPrompt} = require("./config/prompts.js")
const {usecase} = require('./responses')

const PORT = process.env.PORT || 3000;



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
    io.emit('response', usecase); // Broadcast the message to front-end
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
        <li ><u class="highlight">Preparing your Data for Sentiment Analysis with Vertex AI</u> </span> (5 mins) </li>
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
  console.log(`Server is running on port ${PORT}`);
});