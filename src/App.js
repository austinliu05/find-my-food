import './App.css';
import { useState, useEffect } from 'react'
import {getCurrentMealTime, capitalizeFirstLetter } from './Utils';
import Banner from './components/Banner'
import WeekContainer from './components/WeekContainer'
function App() {
  // get current day
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  // vdub
  const [vdub, setVdub] = useState()
  // ratty
  const [ratty, setRatty] = useState()
  // ivy
  const [ivy, setIvy] = useState()
  // andrews
  const [andrews, setAndrews] = useState()
  // meal time
  const [meal, setMeal] = useState('breakfast')
  // check if in mobile mode
  const [mobile, setMobile] = useState(window.innerWidth <= 430);

  const [filters, setFilters] = useState({
    Ratty: false,
    IvyRoom: false,
    Andrews: false,
    VDub: false
  });
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
  const todayMenu = menuByDayAndHall[currentDay]
  function clearFilters() {
    setFilters({
      Ratty: false,
      IvyRoom: false,
      Andrews: false,
      VDub: false
    });
  }
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
  useEffect(() => {
    // Update Ivy's status based on time and day
    // const updateIvyStatus = () => {
    //   setIvy(isIvyOpen());
    // };

    // updateIvyStatus(); // Update on component mount

    // // You might also want to update this at a regular interval
    // const intervalId = setInterval(updateIvyStatus, 60000); // Update every minute

    // return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setMobile(window.innerWidth <= 430);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call immediately to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // when filters change, fetch new items
  function update() {
    // filters the checkboxes that are marked true
    const halls = Object.keys(filters).filter(hall => filters[hall]);
    console.log(halls, meal)
    fetchMenuItems(halls, meal)
  }
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

  return (
    <div>
      <Banner mobile={mobile} filters={filters} setFilters={setFilters} />
      <WeekContainer 
        mobile={mobile}
        menuByDayAndHall={menuByDayAndHall}
        meal={meal}
        capitalizeFirstLetter={capitalizeFirstLetter} 
        todayMenu = {todayMenu}/>
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