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


let userData = [];
let userCount = 0;
let cards = [{id: 1, number: 1, color: 'blue'}, {id: 2, number: 1, color: 'red'}, {id: 3, number: 2, color: 'blue'}, {id: 4, number: 2, color: 'red'}, {id: 5, number: 1, color: 'green'}, {id: 6, number: 1, color: 'yellow'}, {id: 7, number: 2, color: 'green'}, {id: 8, number: 2, color: 'yellow'}, {id: 9, number: 3, color: 'yellow'}, {id: 10, number: 3, color: 'green'}, {id: 11, number: 3, color: 'blue'}, {id: 12, number: 3, color: 'red'}, {id: 13, number: 4, color: 'yellow'}, {id: 14, number: 4, color: 'red'}, {id: 15, number: 4, color: 'blue'}, {id: 16, number: 4, color: 'green'}];
let deck = [];
let hand;

function dealCards () {
    let copy = [...cards]
    const hands = copy.splice(0, 3)
    cards = copy 
    return hands;
}  

io.on("connection", (socket) => {
  
  socket.on('joinRoom', (data) => {
    hand = dealCards()
    const newTry = {player: data.user, cards: hand, order: userCount, id: userCount}
    userCount++;
    console.log(data.deck);
    userData.push(newTry);
    socket.join(data.room, data.user);
    socket.to(data.room).emit('currentUser', data.user)
    io.sockets.emit('allUserData', userData)
    io.sockets.emit('initialDeck', cards)
    console.log(`${data.user} with id ${socket.id} joined room ${data.room}`);
    socket.on('disconnect', () => {
      --userCount;
      userData.pop(data);
      console.log(`${data.username} with id ${socket.id} left room ${data.room}`);
    })
  })
});




server.listen(8080)