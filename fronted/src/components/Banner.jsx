// src/components/Banner.js
import React, { useState, useEffect } from 'react';

const Banner = ({ isVisible, description, link, timer }) => {
  const [timeLeft, setTimeLeft] = useState(timer);

  useEffect(() => {
    if (isVisible && timeLeft > 0) {
      const countdown = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [isVisible, timeLeft]);

  if (!isVisible || timeLeft <= 0) return null;

  return (
    <div className="banner">
      <p>{description}</p>
      {link && <a href={link}>Learn more</a>}
      <p>Time remaining: {timeLeft} seconds</p>
    </div>
  );
};

export default Banner;
