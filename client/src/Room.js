import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { UnoContext } from "./UnoContext";
import Svg from "./components/Svg";
import parse from "html-react-parser";
import PickUpDeck from "./components/PickUpDeck";

const Room = () => {
  const navigate = useNavigate();
  const { socket, username, setDeck, userDataList, setUserDataList} = useContext(UnoContext);

  useEffect(() => {
    socket.on('allUserData', (userData) => {
      setUserDataList(userData);
    })
  }, [username])
  console.log(userDataList, 'user list')

  useEffect(() => {
    socket.on('initialDeck', (cards) => {
      setDeck(cards)
    })
  }, [userDataList])

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
              <article key={cards.id}>
                {cards.digit}
                {/* {parse(cards.code)} */}
              </article>
            )
          })
          }
        </section>)
        })}
      <section>
        <PickUpDeck />
      </section>
      <section>
        <button onClick={handleLeave}>Leave Room</button>
      </section>
      </>
    )
  }
}

export default Room;