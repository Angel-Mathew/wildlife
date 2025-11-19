// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importing Navbar and Footer components
import Scrolltop from './components/Scrolltop';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 


//global css
import './App.css';

// Importing different pages
import Home from './pages/Home';
import Categories from './pages/Categories';
import Sightings from './pages/Sightings';
import Journey from './pages/Journey';
import Postpg from './pages/postpg';



const App = () => {
  return (

    <Router>
     <Scrolltop/>
      <div className="app_container" >


      <Navbar />
      <main className="main_content">
        <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/categories/:categoryName?" element={<Categories />} />
        <Route path="/sightings" element={<Sightings />} />
        <Route path="/Journey" element={<Journey />} />
        <Route path="/postpg" element={<Postpg/>}/>
       
      </Routes>
      </main>
      <Footer /> 
      </div>
    </Router>
  );
};

export default App;