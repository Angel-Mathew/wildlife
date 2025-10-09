// src/components/Popup.jsx
import React, { useEffect, useState } from 'react';
import './Popup.css';

const Popup = ({ livingbeing, onClose, categoryBackgrounds }) => {
  if (!livingbeing) return null; // Don't render if no creature is selected

  const [details, setDetails] = useState("Loading details...");

  useEffect(() => {
    // --- Placeholder data for demonstration ---
    // This provides temporary text so you can see the popup working immediately.
    // REMEMBER: You will eventually replace this whole if/else if block
    // with your actual API fetch logic.
    if (livingbeing.name === "Horse") {
        setDetails("The horse is a domesticated, one-toed, hoofed mammal. It belongs to the taxonomic family Equidae and is one of two extant subspecies of Equus ferus.");
    } else if (livingbeing.name === "Tiger") {
        setDetails("The tiger is the largest living cat species and a member of the genus Panthera. It is most recognisable for its dark vertical stripes on orange-brown fur with a lighter underside.");
    } else if (livingbeing.name === "Chameleon") {
        setDetails("Chameleons are a unique and highly specialized clade of old world lizards with 160 species described. These are best known for their ability to change color, their zygodactylous feet, and long rapidly extendable tongues.");
    } else if (livingbeing.name === "Beaver") {
        setDetails("Beavers are large, semi-aquatic rodents native to the Northern Hemisphere. They are known for building dams, canals, and lodges.");
    } else if (livingbeing.name === "Otter") {
        setDetails("Otters are carnivorous mammals in the subfamily Lutrinae. The 13 extant otter species are all semiaquatic, aquatic or marine, with diets based on fish and invertebrates.");
    } else {
        setDetails(`This is the detailed information for the ${livingbeing.name}. Currently showing placeholder data. Its API endpoint is: ${livingbeing.details_api_endpoint}.`);
    }
    // --- End Placeholder data ---

  }, [livingbeing]); // Re-run this effect when the selected livingbeing object changes

  // Function to determine the correct background image based on priority
  const getBackgroundImage = () => {
    // 1. Prioritize specific background defined in livingbeing.js for the livingbeing
    if (livingbeing.bg_popupscreen) {
      return livingbeing.bg_popupscreen;
    }
    // 2. If no specific background, fall back to the common background for its category
    //    'livingbeing.category' is a temporary property added in Categories.jsx's handleCardClick
    if (livingbeing.category && categoryBackgrounds[livingbeing.category]) {
      return categoryBackgrounds[livingbeing.category];
    }
    // 3. Final fallback to a general default if no other background is found
    return 'src/assets/bg/default_popup_bg.png'; // Ensure this image exists!
  };

  const backgroundImage = getBackgroundImage();

  return (
    <div className="popup_overlay" onClick={onClose}>
      <div
        className="popup_content"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside popup content from closing it
        style={{ backgroundImage: `url(${backgroundImage})` }} // Apply dynamic background
      >
        <button className="popup_close_button" onClick={onClose}>X</button>
        <div className="popup_header">
          <img src={livingbeing.image} alt={livingbeing.name} className="popup_livingbeing_image" />
          <h2>{livingbeing.name}</h2>
        </div>
        <div className="popup_details">
          <p>{details}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
