import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddUser from './components/AddUser/AddUser';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="user/add" element={<AddUser></AddUser>}></Route>
        <Route path="/" element={<Home></Home>}></Route>

      </Routes>
    </div>
  );
}

export default App;
