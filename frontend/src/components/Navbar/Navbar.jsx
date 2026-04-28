import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
    window.location.reload(); 
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">Plant Care</Link>
        </div>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/solutions" className="nav-links">Solutions</Link>
          </li>
          <li className="nav-item">
            <a href="#footer" className="nav-links">Contact Us</a>
          </li>
          <li className="nav-item">
            <Link to="/history" className="nav-links">History</Link>
          </li>
        </ul>

        <div className="nav-auth">
          { }
          {!token ? (
            <button className="signin-btn" onClick={() => setShowLogin(true)}>
              Sign In
            </button>
          ) : (
            <div className="nav-profile-logout">
              <button className="logout-btn" onClick={logout}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;