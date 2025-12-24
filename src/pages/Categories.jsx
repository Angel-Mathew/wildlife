import React, { useState,useEffect } from 'react'; 
import { Link, useParams } from 'react-router-dom';//this is used to navigate the  components
import livingbeingdata from '../assets/data/livingbeing.js'; 
import './Categories.css'; 
import Navbar from '../components/Navbar';
import Popup from './Popup.jsx'; 


//--------------- Card ---------------------//

const CategoryCard = ({ name, image, onClick }) => {
  return (
    <div className="card" onClick={onClick}>   
      <img src={image} alt={name} className="pic" />
      <h3 className="names">{name}</h3>
    </div>
  );
}

//------------------Categories-------------------//

const Categories = () => {
  const { categoryName } = useParams();
  const [selectedlivingbeing, setSelectedlivingbeing] = useState(null);
 const [showPopup,setShowPopup]=useState(false) 
 const [filteredData, setFilteredData] = useState({});
/*-------------- In this the selected categories living being displayed --------------*/
/* meaning in home page there is four main category "Animals","Reptiles","Fishes" and "Birds" so if animals is selected it will filter ---------*/
/* the data and display the animal if not everything will be shown-----------*/

 useEffect(()=>{
  if (categoryName && livingbeingdata[categoryName]){
    setFilteredData({[categoryName]: livingbeingdata[categoryName]});
  } else {
    setFilteredData(livingbeingdata)
  }
 },[categoryName]);

  const handleCardClick = (livingbeing, Name) => {
    setSelectedlivingbeing({ ...livingbeing, category: Name });
    setShowPopup(true);
  };
 

  const handleClosePopup = () => {
    setSelectedlivingbeing(null);
    setShowPopup(false)
  };

/*------------------Background each Category's popup-------------------*/
  const categoryBackgrounds = {
    "Animals": "/asset/bg/animal_popupbg.png",
    "Reptiles": "/asset/bg/reptile_popupbg.png",
    "Birds": "/asset/bg/bird_popupbg.png",
    "Fish": "/asset/bg/fish_popupbg.png",
  };
  


  

  return (
    <>
    
       
          <div className="container">
        {Object.keys(filteredData).map((Name) => ( 
 
 /*------- loops through each category ----------------*/
         
          <section key={Name} className="sections">
            <h2 className="heading">{Name}</h2>
            <div className="card_container">  
              
              {filteredData[Name].map((livingbeing) => ( 
                <CategoryCard
                  key={livingbeing.id} 
                  name={livingbeing.name}
                  image={livingbeing.image}
                  onClick={() => handleCardClick(livingbeing, Name)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

     {/*--------------------------- Displays the popup screen when clicked ---------------------------*/ }
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
