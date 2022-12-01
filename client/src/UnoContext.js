import { createContext, useState } from "react";
import { io } from "socket.io-client";
import {firestore } from './firebase/config';

export const UnoContext = createContext();
const SOCKET_LINK = process.env.REACT_APP_BACKEND_URL || 'https://uno-back-production.up.railway.app/';

let socket = io(SOCKET_LINK);

const UnoProvider = ({children}) => {

  const [username, setUsername] = useState();
  const [showModal, setShowModal] = useState(false);
  const [turn, setTurn] = useState();
  const [userDataList, setUserDataList] = useState([]);
  const [user, setUser] = useState([]);
  const [deck, setDeck] = useState();
  const [room, setRoom] = useState('');
  const [svgCards, setSvgCards] = useState([]);
  const [playingDeck, setPlayingDeck] = useState([]);
  const [activePlayer, setActivePlayer] = useState();
  const [backgroundColor, setBackgroundColor] = useState();
  const [isUno, setIsUno] = useState(false);
  const [unoModal, setUnoModal] = useState(false);

  const fetchSVGCards = async () => {
    const req = await firestore.collection('svg').get();
    const tempSVGCards = req.docs.map(card => ({...card.data(), id:card.id}));
    setSvgCards(tempSVGCards)
  }

  return (
    <UnoContext.Provider value={{ username, setUsername, user, setUser, socket, deck, setDeck, room, setRoom, fetchSVGCards, svgCards, userDataList, setUserDataList, playingDeck, setPlayingDeck, turn, setTurn, activePlayer, setActivePlayer, backgroundColor, setBackgroundColor, showModal, setShowModal, isUno, setIsUno, unoModal, setUnoModal }}>
      {children}
    </UnoContext.Provider>
  )
}

export default UnoProvider;