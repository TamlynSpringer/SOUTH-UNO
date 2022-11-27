import { Link } from "react-router-dom";
import './Home.css'
import uno from './uno.png'
import { useContext, useEffect } from "react";
import { UnoContext } from "./UnoContext";

const Home = () => {
  const {
    socket,
    username,
    userDataList,
    setUserDataList,
  } = useContext(UnoContext);

  useEffect(() => {
    socket.on("allUserData", (userData) => {
      setUserDataList(userData);
    });
  }, [username]);

  console.log(userDataList, 'userDataList length in home')

  return (
    <section className="section__logo">
      <img className="uno-logo" src={uno} alt="uno-logo" />
    </section>
  )
}

export default Home;