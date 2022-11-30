import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UnoContext } from "./UnoContext";
import parse from "html-react-parser";
import PickUpDeck from "./components/PickUpDeck";
import Table from "./components/Table";
import { Modal } from "./components/Modal";
import played_card from "./assets/played_card.mp3"
import './Room.css';
import { unoBack } from "./utils/unoBack";
import { unoBtn } from "./utils/UnoBtn";

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
    fetchScoreboardsFb,
    isUno, 
    setIsUno,
    setUnoModal
  } = useContext(UnoContext);
  const [current, setCurrent] = useState('')
  const playedSound = () => {
    return new Audio(played_card).play()
  }

  useEffect(() => {
    fetchScoreboardsFb()
    socket.on("initialDeck", (cards) => {
      setDeck(cards);
    });
    socket.on('playingDeck', (tableCards) => {
      console.log(tableCards.length, 'table cards size')
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
    socket.on('currentTurn', (currentTurn) => {
      setCurrent(currentTurn)
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


  // const userOnUno = userDataList?.find((cards) => cards.cards.length === 1 && cards.clickedUno === false);

  let userDataListCopy = [...userDataList]
  const filteredUno = userDataListCopy.filter((user) => user.cards.length === 1)
  console.log(filteredUno, 'filtered uno players')

  // useEffect(() => {
  //   if (userOnUno) {
  //    setIsUno(true)
  //   }
  // }, [userDataList])

  // useEffect(() => {
  //   if (filteredUno) {
  //     for (let i=0; i<filteredUno.length; i++) {
  //       filteredUno[i].isUno = true
  //       let index = userDataListCopy?.findIndex((user) => user.id === filteredUno[i].id);
  //       userDataList.splice(index, 1, filteredUno[i]);
  //       socket.emit('setUnoStatus', userDataList)
  //     }
  //   }
  // }, [isUno])

  // console.log(isUno, 'here is is uno')

  const handleUnoClick = (user) => {
        const playerHasUno = filteredUno.find(player => player.id === user.id)
        const notClickedUno = filteredUno.filter((player) => !player.clickedUno)
        const otherPlayers = userDataListCopy?.find((player) => player.id === user.id);
        console.log(playerHasUno, 'player has uno')
        if (playerHasUno && !playerHasUno.clickedUno) {
          const userOnUnoIndex = userDataListCopy?.findIndex((player) => player.id === user.id);
          playerHasUno.clickedUno = true;
          userDataList.splice(userOnUnoIndex, 1, playerHasUno);
          socket.emit('setUnoStatus', userDataList)
        } 
        else if (otherPlayers && notClickedUno) {
          console.log('inside penalty')
                  const copyDeck = [...deck]
                  const unoPenalty = copyDeck[0].splice(0, 3);
                  notClickedUno.forEach((player) => {
                    player.isUno = false
                    player.cards.push(...unoPenalty)})
                  // userDataList.splice(userOnUnoIndex, 1, userOnUno);
                  // socket.emit('unoCall', userDataList, copyDeck)
                }
        console.log(notClickedUno, 'not clicked uno')
        console.log(otherPlayers, 'other player')
        
        // else {
  //     if(userOnUno.clickedUno !== true) {
  //       const copyDeck = [...deck]
  //       const unoPenalty = copyDeck[0].splice(0, 3);
  //       userOnUno.cards.push(...unoPenalty);
  //       userDataList.splice(userOnUnoIndex, 1, userOnUno);
  //       socket.emit('unoCall', userDataList, copyDeck)
  //     }
  //     console.log('uno called already')
  //   }
    // const onUnoIndex = userDataList?.findIndex((cards) => cards.cards.length === 1);
    // if (userOnUno && isUno) {
    //   if(userOnUno.id === user.id) {
    //     setIsUno(false)

    //     console.log(`UNO clicked, player ${user.user} has one card remaining!`)
    //   } else {
    //     const copyDeck = [...deck]
    //     const unoPenalty = copyDeck[0].splice(0, 3);
    //     userOnUno.cards.push(...unoPenalty);
    //     userDataList.splice(onUnoIndex, 1, userOnUno);
    //     socket.emit('unoCall', userDataList, copyDeck)
    //   }
    // }
  }

  console.log(userDataList, 'here are users')

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
 
  const handlePlayCard = (cards) => {
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
          console.log(currentPlayer, 'currentPlayer here')
          const indexPlayer = userDataList.findIndex((user) => user.id === username.id);
          const cardIndex = currentPlayer.cards.findIndex((card) => card.id === cards.id);
          const nextPlayer = userDataList?.find((user) => user.order === remaindingTurn%4 + 1);
          currentPlayer.cards.splice(cardIndex, 1);
          playingDeck.unshift(cards);
          let nextTurn = turn + 1; 
          if (wildCard === 'skip') {
            nextTurn = turn + 2;
            const nextPlayerDrawTwo = userDataList?.find((user) => user.order === (remaindingTurn + 2)%4);
            socket.emit('currentPlayer', nextPlayerDrawTwo)
          } else if (wildCard === 'draw two') {
            const copyDeck = [...deck]
            const drawTwo = copyDeck[0].splice(0, 2);
            nextTurn = turn + 2;
            nextPlayer.cards.push(...drawTwo);
            const indexNextPlayer = userDataList.findIndex((user) => user.id === nextPlayer.id);
            userDataList.splice(indexNextPlayer, 1, nextPlayer);
            const nextPlayerDrawTwo = userDataList?.find((user) => user.order === (remaindingTurn + 2)%4);
            socket.emit('currentPlayer', nextPlayerDrawTwo)
            socket.emit('powerCards', copyDeck);   
          }
          if(currentPlayer.cards.length === 1) {
            currentPlayer.isUno = true
          } else {
            currentPlayer.isUno = false
          }
          userDataList.splice(indexPlayer, 1, currentPlayer);
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
        const nextPlayer = userDataList?.find((user) => user.order === remaindingTurn%4 + 1);
        const bgColor = cards.color;
        currentPlayer.cards.splice(cardIndex, 1);
        playingDeck.unshift(cards);
        let nextTurn
        nextTurn = turn + 1;
        if(currentPlayer.cards.length === 1) {
          currentPlayer.isUno = true
        } else {
          currentPlayer.isUno = false
        }
        userDataList.splice(indexPlayer, 1, currentPlayer);
        socket.emit('playCard', userDataList, playingDeck);
        socket.emit('turnBaseGame', nextTurn, bgColor)
        socket.emit('updateUser', username)
        socket.emit('currentPlayer', nextPlayer)
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
          <h2 className="current__player">current player is: {currentTurn? currentTurn.user : current?.player}</h2>
          {/* {isUno ? <div onClick={() => handleUnoClick(username)} className='unoBtn'>{unoBtn}</div> : <div className='unoBtn'>{unoBtn}</div>} */}
          <div onClick={() => handleUnoClick(username)} className='unoBtn'>{unoBtn}</div>
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
                    <div key={data.id} className="upper__cards">
                    <article
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
