import { createContext, useState, useReducer } from "react";
import { io } from "socket.io-client";
import {firestore } from './firebase/config';
import { allCards } from "./allCards";

export const UnoContext = createContext();
const socket = io(process.env.REACT_APP_BACKEND_URL);

const UnoProvider = ({children}) => {

  const [username, setUsername] = useState();
  const [turn, setTurn] = useState();
  const [userDataList, setUserDataList] = useState([]);
  const [user, setUser] = useState([]);
  const [deck, setDeck] = useState();
  const [room, setRoom] = useState('');
  const [svgCards, setSvgCards] = useState([]);
  const [playingDeck, setPlayingDeck] = useState([]);
  const [activePlayer, setActivePlayer] = useState();
  const [backgroundColor, setBackgroundColor] = useState();

  const fetchSVGCards = async () => {
    const req = await firestore.collection('svg').get();
    const tempSVGCards = req.docs.map(card => ({...card.data(), id:card.id}));
    setSvgCards(tempSVGCards)
  }

  const sendToDB = async () => {
    const req = await firestore.collection('cards').doc('allCards').set({cards: allCards});
    return req;
  }
  
  return (
    <UnoContext.Provider value={{ username, setUsername, user, setUser, socket, deck, setDeck, room, setRoom, fetchSVGCards, svgCards, userDataList, setUserDataList, playingDeck, setPlayingDeck, sendToDB, turn, setTurn, activePlayer, setActivePlayer, backgroundColor, setBackgroundColor}}>
      {children}
    </UnoContext.Provider>
  )
}

export default UnoProvider;