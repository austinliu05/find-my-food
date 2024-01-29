import './App.css';
import { useState, useEffect } from 'react'
import logo from './assets/brown.png'
import header from './assets/BrownHeader.png'

function App() {
  // dining schedules
  // vdub
  const [vdub, setVdub] = useState()
  // ratty
  const [ratty, setRatty] = useState()
  // ivy
  const [ivy, setIvy] = useState()
  // andrews
  const [andrews, setAndrews] = useState()
  // Dining hall operating hours
  const rattyHours = { start: 7.5, end: 19.5 }; // 7:30 AM to 7:30 PM
  const andrewsHours = { start: 11, end: 20 }; // 11 AM to 8 PM
  const vdubHours = { start: 7.5, end: 20.5 }; // 7:30 AM to 8:30 PM
  // Define the operating hours for Ivy
  const ivyHours = [
    { start: 11, end: 14 }, // 11 AM to 2 PM
    { start: 17, end: 22 }  // 5 PM to 10 PM
  ];
  // Function to check if current time is within operating hours
  const isIvyOpen = () => {
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;

    // Check if current time is within any of the time ranges
    return ivyHours.some(({ start, end }) => currentHour >= start && currentHour < end);
  };

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
  // when filters change, fetch new items
  function update() {
    // filters the checkboxes that are marked true
    const halls = Object.keys(filters).filter(hall => filters[hall]);
    console.log(halls, meal)
    fetchMenuItems(halls, meal)
  }
  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setMobile(window.innerWidth <= 430);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call immediately to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Update meal times every hour
    const mealTime = getCurrentMealTime();
    setMeal(mealTime);

    const intervalId = setInterval(() => {
      const newMealTime = getCurrentMealTime();
      setMeal(newMealTime);
    }, 3600000); // 3600000 ms = 1 hour

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    update();
    // update is called when filters change
  }, [filters]);
  // capitlize first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // different logo based on screen size
  function getPicture() {
    if (mobile) {
      return logo
    } else {
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
                }));
              }}
            >Ratty</button>
            <button className="dining-btn" onClick={() => {
              setFilters(prevFilters => ({
                Ratty: false,
                IvyRoom: false,
                Andrews: !prevFilters.Andrews,
                VDub: false
              }))
            }}>Andrews</button>
            <button className="dining-btn" onClick={() => {
              setFilters(prevFilters => ({
                Ratty: false,
                IvyRoom: !prevFilters.IvyRoom,
                Andrews: false,
                VDub: false
              }))
            }}>Ivy Room</button>
            <button className="dining-btn" onClick={() => {
              setFilters(prevFilters => ({
                Ratty: false,
                IvyRoom: false,
                Andrews: false,
                VDub: !prevFilters.VDub
              }))
            }}>VDub</button>
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
              <div className='day-label'>
                <h3>{day}</h3>
                <p className='meal-info'>{capitalizeFirstLetter(meal)}</p>
              </div>
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
        <p> **If no items show, dining hall isn't open (still working on UI)**</p>
        <p>**Updates every Monday morning**</p>
        <p>Breakfast: before 11:00 am</p>
        <p>Lunch: 11:00am - 4:00 pm</p>
        <p>Diner: after 4:00pm</p>
      </div>
    </div>
  );
}

export default App;