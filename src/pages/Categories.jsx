import React from 'react';
import { Link } from 'react-router-dom';
import livingbeingdata from '../assets/data/livingbeing.js';;; // Adjust the path if your data file is in a different folder
import './Categories.css'; // Assuming you'll create a CSS file for styling
import Navbar from '../components/Navbar'; // Adjust the path if your Navbar.jsx is in a different folder
 /*the card component in categories*/

const CategoryCard = ({ name, image, onClick }) => {
  return (
    <div className="category_card" onClick={onClick}>   
      <img src={image} alt={name} className="category_image" />
      <h3 className="category_name">{name}</h3>
    </div>
  );
}
const Categories = () => {
  return (
   
    
      <div className="categories_container">
        {Object.keys(livingbeingdata).map((categoryName) => (
          <section key={categoryName} className="category_section">
            <h2 className="category_title">{categoryName.toUpperCase()}</h2>
            <div className="category_cards_container">
              {livingbeingdata[categoryName].map((creature) => (
                <CategoryCard
                  key={creature.id}
                  name={creature.name}
                  image={creature.image}
                  // onClick={() => handleCardClick(creature)} // Still here for future pop-up logic
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    
  );
};





export default Categories; // This is the correct default export
