import '../App.js'
import './SearchBar.css'
import { useState } from 'react';
import magGlass from '../assets/magnifyingGlass.png'

// SearchBar component applies to only one specific dining hall
//      Parameter: allFoodItems - list of all dishes for specific dining hall
function SearchBar({ onSearchQueryChange }) {
    // State to keep track of the search query
    const [searchQuery, setSearchQuery] = useState('');
      // Event handler for input changes
    const handleInputChange = (event) => {
        // Update the state with the new input value
        setSearchQuery(event.target.value);
        console.log("The item being searched: " + searchQuery)
        onSearchQueryChange(searchQuery);
    };
    return (
        <div className="search-bar">
            <div className="search-input">
                <input type="text" placeholder="Search for a dish..." value={searchQuery}
                    onChange={handleInputChange}
                />
                <div className='search-icon'>
                    <img className='glass' src={magGlass}/>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;