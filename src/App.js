import './App.css';
import { useState, useEffect } from 'react'
import logo from './assets/brown.png'
import header from './assets/BrownHeader.png'

function App() {
  // meal time
  const [meal, setMeal] = useState('breakfast')
  // gets the current time and sets meal correspodingly
  function getCurrentMealTime() {
    const currentHour = new Date().getHours();
    if (currentHour < 11 && currentHour > 0) {
      return 'breakfast';
    } else if (currentHour >= 11 && currentHour < 16) {
      return 'lunch';
    } else {
      return 'dinner';
    }
  }
  // get current day
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  // check if in mobile mode
  const [mobile, setMobile] = useState(window.innerWidth <= 430);
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
  function isAnyFilterPressed(filters) {
    return Object.values(filters).some(value => value === true);
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
  // getting today's menu
  const todayMenu = menuByDayAndHall[currentDay]

  function fetchMenuItems(halls, meal) {
    // http://127.0.0.1:5000/menu-items
    // https://apoxie.pythonanywhere.com/menu-items
    fetch("https://apoxie.pythonanywhere.com/menu-items", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ halls: halls, meal: meal })
    })
      .then(res => res.json())
      .then(responseData => {
        sortMeals(responseData);
        console.log("Response: " + responseData)
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
  function update() {
    // filters the checkboxes that are marked true
    const halls = Object.keys(filters).filter(hall => filters[hall]);
    console.log(halls, meal)
    fetchMenuItems(halls, meal)
  }
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 430);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    update();
    const mealTime = getCurrentMealTime();
    setMeal(mealTime);
    // Update the meal state every hour to ensure it stays current
    const intervalId = setInterval(() => {
      const newMealTime = getCurrentMealTime();
      setMeal(newMealTime);
    }, 3600000); // 3600000 ms = 1 hour
  }, [filters]);
  // capitlize first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // different logo based on screen size
  function getPicture(){
    if(mobile){
      return logo
    }else{
      return header
    }
  }
  return (
    <div>
      <div className='banner'>
        <img className="logo" src={getPicture()} alt=''></img>
        {mobile &&
          <div className='dining-btns'>
            <button
              className="dining-btn"
              onClick={() => {
                setFilters(prevFilters => ({
                  Ratty: !prevFilters.Ratty,
                  IvyRoom: false,
                  Andrews: false,
                  VDub: false
                }));}}
            >Ratty</button>
            <button className="dining-btn" onClick={() => {setFilters(prevFilters => ({
              Ratty: false,
              IvyRoom: false,
              Andrews: !prevFilters.Andrews,
              VDub: false
            }))}}>Andrews</button>
            <button className="dining-btn" onClick={() => {setFilters(prevFilters => ({
              Ratty: false,
              IvyRoom: !prevFilters.IvyRoom,
              Andrews: false,
              VDub: false
            }))}}>Ivy Room</button>
            <button className="dining-btn" onClick={() => {setFilters(prevFilters => ({
              Ratty: false,
              IvyRoom: false,
              Andrews: false,
              VDub: !prevFilters.VDub
            }))}}>VDub</button>
          </div>}
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
            <button className="clear" onClick={clearFilters}>Clear Filters</button>
          </form>
        </div>
      </div>
      {!mobile &&
        <div className="week-container">
          {Object.entries(menuByDayAndHall).map(([day, halls]) => (
            <div className="col" key={day}>
              <h3>{day}</h3>
              {Object.entries(halls).map(([hallName, items]) => (
                <div className={hallName} key={hallName} >
                  {items.map(item => (
                    <p key={item.id}>{item.name}</p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>}
      {mobile &&
        <div className="week-container">
          <div className="col" key={currentDay}>
            <div className='day-label'>
              <h3>{currentDay}</h3>
              <p className='meal-info'>{capitalizeFirstLetter(meal)}</p>
            </div>
            {Object.entries(todayMenu).map(([hallName, items]) => (
              <div className={hallName} key={hallName} >
                {items.map(item => (
                  <p key={item.id}>{item.name}</p>
                ))}
              </div>
            ))}
          </div>
        </div>}
      <div className='disclaimer'>
        <p>**Updates every Monday morning**</p>
        <p>Breakfast: before 11:00 am</p>
        <p>Lunch: 11:00am - 4:00 pm</p>
        <p>Diner: after 4:00pm</p>
      </div>
    </div>
  );
}

export default App;