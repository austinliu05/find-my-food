import './App.css';
import { useState, useEffect } from 'react'
import logo from './assets/BrownHeader.png'
function App() {
  const [filters, setFilters] = useState({
    Ratty: false,
    IvyRoom: false,
    Andrews: false
  });
  function clearFilters() {
    setFilters({
      Ratty: false,
      IvyRoom: false,
      Andrews: false
    });
  }
  
  // State to store the sorted menu items by day and hall
  const [menuByDayAndHall, setMenuByDayAndHall] = useState({
    Sunday: {},
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {}
  });

  useEffect(() => {
    fetchMenuItems();
  }, [filters]); 

  function fetchMenuItems() {
    fetch("http://127.0.0.1:5000/menu-items")
      .then(res => res.json())
      .then(data => {
        sortMeals(data);
      })
      .catch(error => {
        console.error("Error sending data:", error);
      });
  }

  function sortMeals(items) {
    const sortedMeals = {
      Sunday: {},
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {}
    };

    items.forEach(item => {
      const day = item.day;
      const hall = item.hall;
      
      if (!filters[hall]) return; // Skip if the hall is not selected in the filters

      // Initialize the hall array if it doesn't exist
      if (!sortedMeals[day][hall]) {
        sortedMeals[day][hall] = [];
      }

      // Push the item to the respective hall array
      sortedMeals[day][hall].push(item);
    });

    setMenuByDayAndHall(sortedMeals);
  }

  return (
    <div className="App">
      <div className='banner'>
        <img src={logo} alt=''></img>
        <div className='legend'>
          <div class="hall">
            <div class="legend-color legend-red"></div>
            <span>- Ratty</span>
          </div>
          <div class="hall">
            <div class="legend-color legend-green"></div>
            <span>- Ivy Room</span>
          </div>
          <div class="hall">
            <div class="legend-color legend-blue"></div>
            <span>- Andrews</span>
          </div>
          <div class="hall">
            <div class="legend-color legend-yellow"></div>
            <span>- Josiah</span>
          </div>
        </div>
        <div className='filtering'>
          <form>
            <label>
              <input
                type="checkbox"
                checked={filters.Ratty}
                onChange={e => setFilters({ ...filters, Ratty: e.target.checked })}
              />
              Ratty
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.IvyRoom}
                onChange={e => setFilters({ ...filters, IvyRoom: e.target.checked })}
              />
              IvyRoom
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.Andrews}
                onChange={e => setFilters({ ...filters, Andrews: e.target.checked })}
              />
              Andrews
            </label>
            <button onClick={clearFilters}>Clear Filters</button>
          </form>
        </div>
      </div>
      <div className="week-container">
        {Object.entries(menuByDayAndHall).map(([day, halls]) => (
          <div className="col">
            <h3>{day}</h3>
            {Object.entries(halls).map(([hallName, items]) => (
              <div className={hallName}>
                {items.map(item => (
                  <p key={item.id}>{item.name}</p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
