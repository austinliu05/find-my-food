import '../App.js'
import './SearchBar.css'
// import React from 'react'

// SearchBar component applies to only one specific dining hall
//      Parameter: allFoodItems - list of all dishes for specific dining hall
function SearchBar({ allFoodItems }) {

    return (
        <div className="search-bar">
            <div className="search-input">
                <input type="text" placeholder="Search for a dish..." />
                <div className="search-icon"></div>
            </div>

            // Loop thru data
            <div className="search-results">
                // Print out each value
                {allFoodItems.map((key, value) => {
                    return (<div> {value} </div>)
                })};
            </div>
        </div>
    )
}

export default SearchBar;