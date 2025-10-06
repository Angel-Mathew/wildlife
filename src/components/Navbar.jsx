import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you'll create a CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <div className="logo-box">
        <img src="/elysia.png" alt="Elysia Logo" className="logo" />
        <img src="/design(2).png" alt="Elysia " className="ribbon" />
        <span className="name">Elysia</span> 
      </div>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/categories">Categories🐾</Link>
        </li>
        <li>
          <Link to="/sightings">Sightings🐾</Link>
        </li>
        <li>
          <Link to="/my-journey">My Journey🐾</Link>
        </li>
      </ul>
    
      <img src="/gold.png" alt="Gold Corner" className="gold" />
    </nav>
    
  );
};

export default Navbar;