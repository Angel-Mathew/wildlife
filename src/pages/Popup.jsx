

import React from 'react'; 
import './Popup.css';

const Popup = ({ livingbeing, onClose, categoryBackgrounds }) => {
  if (!livingbeing) return null;

  const details = livingbeing.description || "No detailed information available for this creature.";


  const getBackgroundImage = () => {
   
    if (livingbeing.bg_popupscreen) {
      console.log(`Using specific livingbeing background: ${livingbeing.name} - ${livingbeing.bg_popupscreen}`);
      return livingbeing.bg_popupscreen;
    }
    
    
    if (livingbeing.category && categoryBackgrounds[livingbeing.category]) {
      console.log(`Using category background for ${livingbeing.category}: ${categoryBackgrounds[livingbeing.category]}`);
      return categoryBackgrounds[livingbeing.category];
    }

  
    console.log("Using default background: src/assets/bg/default_popup_bg.png");
    return 'src/assets/bg/default_popup_bg.png'; 
  };

  const bgImage = getBackgroundImage();

  return (
    <div className="popup_overlay" onClick={onClose}>
      <div
        className="popup_content_wrapper"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundImage: `url(${bgImage})` }} // Apply dynamic background
      >
        <button className="popup_close_button" onClick={onClose}>X</button>
        
        <div className="popup_image_circle_container">
          <img src={livingbeing.image}  className="popup_image_in_circle" />
        </div>
        
        

        <div className="popup_description_box"> 
          <p>{details}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
