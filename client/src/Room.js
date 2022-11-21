import { useContext, useEffect } from "react";
import { UnoContext } from "./UnoContext";

const Room = () => {
  const {socket, username, deck, setDeck, firstHand, setFirstHand, secondHand, setSecondHand, thirdHand, setThirdHand, fourthHand, setFourthHand, room, userList, setUserList, otherUser, setOtherUser, user, setUser} = useContext(UnoContext);

  function giveCards () {
    console.log(userList, 'inside givecards');
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
  // console.log(firstHand, 'here is first hand')
  // console.log(secondHand, 'here is second hand')
  // console.log(thirdHand, 'here is third hand')
  // console.log(fourthHand, 'here is fourth hand')
  // console.log(deck, 'her is the deck');

  useEffect(() => {
    giveCards();
  }, [userList])

  useEffect(() => {
    socket.on('receiveUserInfo', (userInfo) => {
      const otherUser = userInfo?.map((data) => {
        return {
          user: data.user,
          room: data.room
        }
      })
      setOtherUser(otherUser);
    });
  }, [socket])

  useEffect(() => {
    const allUsers = user.concat(otherUser)
    setUserList(allUsers)
  }, [username, otherUser])

  if(username) {
    return (
      <section>
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
      </section>
    )
  }
}

export default Room;