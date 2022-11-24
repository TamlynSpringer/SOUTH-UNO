import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UnoContext } from "./UnoContext";
import parse from "html-react-parser";
import PickUpDeck from "./components/PickUpDeck";
import Table from "./components/Table";

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
  } = useContext(UnoContext);

  useEffect(() => {
    socket.on("allUserData", (userData) => {
      setUserDataList(userData);
    });
  }, [username]);

  useEffect(() => {
    socket.on("initialDeck", (cards) => {
      setDeck(cards);
    });
    socket.on('playingDeck', (tableCards) => {
      console.log(tableCards, 'front')
      setPlayingDeck(tableCards)
    })
  }, [userDataList]);


  console.log(deck);
  const handleLeave = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handlePlayCard = (id, card) => {
    const currentPlayer = userDataList.find((user) => user.id === username.id);
    const indexPlayer = userDataList.findIndex((user) => user.id === username.id);
    const cardIndex = currentPlayer.cards.findIndex((card) => card.id === id);
    currentPlayer.cards.splice(cardIndex, 1);
    userDataList.splice(indexPlayer, 1, currentPlayer);
    playingDeck.unshift(card);
    socket.emit('playCard', userDataList, playingDeck);
  };
  if (userDataList) {
    return (
      <>
        {userDataList?.map((data) => {
          return (
            <section key={data.id}>
              <h3>{data.player}</h3>
              {data.cards.map((cards) => {
                return (
                  <article
                    key={cards.id}
                    onClick={() => handlePlayCard(cards.id, cards)}
                    style={{ color: cards.color, cursor: "pointer" }}
                  >
                    {cards.digit}
                    {/* {parse(cards.code)} */}
                  </article>
                );
              })}
            </section>
          );
        })}
        <section>
          <PickUpDeck />
        </section>
        <section>
          <Table />
        </section>
        <section>
          <button onClick={handleLeave}>Leave Room</button>
        </section>
      </>
    );
  }
};

export default Room;
