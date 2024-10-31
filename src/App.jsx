import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import Home from './components/Home';
import Login from './components/Login';
import Menù from './components/Menù';
import Prenotazione from './components/Prenotazione';
import './App.css';
import Registrazione from './components/Registrazione';
import Disponibilità from './components/Disponibilità';



function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Registrazione />} />
        <Route path="/menù" element={<Menù token={token} />} />
        <Route path="/prenotazione" element={<Prenotazione token={token} />} />
        <Route path="/disponibilita" element={<Disponibilità />} />
       
    </Routes>
    </Router>
  );
}

export default App;
