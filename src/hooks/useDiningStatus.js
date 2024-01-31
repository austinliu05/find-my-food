import { rattyHours, andrewsHours, ivyHours, vdubHours } from '../constants'
import { isIvyOpen, isVDubOpen, isRattyOpen, isAndrewsOpen } from '../utils'
// useDiningStatus.js
import { useState, useEffect } from 'react';

const useDiningStatus = () => {
  const [status, setStatus] = useState({
    ratty: false,
    andrews: false,
    ivy: false,
    vdub: false,
  });

  useEffect(() => {
    const updateStatus = () => {
      // Logic to update dining hall status based on current time
      setStatus({
        ratty: isRattyOpen(rattyHours),
        andrews: isAndrewsOpen(andrewsHours),
        ivy: isIvyOpen(ivyHours),
        vdub: isVDubOpen(vdubHours),
      });
    };

    updateStatus(); // Call immediately on mount
    const intervalId = setInterval(updateStatus, 60000); // Update status every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return status;
};

export default useDiningStatus;
