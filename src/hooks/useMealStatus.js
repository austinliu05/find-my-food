import { useState, useEffect } from 'react';
import {getCurrentMealTime} from '../utils';

const useMealStatus = () => {
  // meal time
  const [meal, setMeal] = useState('breakfast')
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

  return meal;
};

export default useMealStatus;
