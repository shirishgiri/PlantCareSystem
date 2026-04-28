import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <h2>Plant Care</h2>
            <p>We are here for your plant care needs.</p>
              <div className="footer-social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src={assets.facebook_icon} alt="Facebook" />
                </a>

                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <img src={assets.linkedin_icon} alt="LinkedIn" />
                </a>
              </div>
        </div>
        <div className="footer-content-center">
            <h2>Services</h2>
            <ul>
              <li><Link to="/" className="nav-links">AI Prediction</Link></li>
              <li><Link to="/solutions" className="nav-links">Plant Diseases Solutions</Link></li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <ul>
                <li>+44 07-1234-5678</li>
                <li>info@plantcare.com</li>
            </ul>
        </div>
      </div>
      <hr />
    <p>© 2026 Plant Care. All rights reserved.</p>
    </div>
  )
}

export default Footer
