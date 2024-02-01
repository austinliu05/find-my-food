import './App.css';
import { useState, useEffect } from 'react'
import { isIvyOpen, getCurrentMealTime, capitalizeFirstLetter, isVDubOpen, isRattyOpen, isAndrewsOpen } from './utils';
import Banner from './components/Banner'
import WeekContainer from './components/WeekContainer'
import { rattyHours, andrewsHours, ivyHours, vdubHours } from './constants'
import { fetchMenuItems, updateVote } from './api';
import upArrow from './assets/upArrow.png'
import downArrow from './assets/downArrow.png'
import upvoted from './assets/upvoted.png'
import downvoted from './assets/downvoted.png'

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
    fetchMenuItems(halls, meal)
  }
  // Initialize state for vote counts
  const [votes, setVotes] = useState([]);
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
    const sortedVotes = []
    items.forEach(item => {
      const day = item.day;
      const hall = item.hall;
      const category = item.category
      const itemVotes = item.votes

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
      sortedVotes[item.id] = item.votes
      // Push the item to the respective hall array
      sortedMeals[day][hall][category].push(item);
    });
    setVotes(sortedVotes);
    setMenuByDayAndHall(sortedMeals);
  }
  // checking if arrow is hovered
  const [hovered, setHovered] = useState(false);
  // if upvote button is pressed
  const [voteStatus, setVoteStatus] = useState({});
  const handleUpvote = (itemId) => {
    const newVote = votes[itemId] + 1 //increment vote count by 1
    setVotes(prevVotes => ({
      ...prevVotes,
      [itemId]: newVote // replace current value
    }))
    updateVote(itemId, newVote) //send POST request to update database
    setVoteStatus(prevStatus => ({
      ...prevStatus,
      [itemId]: 'upvoted'
    }));
  };

  const handleDownvote = (itemId) => {
    const newVote = votes[itemId] - 1 // decrease vote count by 1
    setVotes(prevVotes => ({
      ...prevVotes,
      [itemId]: newVote
    }))
    updateVote(itemId, newVote)
    setVoteStatus(prevStatus => ({
      ...prevStatus,
      [itemId]: 'downvoted'
    }));
  };
  const handleMouseEnterUpvote = (itemId) => {
    setHovered((prev) => ({ ...prev, [itemId]: { ...prev[itemId], upvote: true } }));
  };
  
  const handleMouseLeaveUpvote = (itemId) => {
    setHovered((prev) => ({ ...prev, [itemId]: { ...prev[itemId], upvote: false } }));
  };
  
  const handleMouseEnterDownvote = (itemId) => {
    setHovered((prev) => ({ ...prev, [itemId]: { ...prev[itemId], downvote: true } }));
  };
  
  const handleMouseLeaveDownvote = (itemId) => {
    setHovered((prev) => ({ ...prev, [itemId]: { ...prev[itemId], downvote: false } }));
  };
  
  return (
    <div>
      <Banner mobile={mobile} filters={filters} setFilters={setFilters} ratty={ratty} andrews={andrews} ivy={ivy} vdub={vdub} />
      <WeekContainer
        mobile={mobile}
        currentDay={currentDay}
        menuByDayAndHall={menuByDayAndHall}
        meal={meal}
        capitalizeFirstLetter={capitalizeFirstLetter}
        todayMenu={todayMenu}
        upArrow={upArrow}
        downArrow={downArrow}
        upvoted={upvoted}
        downvoted={downvoted}
        handleUpvote={handleUpvote}
        handleDownvote={handleDownvote}
        voteStatus={voteStatus}
        votes={votes}
        hovered={hovered}
        handleMouseEnterUpvote={handleMouseEnterUpvote}
        handleMouseLeaveUpvote={handleMouseLeaveUpvote}
        handleMouseEnterDownvote={handleMouseEnterDownvote}
        handleMouseLeaveDownvote={handleMouseLeaveDownvote}/>
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
