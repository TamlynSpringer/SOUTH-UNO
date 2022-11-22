import { createContext, useState } from "react";
import { io } from "socket.io-client";
import {firestore } from './firebase/config';

export const UnoContext = createContext();
const socket = io("http://localhost:8080");

const UnoProvider = ({children}) => {
  const cards = [{id: 1, number: 1, color: 'blue'}, {id: 2, number: 1, color: 'red'}, {id: 3, number: 2, color: 'blue'}, {id: 4, number: 2, color: 'red'}, {id: 5, number: 1, color: 'green'}, {id: 6, number: 1, color: 'yellow'}, {id: 7, number: 2, color: 'green'}, {id: 8, number: 2, color: 'yellow'}, {id: 9, number: 3, color: 'yellow'}, {id: 10, number: 3, color: 'green'}, {id: 11, number: 3, color: 'blue'}, {id: 12, number: 3, color: 'red'}, {id: 13, number: 4, color: 'yellow'}, {id: 14, number: 4, color: 'red'}, {id: 15, number: 4, color: 'blue'}, {id: 16, number: 4, color: 'green'}];

  const [username, setUsername] = useState();
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState([]);
  const [otherUser, setOtherUser] = useState('');
  const [firstHand, setFirstHand] = useState();
  const [secondHand, setSecondHand] = useState();
  const [thirdHand, setThirdHand] = useState();
  const [fourthHand, setFourthHand] = useState();
  const [deck, setDeck] = useState(cards);
  const [room, setRoom] = useState('');

  const [fireCards, setFireCards] = useState([]);

  const fetchCards = async () => {
    const req = await firestore.collection('deck').orderBy('timeOn', 'desc').get();
    const tempCards = req.docs.map(card => ({...card.data(), id:card.id}))
    setFireCards(tempCards)
  }
  
  return (
    <UnoContext.Provider value={{username, setUsername, user, setUser, socket, deck, setDeck, firstHand, setFirstHand, secondHand, setSecondHand,thirdHand, setThirdHand, fourthHand, setFourthHand, room, setRoom, userList, setUserList, otherUser, setOtherUser, fetchCards, fireCards}}>
      {children}
    </UnoContext.Provider>
  )
}

export default UnoProvider;