import { useState, useContext, useEffect } from 'react';
import { UnoContext } from './UnoContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [response, setResponse] = useState();
  const {socket, setUsername, username, room, setRoom, userList, setUserList, user, setUser} = useContext(UnoContext);
  const navigate = useNavigate();
  
  const joinRoom = async (e) => {
    e.preventDefault();
    if(username && room) {
      await socket.emit('joinRoom', room, username)
      setUser([...user, {user: username, room: room}])
      await socket.emit("sendUserInfo", [...userList, {
        user: username,
        room: room
      }])
    }    
    navigate(`${room}`)
  }

  useEffect(() => {

  }, [])

  return (
    <form onSubmit={joinRoom}>
      <h1>Login</h1>
      <label htmlFor='username'>User: </label>
      <input type='text' onChange={(e) => setUsername(e.target.value)}/>
      <label htmlFor='room'>Room: </label>
      <input type='text' onChange={(e) => setRoom(e.target.value)}/>
      <button type='submit'>Confirm</button>
    </form>
  )
}

export default Login;