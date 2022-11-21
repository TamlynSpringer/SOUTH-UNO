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

io.on("connection", (socket) => {

  socket.on('joinRoom', (room, username) => {
    socket.join(room, username)
    socket.to(room).emit('currentUser', username)
    // console.log(`${username} with id ${socket.id} joined room ${room}`);
  })
  socket.on("sendUserInfo", (userInfo) => {
    socket.to(userInfo[0].room).emit('receiveUserInfo', userInfo)
    console.log(userInfo, 'here is userinfo');
  })

  // console.log(socket.id, 'new id')
  socket.emit("hello", 'please work', (res) => {
    // console.log(res, 'please work')
  });

  socket.on("test", (...args) => {
    // console.log(args, 'receive message from the client')
  });

});

server.listen(8080)