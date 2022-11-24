const { Server } = require('socket.io');
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http');
const {firestore} = require('./firebase.js');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: 'GET'
  },
});

const fetchCardsFb = async () => {
  const req = await firestore.collection('cards').get();
  const unoCards = req.docs.map(card => ({...card.data()}))
  const shuffled = shuffleDeck(unoCards[0].cards)
  return shuffled;
};

const shuffleDeck = (unoDeck) =>{
  const shuffle = unoDeck?.sort(() => {
    return Math.random() - 0.5;
  }) 
  return shuffle;
}

// fetchCardsFb().then(data => data[0].cards);

let userData = [];
let userCount = 0;
let hand;

function dealCards (unoDeck) {
  const hands = unoDeck.splice(0, 3)
  return hands;
}
const cardDeckCopy = [];

const deckCopy = async () =>{
  const unoCards = await fetchCardsFb();
  cardDeckCopy.push(unoCards);
};

deckCopy();

io.on("connection", (socket) => {
  
  socket.on('joinRoom', async (data) => {
    
    hand = dealCards(cardDeckCopy[0]);
    const playerData = {player: data.user, cards: hand, order: userCount, id: data.id}
    userCount++;
    userData.push(playerData);
    socket.join(data.room, data.user);
    socket.to(data.room).emit('currentUser', data.user)
    io.sockets.emit('allUserData', userData)
    io.sockets.emit('initialDeck', cardDeckCopy)
    console.log(`${data.user} with id ${socket.id} joined room ${data.room}`);
    socket.on('disconnect', () => {
      --userCount;
      userData.pop(data);
      console.log(`${data.username} with id ${socket.id} left room ${data.room}`);
    })

  })
  socket.on('pickUpDeck', (newDeck, updatedUser) => {
    cardDeckCopy.splice(0, cardDeckCopy.length, ...newDeck)
    const userIndex = userData.findIndex(user => user.id === updatedUser[0].id)
    userData.splice(userIndex, 1, updatedUser[0]);
    io.sockets.emit('allUserData', userData)
    io.sockets.emit('initialDeck', cardDeckCopy)
  })
  socket.on('gameStart', (startingCard, startGameDeck) => {
    cardDeckCopy.splice(0, cardDeckCopy.length, ...startGameDeck);
    io.sockets.emit('initialDeck', cardDeckCopy)
    io.sockets.emit('startingCard', startingCard)
  })
  socket.on('playCard', (updatedUserList, playingDeck) => {
    console.log(playingDeck, 'playing deck')
    userData.splice(0, userData.length, ...updatedUserList);
    io.sockets.emit('allUserData', userData)
    io.sockets.emit('playingDeck', playingDeck)
  })
});

server.listen(8080)

