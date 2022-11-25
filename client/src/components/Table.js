import React, { useContext, useEffect, useState } from 'react'
import parse from "html-react-parser";
import { UnoContext } from '../UnoContext';

const Table = () => {
  const { socket, deck, setDeck, userDataList, setUserDataList, playingDeck, setPlayingDeck} = useContext(UnoContext);
  const [gameActive, setGameActive] = useState(false);
  const handleStartGame = () => {
    const deckCopy = [...deck];
    const startingCard = deckCopy[0].splice(0,1)
    setGameActive(true);
    socket.emit('gameStart', startingCard, deckCopy)
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
      {gameActive ? '' : <button onClick={handleStartGame}>Start</button>}
      {/* need to send button to backend */}
    </>
  )
}

export default Table