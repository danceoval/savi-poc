const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const {openai} = require("./config/open-ai.js")
const prepPrompt = require("./config/prompts.js")

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

  const history = [['user', prepPrompt]];

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