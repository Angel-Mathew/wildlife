

import React from 'react'; 
import './Popup.css';

const Popup = ({ livingbeing, onClose, categoryBackgrounds }) => {
  if (!livingbeing) return null;

  // Use the description directly from the livingbeing object
  const descriptionText = livingbeing.description || "No detailed information available for this creature.";

  // Function to determine the correct background image based on priority
  const getBackgroundImage = () => {
    // Check if the specific categories has its own bg
    if (livingbeing.bg_popupscreen) {
      console.log(`Using specific livingbeing background: ${livingbeing.name} - ${livingbeing.bg_popupscreen}`);
      return livingbeing.bg_popupscreen;
    }
    
    // to check  if any  category background provided for the livingbeing's category
    // livingbeing.category is added in Categories.jsx when handleCardClick is called
    if (livingbeing.category && categoryBackgrounds[livingbeing.category]) {
      console.log(`Using category background for ${livingbeing.category}: ${categoryBackgrounds[livingbeing.category]}`);
      return categoryBackgrounds[livingbeing.category];
    }

   //if specific background is not found ,it display a default bg
    console.log("Using default background: src/assets/bg/default_popup_bg.png");
    return 'src/assets/bg/default_popup_bg.png'; 
  };

  const backgroundImage = getBackgroundImage();

  return (
    <div className="popup_overlay" onClick={onClose}>
      <div
        className="popup_content_wrapper"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundImage: `url(${backgroundImage})` }} // Apply dynamic background
      >
        <button className="popup_close_button" onClick={onClose}>X</button>
        
        <div className="popup_image_circle_container">
          <img src={livingbeing.image}  className="popup_image_in_circle" />
        </div>
        
        

        <div className="popup_description_box"> 
          <p>{descriptionText}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
