// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importing Navbar and Footer components
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 

//global css
import './App.css';

// Importing different pages
import Home from './pages/Home';
import Categories from './pages/Categories';
import Sightings from './pages/Sightings';
import MyJourney from './pages/MyJourney';


const App = () => {
  return (

    <Router>
      <div className="app_container" >


      <Navbar />
      <main className="main_content">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sightings" element={<Sightings />} />
        <Route path="/MyJourney" element={<MyJourney />} />
       
      </Routes>
      </main>
      <Footer /> 
      </div>
    </Router>
  );
};

export default App;