import React, { useContext, useEffect, useState } from 'react'
import { UnoContext } from '../UnoContext';

const Table = () => {
  const { socket, deck, setDeck, userDataList, setUserDataList, playingDeck, setPlayingDeck} = useContext(UnoContext);
  const [gameActive, setGameActive] = useState(false);
  const handleStartGame = () => {
    const deckCopy = [...deck];
    const startingCard = deckCopy[0].splice(0,1)
    console.log(startingCard, 'starting card');
    setGameActive(true);
    socket.emit('gameStart', startingCard, deckCopy)
  }

  useEffect(() => {
    socket.on('startingCard', (startingCard) => {
      setPlayingDeck(startingCard)
    })
  },[gameActive])
  
  return (
    <section>
      {playingDeck ? playingDeck.map((card) => {return (<article key={card.id}>{card.digit}</article>)}) : ''}
      {gameActive? '' : <button onClick={handleStartGame}>Start</button>}
      {/* need to send button to backend */}
    </section>
  )
}

export default Table