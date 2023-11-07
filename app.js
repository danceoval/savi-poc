const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const {usecaseObj, planObj, dataSourcesObj} = require('./responses')

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

  //First step: Select Data Streams
  socket.on('userConnected', async (info) => {
    setTimeout(() => {
      io.emit('response-usecase', usecaseObj); // Broadcast the message to front-end
    }, 7200);
  })

  // Second step: Show Upskilling Plan

  socket.on('start-plan', async () => {
    setTimeout(() => {
      io.emit('response-plan', planObj);
    }, 8800);
  })

  socket.on('get-help', async () => {
    setTimeout(() => {
      io.emit('set-help', 'Get better that this!!');
    }, 5800);
  })



  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});