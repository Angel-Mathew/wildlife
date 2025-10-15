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

// Component for the dropdown menu
const DropdownMenu = ({ animals }) => { // Prop is 'animals'
    // Ensure 'animals' is not null/empty
    if (!animals || animals.length === 0) {
        return <div className="dropdown-content">No animals listed.</div>;
    }

    // Split the comma-separated string into an array, trim whitespace
    const animalsList = animals.split(',').map(item => item.trim()); // Correctly creates the array

    return (
        <div className="dropdown-content">
            <ul>
               
                {animalsList.map((item, index) => {
                    const parts = item.split(' ');
                    const emoji = parts[0];
                    const name = parts.slice(1).join(' ');

                    return (
                        <li key={index} className="dropdown-item">
                            {emoji && <span className="animal-emoji">{emoji}</span>}
                            <span className="animal-name">{name}</span>
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
            <Navbar />
            <h1>Sightings by Continent</h1>
            <div className="sightings-grid">
                {continents.map((continent) => (
                    <div key={continent.id} className="continent-wrapper">
                        <Sightingscard
                            name={continent.name}
                            image={continent.image}
                            onClick={() => handleCardClick(continent.name)}
                        />
                        
                        {activeContinent === continent.name && (
                            <DropdownMenu animals={continent.animals} /> // This is correct now
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sightings;