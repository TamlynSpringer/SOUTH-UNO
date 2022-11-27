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
    setDeck,
    userDataList,
    turn, setTurn,
    activePlayer,
    setActivePlayer,
    backgroundColor, 
    setBackgroundColor
  } = useContext(UnoContext);

  console.log(backgroundColor, 'here is background color from room')

console.log(userDataList, 'here is list')

  useEffect(() => {
    socket.on("initialDeck", (cards) => {
      setDeck(cards);
    });
    socket.on('playingDeck', (tableCards) => {
      setPlayingDeck(tableCards)
    });
    socket.on('initialColor', (bgColor)=>{
      setBackgroundColor(bgColor)
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
    }); 
    socket.on('newBackColor' ,(bgColor)=>{
      setBackgroundColor(bgColor)
    })
  }, [userDataList])

  const handleQuit = (e) => {
    e.preventDefault();
    navigate("/");
    socket.emit('quitGame')
  };

  const handlePlayCard = (cards) => {
    if(username.order === turn) {
      const wildCard = cards.action;
      if (!!wildCard){
        if((cards.color === playingDeck[0].color) || (wildCard === playingDeck[0].action)) {
          const currentPlayer = userDataList.find((user) => user.id === username.id);
          const indexPlayer = userDataList.findIndex((user) => user.id === username.id);
          const cardIndex = currentPlayer.cards.findIndex((card) => card.id === cards.id);
          currentPlayer.cards.splice(cardIndex, 1);
          userDataList.splice(indexPlayer, 1, currentPlayer);
          playingDeck.unshift(cards);
          let nextTurn
          if (wildCard === 'skip') {
            nextTurn = turn + 2;
          } else {
            nextTurn = turn+1;
          }
          username.order = username.order + 4;
          socket.emit('playCard', userDataList, playingDeck);
          socket.emit('turnBaseGame', nextTurn)
          socket.emit('updateUser', username)
        } 
      }
      else if ((cards.color === playingDeck[0].color) || (cards.digit === playingDeck[0].digit)) {
        const currentPlayer = userDataList.find((user) => user.id === username.id);
        const indexPlayer = userDataList.findIndex((user) => user.id === username.id);
        const cardIndex = currentPlayer.cards.findIndex((card) => card.id === cards.id);
        const bgColor = cards.color;
        currentPlayer.cards.splice(cardIndex, 1);
        userDataList.splice(indexPlayer, 1, currentPlayer);
        playingDeck.unshift(cards);
        let nextTurn = turn+1;
        username.order = username.order + 4
        socket.emit('playCard', userDataList, playingDeck);
        socket.emit('turnBaseGame', nextTurn, bgColor)
        socket.emit('updateUser', username)
      }
    }
    else {
      console.log('not same order');
    }
  };
console.log(userDataList)
const currentTurn = activePlayer?.find(user => user.order === turn);

  if (userDataList.length !== 4){
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
      <main className="main" style={{background: `radial-gradient(#FFF, #FFF, ${backgroundColor})`}}>
      <div className="container">
        <h2 className="current__player">Current player is: {currentTurn?.user}</h2>
        {userDataList?.map((data) => {
          return (
            <div key={data.id} className={`player${data.position}`}>
            <h3 className="player__name">Player: {data.player}</h3>
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
        <div className="center__table">
        <section className="section__deck">
          <PickUpDeck />
        </section>
        <section className="section__table">
          <Table />
        </section>
        <button className="btn__room" onClick={handleQuit}>End Game</button>
      </div> 
      </div> 
    </main>
      </>
    );
  }
};

export default Room;
