import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { UnoContext } from "./UnoContext";

const Room = () => {
  const navigate = useNavigate();
  const {socket, username, deck, setDeck, firstHand, setFirstHand, secondHand, setSecondHand, thirdHand, setThirdHand, fourthHand, setFourthHand, room, userDataList, setUserDataList, allHands, setAllHands} = useContext(UnoContext);

  useEffect(() => {
    socket.on('allUserData', (userData) => {
      setUserDataList(userData);
    })
    
  }, [username])

  useEffect(() => {
    socket.on('initialDeck', (cards) => {
      setDeck(cards)
    })
  }, [userDataList])

  console.log(deck, 'here is the deck')
  console.log(userDataList, 'here are all hands');

  const handleLeave = (e) => {
    e.preventDefault();
    navigate('/')
  }
  if(userDataList) {
    return (
      <>
        {userDataList?.map((data) => {
        return (
        <section key={data.id}>
          <h3>{data.player}</h3>
          {data.cards.map((cards) => {
            return (
              <article key={cards.id}>{cards.number}</article>
            )
          })
          }

        </section>)
        
        })}
      
      <section>
        <button onClick={handleLeave}>Leave Room</button>
      </section>
      </>
    )
  }
}

export default Room;