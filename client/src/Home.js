import { Link } from "react-router-dom";
import './Home.css'
import uno from './uno.png'

const Home = () => {
  return (
    <>
      <header className="header">
        <h1 className="header__h1">SOUTH UNO</h1>
        <Link to='login' className="header__links">
          <h2 className="header__links">Join</h2>
        </Link>
      </header>
      <section className="section__logo">
        <img className="uno-logo" src={uno} alt="uno-logo" />
      </section>
      {/* <main>
        <Svg/>
      </main> */}
    </>
  )
}

export default Home;