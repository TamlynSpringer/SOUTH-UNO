import { Link } from "react-router-dom";
import Svg from "./components/Svg";
import './Home.css'

const Home = () => {
  return (
    <>
      <header className="header">
        <h1>Uno-South</h1>
        <Link to='login'>
          <h2>Login</h2>
        </Link>
      </header>
      <main>
        <Svg/>
      </main>
    </>
  )
}

export default Home;