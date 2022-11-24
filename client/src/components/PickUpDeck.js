import { unoBack } from "../utils/unoBack";
import { useContext } from "react";
import { UnoContext } from "../UnoContext";

const PickUpDeck = () => {
  const { deck, setDeck, username, userDataList, setUserDataList, socket } = useContext(UnoContext);
  const handlePickUpDeck = () => {
    const user = userDataList.find(user => user.id === username.id)
    const copyDeck = [...deck];
    const oneCard = copyDeck[0].splice(0,1)
    setDeck(copyDeck)
    socket.emit('pickUpDeck', copyDeck)
    user.cards.push(oneCard[0]);
    const userIndex = userDataList.findIndex(user => user.id === username.id);
    console.log(userIndex)
    const updateUser = userDataList.splice(userIndex, 1, user);
    console.log(updateUser, 'update user')
  }

  return (
    <article onClick={handlePickUpDeck}>
      {unoBack}
    </article>
  )
}

export default PickUpDeck