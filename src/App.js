import './App.css';
import { useState, useEffect } from 'react'
import { isIvyOpen, getCurrentMealTime, capitalizeFirstLetter, isVDubOpen, isRattyOpen, isAndrewsOpen } from './utils';
import Banner from './components/Banner'
import WeekContainer from './components/WeekContainer'
import { rattyHours, andrewsHours, ivyHours, vdubHours } from './constants'
function App() {
  // get current day
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  // Booleans to check if the dining halls are open or not
  // ratty
  const [ratty, setRatty] = useState()
  // andrews
  const [andrews, setAndrews] = useState()
  // ivy
  const [ivy, setIvy] = useState()
  // vdub
  const [vdub, setVdub] = useState()

  // meal time
  const [meal, setMeal] = useState('breakfast')
  // check if in mobile mode
  const [mobile, setMobile] = useState(window.innerWidth <= 430);

  // Which dining halls are selected
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
  // gets the menu for the current day
  const todayMenu = menuByDayAndHall[currentDay]
  function clearFilters() {
    setFilters({
      Ratty: false,
      IvyRoom: false,
      Andrews: false,
      VDub: false
    });
  }
  // switching between breakfast, lunch and dinner
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
  // communicating with the flask server
  useEffect(() => {
    update();
    // update is called when filters change
  }, [filters]);

  // checking whether or not ivy room is open
  useEffect(() => {
    // Update Dining hall statuses based on time and day
    const updateDiningHallStatus = () => {
      setRatty(isRattyOpen(rattyHours));
      setAndrews(isAndrewsOpen(andrewsHours));
      setIvy(isIvyOpen(ivyHours));
      setVdub(isVDubOpen(vdubHours));
    };

    updateDiningHallStatus(); // Update on component mount

    // You might also want to update this at a regular interval
    const intervalId = setInterval(updateDiningHallStatus, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clear interval on unmount
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
        console.log("Response: " + menuByDayAndHall)
      })
      .catch(error => {
        console.error("Error sending data:", error);
      });
  }
  // sorting the given json file into readable code for front end to easily parse and display
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
      const category = item.category
      console.log(category)
      // Ensure the 'day' object is initialized
      if (!sortedMeals[day]) {
        sortedMeals[day] = {};
      }

      // Ensure the 'hall' object within the 'day' object is initialized
      if (!sortedMeals[day][hall]) {
        sortedMeals[day][hall] = {};
      }

      // Ensure the 'category' array within the 'hall' object is initialized
      if (!sortedMeals[day][hall][category]) {
        sortedMeals[day][hall][category] = [];
      }
      // Push the item to the respective hall array
      sortedMeals[day][hall][category].push(item);
    });
    setMenuByDayAndHall(sortedMeals);
  }

  return (
    <div>
      <Banner mobile={mobile} filters={filters} setFilters={setFilters} ratty={ratty} andrews={andrews} ivy={ivy} vdub={vdub} />
      <WeekContainer
        mobile={mobile}
        currentDay={currentDay}
        menuByDayAndHall={menuByDayAndHall}
        meal={meal}
        capitalizeFirstLetter={capitalizeFirstLetter}
        todayMenu={todayMenu} />
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
