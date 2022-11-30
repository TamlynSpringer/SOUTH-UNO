import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from './Login';
import Room from "./Room";
import Home from "./Home";
import About from './About';
import Rules from './Rules';
import Burger from './components/Burger';


function App() {
  return (
    <div className="App">
      <Burger />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/rules' element={<Rules />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/room/:room' element={<Room />}></Route>
      </Routes>
    </div>
  );
}

export default App;
