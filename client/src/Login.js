import { useState, useContext, useEffect } from 'react';
import { UnoContext } from './UnoContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [response, setResponse] = useState();
  const {socket, user, setUser, setUsername} = useContext(UnoContext);
  const navigate = useNavigate();
  
  const joinRoom = async (e) => {
    e.preventDefault();
    if(e.target[0].value && e.target[1].value) {
        socket.emit('joinRoom', e.target[1].value, e.target[0].value)
        setUser([...user, {user: e.target[0].value, room: e.target[1].value}])
        setUsername(e.target[0].value);
        navigate(`${e.target[1].value}`)
      }
  }

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