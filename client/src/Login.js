import { useState, useContext, useEffect } from 'react';
import { UnoContext } from './UnoContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [response, setResponse] = useState();
  const {socket, setUsername, username, room, setRoom, user, setUser, fetchCards, fireCards, svgCards} = useContext(UnoContext);

  const navigate = useNavigate();
  let deck;
  const joinRoom = async (e) => {
    let initialDeck = []
    console.log(initialDeck);

    e.preventDefault();
    if(e.target[0].value && e.target[1].value) {
       
        socket.on('initialDeck', (deck) => {
          initialDeck.push(deck);
        })
        setUsername(e.target[0].value);
        socket.emit('joinRoom', {room : e.target[1].value, user: e.target[0].value, deck: initialDeck})
        // socket.emit('handleDeck', initialDeck)
        setUser([...user, {user: e.target[0].value, room: e.target[1].value}])
        navigate(`${e.target[1].value}`)
      }
  }

  useEffect(() => {
    fetchCards();
    console.log(fireCards, 'cards from firebase')
  }, [])

  return (
    <form onSubmit={joinRoom}>
      <h1>Login</h1>
      <label htmlFor='username'>User: </label>
      <input type='text' />
      <label htmlFor='room'>Room: </label>
      <input type='text' />
      <button type='submit'>Confirm</button>
    </form>
  )
}

export default Login;