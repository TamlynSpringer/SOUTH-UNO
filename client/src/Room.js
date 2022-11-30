import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UnoContext } from "./UnoContext";
import parse from "html-react-parser";
import PickUpDeck from "./components/PickUpDeck";
import Table from "./components/Table";
import { Modal } from "./components/Modal";
import played_card from "./assets/played_card.mp3"
import './Room.css';
import { unoBack } from "./utils/unoBack";

const Room = () => {
  const navigate = useNavigate();
  const {
    deck,
    setDeck,
    socket,
    username,
    playingDeck,
    setPlayingDeck,
    userDataList,
    turn, setTurn,
    activePlayer,
    setActivePlayer,
    backgroundColor, 
    setBackgroundColor, 
    scores, 
    setScores, 
    showModal, 
    setShowModal,
    sendScoresToDB,
    scoreBoard, 
    setScoreBoard,
    fetchScoreboardsFb
  } = useContext(UnoContext);

  const playedSound = () => {
    return new Audio(played_card).play()
  }

  useEffect(() => {
    fetchScoreboardsFb()
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

  const winner = userDataList.find((cards) => cards.cards.length === 0)
  
  useEffect(() => {
    setShowModal(false);
    if (userDataList.find((cards) => cards.cards.length === 0)) {
      const winnerData = { user: winner.player, score: 1 }
      setScores(winnerData)
      setShowModal(true);
      sendScoresToDB(winnerData);
    }
  }, [userDataList])
  console.log(userDataList, 'player hands')

  const handlePlayCard = (cards) => {
    // console.log(nextPlayer, 'here is next order')
    let remaindingTurn
    if(turn > 4){
     remaindingTurn = turn % 4;
     if (remaindingTurn === 0) {
      remaindingTurn = 4
     }
    } else {
      remaindingTurn = turn;
    }
    if(username.order === remaindingTurn) {

      const wildCard = cards.action;
      if (!!wildCard){
        if((cards.color === playingDeck[0].color) || (wildCard === playingDeck[0].action)) {
          const currentPlayer = userDataList.find((user) => user.id === username.id);
          const indexPlayer = userDataList.findIndex((user) => user.id === username.id);
          const cardIndex = currentPlayer.cards.findIndex((card) => card.id === cards.id);
          const nextPlayer = userDataList?.find((user) => user.order === indexPlayer + 2);
          currentPlayer.cards.splice(cardIndex, 1);
          userDataList.splice(indexPlayer, 1, currentPlayer);
          playingDeck.unshift(cards);
          let nextTurn = turn + 1; 
          if (wildCard === 'skip') {
            nextTurn = turn + 2;
          } else if (wildCard === 'draw two') {
            const copyDeck = [...deck]
            const drawTwo = copyDeck[0].splice(0, 2);
            nextTurn = turn + 2;
            nextPlayer.cards.push(drawTwo[0]);
            nextPlayer.cards.push(drawTwo[1]);
            const indexNextPlayer = userDataList.findIndex((user) => user.id === nextPlayer.id);
            userDataList.splice(indexNextPlayer, 1, nextPlayer);
            socket.emit('powerCards', copyDeck);           
          }
          socket.emit('playCard', userDataList, playingDeck);
          socket.emit('turnBaseGame', nextTurn)
          socket.emit('updateUser', username)
          playedSound();
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
        let nextTurn
        nextTurn = turn + 1;
        socket.emit('playCard', userDataList, playingDeck);
        socket.emit('turnBaseGame', nextTurn, bgColor)
        socket.emit('updateUser', username)
        playedSound();
      }
    }
    else {
      console.log('Not same order');
    }
  };

const currentTurn = activePlayer?.find(user => user.order === turn);

  if (userDataList.length !== 4){
    return (
    <main className="main">  
      <section className="waiting--container">
          <h2>Waiting for all players...</h2>
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <div className="waiting__players--container">
          {userDataList?.map((users, index) => <h3 key={users.id} className='players__title'>Player {index+1}: {users.player}</h3>)}
        </div>
      </section>
      </main> 
    )
  }
  else {
    return (
      <>
      <main className="main" style={{background: `radial-gradient(#FFF, #FFF, ${backgroundColor})`}}>
        <div className="container">
          <h2 className="current__player">current player is: {currentTurn?.user}</h2>
          {userDataList?.map((data) => {
            return (
              <div key={data.id} className={data.id === username.id ? 'card__hand--active' : 'players'}>
              <h3 className="player__name">{data.player}</h3>
              <section className={data.id === username.id ? 'card__hand--container' : 'player__hand--container'} >
                {data.cards.map((cards) => {
                  if (data.id === username.id) {
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
                  } else {
                    return (
                    <div className="upper__cards">
                    <article
                    key={cards.id}
                    className="card__hand__top"
                  >
                    <div className="uno-back">{unoBack}</div>
                  </article>
                  </div>
                    )
                  }
                })}
              </section>
            </div>

          );
        })}
        {showModal ? <Modal handleQuit={handleQuit}/> : null}
        <div className="center__table">
          <section className="section__deck">
            <PickUpDeck />
          </section>
          <section className="section__table">
            <Table />
          </section>
        </div> 
        <div className="leave__btn__room">
          <button className="btn__room" onClick={handleQuit}>End Game</button>
        </div>  
      </div> 
    </main>
      </>
    );
  }
};

export default Room;
