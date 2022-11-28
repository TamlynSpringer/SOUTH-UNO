import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from './Login';
import Room from "./Room";
import Home from "./Home";
import About from './About';
import Rules from './Rules';
import Header from './components/Header';
import Scoreboard from "./Scoreboard";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/rules' element={<Rules />}></Route>
        <Route path='/scoreboard' element={<Scoreboard />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/room/:room' element={<Room />}></Route>
      </Routes>
    </div>
  );
}

export default App;
