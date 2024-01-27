import './App.css';
import { useState, useEffect } from 'react'
import logo from './assets/BrownHeader.png'
function App() {
  const [filters, setFilters] = useState({
    Ratty: false,
    IvyRoom: false,
    Andrews: false,
    VDub: false
  });
  function clearFilters() {
    setFilters({
      Ratty: false,
      IvyRoom: false,
      Andrews: false,
      VDub: false
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
  function fetchMenuItems(data) {
    //https://apoxie.pythonanywhere.com/menu-items
    fetch("http://127.0.0.1:5000/menu-items", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(responseData => {
        sortMeals(responseData);
        console.log(responseData)
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
  function update(){
    // filters the checkboxes that are marked true
    const filterData = Object.keys(filters).filter(hall => filters[hall]);
    console.log(filterData)
    fetchMenuItems(filterData)
  }
  useEffect(() => {
    update();
  }, [filters]);

  return (
    <div>
      <div className='banner'>
        <img src={logo} alt=''></img>
        <div className='legend'>
          <div className="hall">
            <div className="legend-color legend-red"></div>
            <span>- Ratty</span>
          </div>
          <div className="hall">
            <div className="legend-color legend-green"></div>
            <span>- Ivy Room</span>
          </div>
          <div className="hall">
            <div className="legend-color legend-blue"></div>
            <span>- Andrews</span>
          </div>
          <div className="hall">
            <div className="legend-color legend-yellow"></div>
            <span>- VDub</span>
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
            <label>
              <input
                type="checkbox"
                checked={filters.VDub}
                onChange={e => setFilters({ ...filters, VDub: e.target.checked })}
              />
              VDub
            </label>
            <button onClick={clearFilters}>Clear Filters</button>
          </form>
        </div>
      </div>
      <div className="week-container">
        {Object.entries(menuByDayAndHall).map(([day, halls]) => (
          <div className="col"key={day}>
            <h3>{day}</h3>
            {Object.entries(halls).map(([hallName, items]) => (
              <div className={hallName}key={hallName} >
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