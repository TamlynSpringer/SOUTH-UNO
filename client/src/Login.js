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
    userDataList,
    setUserDataList, setRoom
  } = useContext(UnoContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("allUserData", (userData) => {
      setUserDataList(userData);
    });
  }, [username]);

  const joinRoom = async (e) => {
    e.preventDefault();
    const newId = uuidv4();
    if (e.target[0].value && e.target[1].value) {
      const newPlayer = { user: e.target[0].value, id: newId, order: userDataList.length + 1, room: e.target[1].value, position: userDataList.length + 1};
      socket.emit('updateUser', newPlayer)
      setUsername(newPlayer);
      socket.emit("joinRoom", newPlayer);
      setRoom(e.target[1].value)
      setUser([...user, newPlayer]);
      navigate(`/room/${e.target[1].value}`);
    }
  };

  return (
   <main className="main">
    <form className="login__form" onSubmit={joinRoom}>
      <div className="login__form--container">
        <h1 className="login__form--header">Join Room</h1>
        <label className="login__form--label" htmlFor="username">User: </label>
        <input className="login__form--input" type="text" placeholder="e.g. Jane.."/>
        <label className="login__form--label" htmlFor="room">Room: </label>
        <input className="login__form--input" type="text" placeholder="e.g. Game.."/>
        <button className="login__form--button" type="submit">Confirm</button>
      </div>
    </form>
    </main>  
  );
};

export default Login;
