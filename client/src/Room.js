import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UnoContext } from "./UnoContext";
import parse from "html-react-parser";
import PickUpDeck from "./components/PickUpDeck";
import Table from "./components/Table";
import './Room.css'

const Room = () => {
  const navigate = useNavigate();
  const {
    socket,
    username,
    playingDeck,
    setPlayingDeck,
    deck,
    setDeck,
    userDataList,
    setUserDataList,
    turn, setTurn,
    activePlayer, setActivePlayer
  } = useContext(UnoContext);

  useEffect(() => {
    socket.on("initialDeck", (cards) => {
      setDeck(cards);
    });
    socket.on('playingDeck', (tableCards) => {
      setPlayingDeck(tableCards)
    })
    
  }, [userDataList]);

  useEffect(() => {
    socket.on('displayUser', (displayUser) => {
      setActivePlayer(displayUser)
    })
  }, [userDataList])

  useEffect(()=> {
    socket.on('changeTurn', (turn) => {
      setTurn(turn)
    })
  }, [playingDeck])

  const handleLeave = (e) => {
    e.preventDefault();
    navigate("/");
  };

  console.log(turn, 'here username')
  const handlePlayCard = (cards) => {
    if(username.order === turn) {
      const wildCard = cards.action;
      if (!!wildCard){
        if((cards.color === playingDeck[0].color) || (wildCard === playingDeck[0].action)) {
          console.log('inside wildcard if')
          const currentPlayer = userDataList.find((user) => user.id === username.id);
          const indexPlayer = userDataList.findIndex((user) => user.id === username.id);
          const cardIndex = currentPlayer.cards.findIndex((card) => card.id === cards.id);
          currentPlayer.cards.splice(cardIndex, 1);
          userDataList.splice(indexPlayer, 1, currentPlayer);
          playingDeck.unshift(cards);
          let nextTurn = turn+1;
          // setTurn(nextTurn)
          username.order = username.order + 4
          socket.emit('playCard', userDataList, playingDeck);
          socket.emit('turnBaseGame', nextTurn)
          socket.emit('updateUser', username)
        } 
      }
      else if ((cards.color === playingDeck[0].color) || (cards.digit === playingDeck[0].digit)) {
        console.log('inside normal cards if')
        const currentPlayer = userDataList.find((user) => user.id === username.id);
        const indexPlayer = userDataList.findIndex((user) => user.id === username.id);
        const cardIndex = currentPlayer.cards.findIndex((card) => card.id === cards.id);
        currentPlayer.cards.splice(cardIndex, 1);
        userDataList.splice(indexPlayer, 1, currentPlayer);
        playingDeck.unshift(cards);
        let nextTurn = turn+1;
        // setTurn(nextTurn)
        username.order = username.order + 4
        socket.emit('playCard', userDataList, playingDeck);
        socket.emit('turnBaseGame', nextTurn)
        socket.emit('updateUser', username)
      }
    }
    else {
      console.log('not same order');
    }
  };

  const currentTurn = activePlayer?.find(user => user.order === turn);

  console.log(currentTurn, 'current turn')
  console.log(activePlayer, 'active player')

  if (userDataList.length < 1){
    return (
      <section className="waiting--container">
          <h2>Waiting for all players...</h2>
          <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <div className="waiting__players--container">
          {userDataList?.map((users, index) => <h3 key={users.id} className='players__title'>Player {index+1}: {users.player}</h3>)}
        </div>
      </section>
    )
  }
  else {
    return (
      <>
      <main>
      <div className="room__left">
        <h3>Current player is: {currentTurn?.user}</h3>
        {userDataList?.map((data) => {
          return (
            <div key={data.id}>
            <h3>Player: {data.player}</h3>
            <section className="card__hand--container">
              {data.cards.map((cards) => {
                return (
                  <article
                    key={cards.id}
                    onClick={() => handlePlayCard(cards)}
                    className="card__hand"
                    style={{ color: cards.color}}
                  >
                    {parse(cards.code)}
                  </article>
                );
              })}
            </section>
        </div>
          );
        })}
        </div>
        <div className="room__right">
        <section>
        <h2>Table</h2>
          <PickUpDeck />
        </section>
        <section>
          <Table />
        </section>
          <button className="btn__room" onClick={handleLeave}>Leave Room</button>
        </div>
        </main>
      </>
    );
  }
};

export default Room;
