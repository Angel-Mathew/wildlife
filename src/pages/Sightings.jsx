import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import locationdata from '../assets/data/location';
import './Sightings.css';
import Navbar from '../components/Navbar';

const Sightingscard = ({ name, image, onClick }) => {
    return (
        <div className='Sightingscard' onClick={onClick}>
            <img src={image} alt={name} className='map'/>
            <h3 className='Sightingname'>{name}</h3>
        </div>
    );
};

const DropdownMenu = ({ animals }) => {
    
    if (!animals || animals.length === 0) {
        return <div className="dropdown-content">No animals listed.</div>;
    }

   
    const animalsList = animals.split(',').map(item => item.trim());

    return (
        <div className="dropdown-content">
            <ul>
                {animalsList.map((animalName, index) => { 
                    return (
                        <li key={index} className="dropdown-item">
                        <span className="animal-name">{animalName}</span>
                        </li>
                        
                    );
                })}
            </ul>
        </div>
    );
};

// Main Sightings component
const Sightings = () => {
    const [activeContinent, setActiveContinent] = useState(null);

    const handleCardClick = (continentName) => {
        setActiveContinent(prevActive => (prevActive === continentName ? null : continentName));
    };

    const continents = Object.values(locationdata).map(arr => arr[0]);

    return (
        <div className="sightings-page">
            <p>This is section of animals located in each continent, to see the animals click on card and menu drop containing animals will be displayed</p>
           <div className="sightings-grid">
                {continents.map((continent) => (
                    <div key={continent.id} className="continent-wrapper">
                        <Sightingscard
                            name={continent.name}
                            image={continent.image}
                            onClick={() => handleCardClick(continent.name)}
                        />
                        {activeContinent === continent.name && (
                            <DropdownMenu 
                            animals={continent.animals} 
                            
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sightings;
