import { unoBack } from "../utils/unoBack";
import { useContext } from "react";
import { UnoContext } from "../UnoContext";
import take_cards from "../assets/take_card.mp3"


const PickUpDeck = () => {
  const { deck, setDeck, username, userDataList, setUserDataList, socket } = useContext(UnoContext);

  const takeSound = () => {
    return new Audio(take_cards).play()
  }

  const handlePickUpDeck = () => {
    takeSound();
    const user = userDataList.find(user => user.id === username.id)
    const copyDeck = [...deck];
    const oneCard = copyDeck[0].splice(0,1)
    setDeck(copyDeck)
    user.cards.push(oneCard[0]);
    const userIndex = userDataList.findIndex(user => user.id === username.id);
    const updateUser = userDataList.splice(userIndex, 1, user);
    socket.emit('pickUpDeck', copyDeck, updateUser)
  }

  return (
    <article onClick={handlePickUpDeck}>
      {unoBack}
    </article>
  )
}

export default PickUpDeck