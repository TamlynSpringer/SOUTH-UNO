import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { UnoContext } from "./UnoContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const {
    socket,
    setUsername,
    username,
    user,
    setUser,
    fetchCards,
    fireCards,
    svgCards,
    userDataList,
    setUserDataList,
    sendToDB,
  } = useContext(UnoContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("allUserData", (userData) => {
      setUserDataList(userData);
    });
  }, [username]);
  
  console.log(userDataList.length, 'userDataList length')

  const joinRoom = async (e) => {
    e.preventDefault();
    const newId = uuidv4();
    if (e.target[0].value && e.target[1].value) {
      socket.emit('updateUser', { user: e.target[0].value, id: newId, order: userDataList.length + 1 })
      setUsername({ user: e.target[0].value, id: newId, order: userDataList.length + 1 });
      socket.emit("joinRoom", {
        room: e.target[1].value,
        user: e.target[0].value,
        id: newId,
      });
      setUser([...user, { user: e.target[0].value, room: e.target[1].value }]);
      navigate(`/room/${e.target[1].value}`);
    }
  };

  // useEffect(()=> {
  //   sendToDB()
  // }, [])

  return (
    <form className="login__form" onSubmit={joinRoom}>
      <div className="login__form--container">
        <h1>Join Room</h1>
        <label htmlFor="username">User: </label>
        <input className="login__form--input" type="text" placeholder="e.g. Jane.."/>
        <label htmlFor="room">Room: </label>
        <input className="login__form--input" type="text" placeholder="e.g. Game.."/>
        <button className="login__form--button" type="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Login;
