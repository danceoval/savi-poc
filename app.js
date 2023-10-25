const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const {usecase, upskillingPlan, planStart} = require('./responses')

const PORT = process.env.PORT || 3000;


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

  //First step: Share Usecase
  socket.on('userConnected', async (info) => {
    io.emit('response', usecase); // Broadcast the message to front-end
  })

  // Second step: Show Upskilling Plan
  socket.on('show-plan', async (message) => {
    io.emit('response', upskillingPlan);
  })



  socket.on('start-plan', async () => {
    io.emit('response', planStart);
  })



  socket.on('send-bad', async (file) => {
    console.log("Bad evidence")
    const evidenceResponse = `Please correct the following mistakes in your submission:
    1) Data Curation: Submission does not match current user’s organization 
    2) Data Formatting: Please ensure submission is a .pdf file
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