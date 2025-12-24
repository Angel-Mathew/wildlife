import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
        {/*---------------- Logo -----------*/ }
          <div className="logo-box">
        <img src="/wildsoar.png" alt="wildsoarLogo" className="logo" />
        <img src="/design(2).png" alt="wildsoar" className="ribbon" />
        <span className="name">WildSoar</span> 
      </div>
        </Link>
      </div>
       {/*---------------- Nav links -----------*/ }
      <ul className="navbar-links">
        <li>
          <Link to="/categories">Categories🐾</Link>
        </li>
        <li>
          <Link to="/sightings">Sightings🐾</Link>
        </li>
        <li>
          <Link to="/Journey">My Journey🐾</Link>
        </li>
      </ul>
     
     <Link to = "/postpg" className='post'>Post</Link>
      {/*---------------- Corner design-------*/ }
      <img src="/gold.png" alt="Gold Corner" className="gold" />
    </nav>
    
  );
};

export default Navbar;