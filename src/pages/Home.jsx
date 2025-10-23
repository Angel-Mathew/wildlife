import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you'll create a CSS file for styling
import Navbar from '../components/Navbar'; // Adjust the path if your Navbar.jsx is in a different folder

//-------------------------------------------------------------------//
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

  {/*---------------------------------------------------------*/}

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

  {/*---------------------------------------------------------*/}

  {/* Categories */}
  <section id="Categories">
     <div className="label-container2">
       <img src="/label.png" alt="Label" className="label2" />
    <span className="label-text2">Categories </span>
    <img src="/rabbit.png" alt="rabbit" className="rabbit" />
     </div>

     {/*---------------------------------------------------------*/}

     {/*button for each categories */}
      {/* Grid of category buttons */}
  <div className="categories-grid">
    <div className="item" onClick={() => window.location.href = "/animals"}>
      <img src="/prints (4).png" alt="Animals" className="prints" />
      <span className="name1">Animals</span>
    </div>
   <div className="item" onClick={() => window.location.href = "/reptiles"}>
      <img src="/prints (3).png" alt="Reptiles" className="prints" />
      <span className="name2">Reptiles</span>
    </div>
    <div className="item" onClick={() => window.location.href = "/birds"}>
      <img src="/prints (2).png" alt="Birds" className="prints" />
      <span className="name3">Birds</span>
    </div>

     {/*---------------------------------------------------------*/}
     
    <div className="item" onClick={() => window.location.href = "/fishes"}>
      <img src="/prints (1).png" alt="Fishes" className="prints" />
      <span className="name4">Fishes</span>
    </div>

  </div>
  </section>
  </main>


  );
};
export default Home; // This is the correct default export