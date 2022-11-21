import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from './Login';
import Room from "./Room";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/:room' element={<Room />}></Route>
      </Routes>
    </div>
  );
}

export default App;
