import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you'll create a CSS file for styling
import Navbar from '../components/Navbar'; // Adjust the path if your Navbar.jsx is in a different folder

const Home = () => {
  return (
    <main className="home-container"> <section id="intro">
    <img src="/mainbg.png" alt="Main Content" className="main_image" />
    
    <div className="intro-box">
      <div className="introduction">
       On the other side of the universe, the sounds of songs and roars.
Freedom soars through the sky, where whispers of nature and an unknown 
language are spoken by creatures — 
  understood only by the creator.
So, the creator formed a bridge between the human and natural worlds — 
a place where they can meet and speak through emotion and action.
      </div>
      <button className="welcome">welcome to wildlife</button>
    </div>
  </section>
  
   {/* ABOUT Label Section */}
  <div className="label-container">
    <img src="/label.png" alt="Label" className="label-img" />
    <span className="label-text">ABOUT</span>
    <img src="/bird.png" alt="Bird" className="bird" />
    <img src="/about.png" alt="about" className="about" />
  
    <p className="about-text">             
      Welcome to Elysia. 
Here you can explore information about various animals, birds, reptiles, and fish, 
and even discover zoos, sanctuaries, or wildlife tourism spots where you can meet 
them face-to-face. You can also share your own safari trips in 'My Journey'. 
Note: You can post anything related to wildlife.</p>
  </div>
  </main>

  );
};
export default Home; // This is the correct default export