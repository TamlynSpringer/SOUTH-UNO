import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from './Login';
import Room from "./Room";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/room/:room' element={<Room />}></Route>
      </Routes>
    </div>
  );
}

export default App;
