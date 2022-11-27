import React, { useContext, useEffect, useState } from 'react'
import parse from "html-react-parser";
import { UnoContext } from '../UnoContext';
import './Table.css'

const Table = () => {
  const { socket, deck, setDeck, userDataList, setUserDataList, playingDeck, setPlayingDeck,backgroundColor, setBackgroundColor} = useContext(UnoContext);
  const [gameActive, setGameActive] = useState(false);
  const handleStartGame = () => {
    const deckCopy = [...deck];
    const startingCard = deckCopy[0].splice(0,1);
    const colorStart = startingCard[0].color;
    setGameActive(true);
    socket.emit('gameStart', startingCard, deckCopy, colorStart)
  }

  useEffect(() => {
    socket.on('startingCard', (startingCard) => {
      setPlayingDeck(startingCard)
    })
  },[gameActive])

  return (
    <>
      {playingDeck ? playingDeck.map((card, index) => {
        if(index === 0) {
          return (<article key={card.id}>{parse(card.code)}</article>)
        }
        }) : ''}
      {gameActive ? '' : <button className="btn__table" onClick={handleStartGame}>Start</button>}
      {/* need to send button to backend */}
    </>
  )
}

export default Table