import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { UnoContext } from "./UnoContext";

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
        <button onClick={handleLeave}>Leave Room</button>
      </section>
      </>
    )
  }
}

export default Room;