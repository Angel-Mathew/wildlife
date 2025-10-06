// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust the path if your Navbar.jsx is in a different folder

// Example components for your routes
{/* You can replace these with your actual components */}
import Home from './pages/Home';
import Categories from './pages/Categories';
import Sightings from './pages/Sightings';
import MyJourney from './pages/Myjourney';
// import Footer from './components/Footer'; // Uncomment if you have a Footer component  

const App = () => {
  return (
    <Router>
      <Navbar />
      <body/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/sightings" element={<Sightings />} />
        <Route path="/my-journey" element={<MyJourney />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;