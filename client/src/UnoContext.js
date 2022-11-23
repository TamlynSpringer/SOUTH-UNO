import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import {firestore } from './firebase/config';

export const UnoContext = createContext();
const socket = io("http://localhost:8080");

const UnoProvider = ({children}) => {

  const [username, setUsername] = useState();
  const [userDataList, setUserDataList] = useState([]);
  const [user, setUser] = useState([]);
  const [otherUser, setOtherUser] = useState();
  const [firstHand, setFirstHand] = useState();
  const [secondHand, setSecondHand] = useState();
  const [thirdHand, setThirdHand] = useState();
  const [fourthHand, setFourthHand] = useState();
  const [deck, setDeck] = useState();
  const [room, setRoom] = useState('');
  const [fireCards, setFireCards] = useState([]);
  const [svgCards, setSvgCards] = useState([]);

  const fetchCards = async () => {
    const req = await firestore.collection('deck').get();
    const tempCards = req.docs.map(card => ({...card.data(), id:card.id}))
    setFireCards(tempCards)
  }

  const fetchSVGCards = async () => {
    const req = await firestore.collection('svg').get();
    const tempSVGCards = req.docs.map(card => ({...card.data(), id:card.id}));
    setSvgCards(tempSVGCards)
  }

  //added all the cards to the firestore
  // const sendToDB = async () => {
  //   const req = await firestore.collection('cards').doc('allCards').set({cards: allCards});
  //   return req;
  // }
  
  return (
    <UnoContext.Provider value={{username, setUsername, user, setUser, socket, deck, setDeck, firstHand, setFirstHand, secondHand, setSecondHand,thirdHand, setThirdHand, fourthHand, setFourthHand, room, setRoom, otherUser, setOtherUser, fetchCards, fetchSVGCards, fireCards, svgCards, userDataList,setUserDataList}}>
      {children}
    </UnoContext.Provider>
  )
}

export default UnoProvider;