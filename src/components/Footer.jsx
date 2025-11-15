import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; //  created a CSS file for styling
import Sign from '../pages/Sign';
const Footer = () => { 
    return ( // the footer and design of the footer is under main div (parent div),this is done to make the footer process easy
           <div>
            <div className="design">
            <img src="/animals1.png" alt="animals1" className="animals" />
            <img src="/animals2.png" alt="animals2" className="animals" />
            </div>
            <footer>
   <img src="elysia.png" alt="Footer" className="footer-icon" />
  <div className="footer-text">
  <h2>Contacts:</h2>
   <h3>
    <a href="https://www.instagram.com/elysia_wildlife/" target="_blank" rel="noopener noreferrer" style={{color:"black"}}>Instagram</a> |
    <a href="https://www.facebook.com/elysiawildlife" target="_blank" rel="noopener noreferrer" style={{color:"black"}}> Facebook</a> |
    <a href="https://Youtube.com/elysia_wildlife" target="_blank" rel="noopener noreferrer" style={{color:"black"}}> YouTube</a> |
    <a href="https://www.linkedin.com/in/elysia-wildlife-123456789/" target="_blank" rel="noopener noreferrer" style={{color:"black"}}> LinkedIn</a>|
    <a href="https://www.email.com/in/elysia-wildlife-123456789/" target="_blank" rel="noopener noreferrer" style={{color:"black"}}> email</a>|
    <a href="https://www.whatsapp.com/elysia_wildlife/" target="_blank" rel="noopener noreferrer" style={{color:"black"}}> Whatsapp</a>
   </h3>
    <h3>© 2025 Elysia. All rights reserved.</h3>
    <div className="sign-up-link"><Sign/></div>
  </div>
</footer>
           </div>
    );
};

export default Footer;
