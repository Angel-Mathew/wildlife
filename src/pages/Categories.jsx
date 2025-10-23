import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';//react-route-dom navigate the  components
import livingbeingdata from '../assets/data/livingbeing.js'; // importing the js file which contain different species with names and images
import './Categories.css'; // importing style of categories pages
import Navbar from '../components/Navbar';// importing navigation from components
import Popup from './Popup.jsx'; // for popup function 

//.......................................................................//


// the image of the animal and name of animal will be displayed in the card form
// when clicked on the card,the details of animal will be displayed 
const CategoryCard = ({ name, image, onClick }) => {
  return (
    <div className="card" onClick={onClick}>   
      <img src={image} alt={name} className="pic" />
      <h3 className="names">{name}</h3>
    </div>
  );
}

//.......................................................................//

const Categories = () => {
  const [selectedlivingbeing, setSelectedlivingbeing] = useState(null);//useState manages in tracking which animal is selected 
  //Tracks which livingbeing is currently selected (null when nothing is selected ) 
  const [showPopup,setShowPopup]=useState(false) // controls the displaying of popup screen

  const handleCardClick = (livingbeing, Name) => {
    setSelectedlivingbeing({ ...livingbeing, category: Name });
    setShowPopup(true);
  };
  //handles  in displaying the selected card 

  const handleClosePopup = () => {
    setSelectedlivingbeing(null);
    setShowPopup(false)
  };// handles in exiting from the popup screen


  const categoryBackgrounds = {
    "Animals": "src/assets/bg/animal_popupbg.png",
    "Reptiles": "src/assets/bg/reptile_popupbg.png",
    "Birds": "src/assets/bg/bird_popupbg.png",
    "Fish": "src/assets/bg/fish_popupbg.png",
  };
  // This for popup screen background,each category  has different background  
  // such as animals category the popup screen will have land background,
  // reptile category the popup screen green bg
  //bird category the popup screen feathers bg
  //fish category the popup screen ocean bg

  //.......................................................................//

  return (
    <>
      <Navbar />
       
          <div className="container">
        {Object.keys(livingbeingdata).map((Name) => ( 
          //Object.keys(livingbeingdata):Gets all categories such as animals,reptiles,fishes and birds from the data 
          // map loops through each category and make section for it
          <section key={Name} className="sections">
            <h2 className="heading">{Name}</h2>
            <div className="card_container">  {/* contains a container for all cards */ }
              
              {livingbeingdata[Name].map((livingbeing) => ( 
                <CategoryCard
                  key={livingbeing.id} // keys for list items
                  name={livingbeing.name}
                  image={livingbeing.image}
                  onClick={() => handleCardClick(livingbeing, Name)} // creates a category card and passes name,image and click functiom
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
        // handles function of displaying the popup screen and exiting from the popup screen
        />
      )}
    </>
  );
};

 //.......................................................................//

export default Categories;
