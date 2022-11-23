import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { UnoContext } from "./UnoContext";
import Svg from "./components/Svg";

const Room = () => {
  const navigate = useNavigate();
  const {socket, username, deck, setDeck, firstHand, setFirstHand, secondHand, setSecondHand, thirdHand, setThirdHand, fourthHand, setFourthHand, room, userList, setUserList, otherUser, setOtherUser, user, setUser} = useContext(UnoContext);

  function giveCards () {
    let copyDeck = [...deck];
    const first = copyDeck.splice(0, 3);
    const second = copyDeck.splice(0, 3);
    const third = copyDeck.splice(0, 3);
    const fourth = copyDeck.splice(0, 3);
    setFirstHand(first);
    setSecondHand(second);
    setThirdHand(third);
    setFourthHand(fourth);
    setDeck(copyDeck);
  }

  function drawCards (playerName) {
    //playername should be a string
    let copyDeck = [...deck];
    const userIndex = userList?.findIndex(data => data === playerName);
    if(userIndex === -1) {
      return;
    }
    const playerHand = copyDeck.splice(0, 1);
    if(userIndex === 0) {
      setFirstHand(prevCards => [...prevCards, playerHand]);
    }
    if(userIndex === 1) {
      setSecondHand(prevCards => [...prevCards, playerHand]);
    }
    if(userIndex === 2) {
      setThirdHand(prevCards => [...prevCards, playerHand]);
    }
    if(userIndex === 3) {
      setFourthHand(prevCards => [...prevCards, playerHand]);
    }
    setDeck(copyDeck);
  }

  useEffect(() => {
    giveCards();
  }, [])

  useEffect(() => {
    socket.on('allUsers', (usernames) => {
      setUserList(usernames);
    })
  })

  const handleLeave = (e) => {
    e.preventDefault();
    navigate('/')
  }
  
  if(username) {
    return (
      <>
      <section>
        {userList?.map((user, index) => <p key={index}>{user}</p>)}
        <h1>Welcome, {username}</h1>
        <article>
        <h3>First hand: </h3>
        {firstHand?.map(cards => {
          return (
            <div key={cards.id}>
              <p style={{color: cards.color}}>{cards.number}</p>
            </div>
          )
        })}
        </article>
        <article>
        <h3>Second hand: </h3>
        {secondHand?.map(cards => {
          return (
            <div key={cards.id}>
              <p style={{color: cards.color}}>{cards.number}</p>
            </div>
          )
        })}
        </article>
        <article>
        <h3>Third player hand: </h3>
        {thirdHand?.map(cards => {
          return (
            <div key={cards.id}>
              <p style={{color: cards.color}}>{cards.number}</p>
            </div>
          )
        })}
        </article>
        <article>
        <h3>Fourth player hand: </h3>
        {fourthHand?.map(cards => {
          return (
            <div key={cards.id}>
              <p style={{color: cards.color}}>{cards.number}</p>
            </div>
          )
        })}
        </article>
      </section>
      <section>
        <Svg />
      </section>
      <section>
        <button onClick={handleLeave}>Leave Room</button>
      </section>
      </>
    )
  }
}

export default Room;