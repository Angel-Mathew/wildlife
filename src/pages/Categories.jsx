// src/Categories.jsx
import React, { useState } from 'react'; // <--- Make sure useState is imported
import { Link } from 'react-router-dom';
import livingbeingdata from '../assets/data/livingbeing.js';
import './Categories.css';
import Navbar from '../components/Navbar';
import Popup from './Popup.jsx';// <--- Import the Popup component

const CategoryCard = ({ name, image, onClick }) => {
  return (
    <div className="category_card" onClick={onClick}>   
      <img src={image} alt={name} className="category_image" />
      <h3 className="category_name">{name}</h3>
    </div>
  );
}

const Categories = () => {
  const [selectedlivingbeing, setSelectedlivingbeing] = useState(null);
  const [showPopup,setShowPopup]=useState(false)

  const handleCardClick = (livingbeing, categoryName) => {
    setSelectedlivingbeing({ ...livingbeing, category: categoryName });
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedlivingbeing(null);
    setShowPopup(false)
  };

  const categoryBackgrounds = {
    "Animals": "src/assets/bg/animal_popupbg.png",
    "reptiles": "src/assets/bg/reptile_popupbg.png",
    "birds": "src/assets/bg/bird_popupbg.png",
    "fish": "src/assets/bg/fish_popupbg.png",
  };

  return (
    <>
      <Navbar />
      <div className="categories_container">
        {Object.keys(livingbeingdata).map((categoryName) => (
          <section key={categoryName} className="category_section">
            <h2 className="category_title">{categoryName.toUpperCase()}</h2>
            <div className="category_cards_container">
              {livingbeingdata[categoryName].map((livingbeing) => ( // Changed 'livingbeing' to 'creature' here
                <CategoryCard
                  key={livingbeing.id}
                  name={livingbeing.name}
                  image={livingbeing.image}
                  onClick={() => handleCardClick(livingbeing, categoryName)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {showPopup && selectedlivingbeing &&(
        <Popup
          livingbeing={selectedlivingbeing}
          onClose={handleClosePopup}
          categoryBackgrounds={categoryBackgrounds}
        />
      )}
    </>
  );
};

export default Categories;
