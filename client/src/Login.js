import { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { UnoContext } from './UnoContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'


const Login = () => {
  const {socket, setUsername, username, user, setUser, fetchCards, fireCards, svgCards, userDataList, setUserDataList, sendToDB} = useContext(UnoContext);
  const navigate = useNavigate();

  const joinRoom = async (e) => {
    e.preventDefault();
    const newId = uuidv4();
    if(e.target[0].value && e.target[1].value) {
        setUsername({user: e.target[0].value, id:newId});
        socket.emit('joinRoom', {room : e.target[1].value, user: e.target[0].value, id:newId})
        setUser([...user, {user: e.target[0].value, room: e.target[1].value}])
        navigate(`/room/${e.target[1].value}`)
      }
  }

  // useEffect(()=> {
  //   sendToDB()
  // }, [])

  return (
    <form className='login__form' onSubmit={joinRoom}>
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