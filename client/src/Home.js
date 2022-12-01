import './Home.css'
import uno from './uno.png'
import { useContext, useEffect } from "react";
import { UnoContext } from "./UnoContext";
import { southHome } from './utils/southHome';
import { Link } from "react-router-dom";


const Home = () => {
  const {
    socket,
    username,
    setUserDataList,
  } = useContext(UnoContext);

  useEffect(() => {
    socket.on("allUserData", (userData) => {
      setUserDataList(userData);
    });
  }, [username]);

  return (
    <main className='main__home'>
    <section className="section__logo">
          { southHome}
      <h1 className='home__h1'>4 player UNO game</h1>
      <Link to='login'> <button className='btn__play'>Play</button> </Link>
    </section>
    </main> 
  )
}

export default Home;


         