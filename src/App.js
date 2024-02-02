import './App.css';
import { useState, useEffect } from 'react'
import { capitalizeFirstLetter } from './utils';
import useDiningStatus from './hooks/useDiningStatus';
import useScreenStatus from './hooks/useScreenStatus';
import useMealStatus from './hooks/useMealStatus';
import Banner from './components/Banner'
import DesktopContainer from './components/DesktopContainer'
import MobileContainer from './components/MobileContainer'

import { fetchMenuItems, updateVote } from './api';
import upArrow from './assets/upArrow.png'
import downArrow from './assets/downArrow.png'
import upvoted from './assets/upvoted.png'
import downvoted from './assets/downvoted.png'

function App() {
  // checking if dining halls are open
  const diningStatus = useDiningStatus();
  // chcek whether or not the device is mobile or desktop
  const mobileStatus = useScreenStatus();
  // retrieve the meal status
  const meal = useMealStatus();
  // get current day
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  // checking if arrow is clicked
  const [clicked, setClicked] = useState(false);
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
  // communicating with the flask server
  useEffect(() => {
    update();
    // update is called when filters change
  }, [filters]);

  // gets the menu for the current day
  const todayMenu = menuByDayAndHall[currentDay]

  // Initialize state for vote counts
  const [votes, setVotes] = useState([]);
  // sorting the given json file into readable code for front end to easily parse and display
  function sortMeals(items) {
    console.log(items)
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
  // fetching data from the server
  const update = () => {
    const halls = Object.keys(filters).filter(hall => filters[hall]);
    fetchMenuItems(halls, meal)
      .then(sortMeals) // After fetching, pass the data to sortMeals
      .catch(error => {
        console.error("Error sending data:", error);
      });
  };
  function changeVote(itemId, delta) {
    setVotes(prevVotes => ({
      ...prevVotes,
      [itemId]: prevVotes[itemId] + delta,
    }));
    updateVote(itemId, votes[itemId] + delta);
  }
  // Function to handle voting
  const handleVote = (itemId, isUpvote) => {
    // if first time voting
    if (!clicked[itemId]) {
      setClicked((prev) => ({ ...prev, [itemId]: (isUpvote ? "upvoted" : "downvoted") }));
      setVotes(prevVotes => ({
        ...prevVotes,
        [itemId]: prevVotes[itemId] + (isUpvote ? 1 : -1),
      }));
      // Then send the vote to the server
      updateVote(itemId, votes[itemId] + (isUpvote ? 1 : -1));
    } else if (clicked[itemId] === "upvoted" && !isUpvote) { // upvote has already been clicked
      setClicked((prev) => ({ ...prev, [itemId]: "" }));
      changeVote(itemId, -1)
    } else if (clicked[itemId] === "downvoted" && isUpvote) { // downvote has already been clicked
      setClicked((prev) => ({ ...prev, [itemId]: "" }));
      changeVote(itemId, 1)
    }
  };
  return (
    <div>
      <Banner mobile={mobileStatus} filters={filters} setFilters={setFilters}
        ratty={diningStatus.ratty} andrews={diningStatus.andrews} ivy={diningStatus.ivy} vdub={diningStatus.vdub} />
      {!mobileStatus && <DesktopContainer
        // menu item mechanism
        menuByDayAndHall={menuByDayAndHall}
        meal={meal}
        capitalizeFirstLetter={capitalizeFirstLetter}
        // images
        upArrow={upArrow}
        downArrow={downArrow}
        upvoted={upvoted}
        votes={votes}
        downvoted={downvoted}
        // voting mechanism
        handleVote={handleVote}
        clicked={clicked} />}

      {mobileStatus && <MobileContainer
        // menu item mechanism
        currentDay={currentDay}
        meal={meal}
        capitalizeFirstLetter={capitalizeFirstLetter}
        todayMenu={todayMenu}
        // images
        upArrow={upArrow}
        downArrow={downArrow}
        upvoted={upvoted}
        votes={votes}
        downvoted={downvoted}
        // voting mechanism
        handleVote={handleVote}
        clicked={clicked} />}
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
