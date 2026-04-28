import React, { useState, useEffect } from "react";
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import LoginPopup from './components/LoginPopup/LoginPopup'
import Solutions from "./pages/Solutions/Solutions"
import Home from "./pages/Home/Home"
import History from "./pages/History/History"


function App() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLogin]);

  return (
    <>
      <div className='app'>
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          < Route path='/solutions' element={<Solutions />} />
          < Route path='/history' element={<History />} />
        </Routes>
      </div>
      <Footer />
    </>
  );  
}

export default App;
