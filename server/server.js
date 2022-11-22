const { Server } = require('socket.io');
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: 'GET'
  },
});
let usernames = []
let userCount = 0
io.on("connection", (socket) => {

  socket.on('joinRoom', (room, username) => {
    userCount++;
    usernames.push(username);
    socket.join(room, username);
    socket.to(room).emit('currentUser', username)
    io.sockets.emit('allUsers', usernames)
    console.log(`${username} with id ${socket.id} joined room ${room}`);
    socket.on('disconnect', () => {
      --userCount;
      usernames.pop(username);
      console.log(`${username} with id ${socket.id} left room ${room}`);
    })
  })
});

server.listen(8080)