import { useState, useEffect } from 'react';

const useScreenStatus = () => {
  const [mobile, setMobile] = useState(window.innerWidth <= 430);
  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setMobile(window.innerWidth <= 430);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call immediately to set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return mobile;
};

export default useScreenStatus;
