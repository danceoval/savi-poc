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
  let messages = [] 

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



 




  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});