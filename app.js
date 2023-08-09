/*
TODO

* Loading Message in between prompts, specifically implementation.
* Instead of chat, give "Show me the implementation plan and dependencies", "Show me a different use case" buttons.
* Instead of chat, give "Implement the recommendation", "Show me a different use case" buttons.
* Steal phrase from pitch deck for title "Savi AI you trusted assistant" x
* Same for implementation plan. "The following is the implementation plan and dependencies to consider"

DONE
* Make form all at once, instead of 1-by-1 X
* Space out prev/next X
* Savvy logo at top instead of Chat w/ Savi x 
* Form seems small, look at google form. Font too small x
* Left-align text, with space between paragraphs (like ChatGPT) x
* Space between bullet points.  x
* Make field wider  x
* Make Savi sounds more human. "I would recommend the following use for your company based on my AI and business expertise and your personal situation" x


*/


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const bodyParser = require('body-parser')
const server = http.createServer(app);

const {openai} = require("./config/open-ai.js")
const createPrompt = require("./config/prompts.js")

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
    prompt = createPrompt(info);
    history = [['system', prompt]]
    const messages = history.map(([role, content]) => ({role, content}));
    const completedResponse = await getCompletion(messages)
    io.emit('response', completedResponse); // Broadcast the message to front-end
  })

  socket.on('message', async (message) => {
    console.log('Received message:', message);
    try {
      const messages = history.map(([role, content]) => ({role, content}));
      messages.push({role : 'user', content: message});
      const completedResponse = await getCompletion(messages)
      io.emit('response', completedResponse); // Broadcast the message to front-end
    } catch (e){
      console.error(e)
    }
    
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});