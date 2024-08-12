import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [bannerSettings, setBannerSettings] = useState({
    description: '',
    timer: 10,
    link: '',
    isVisible: true,  // Default to true
  });

  useEffect(() => {
    // Fetch banner settings from the backend when the component mounts
    axios.get('http://localhost:5000/api/banner')
      .then(response => {
        setBannerSettings(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the banner settings!', error);
      });
  }, []);

  useEffect(() => {
    // Start the countdown timer if the timer value is greater than 0
    if (bannerSettings.timer > 0 && bannerSettings.isVisible) {
      const timerId = setInterval(() => {
        setBannerSettings(prevSettings => ({
          ...prevSettings,
          timer: prevSettings.timer - 1,
        }));
      }, 1000);

      // Clear the interval when the timer reaches 0 or when the component unmounts
      return () => clearInterval(timerId);
    }
  }, [bannerSettings.timer, bannerSettings.isVisible]);

  const toggleBannerVisibility = () => {
    setBannerSettings(prevSettings => ({
      ...prevSettings,
      isVisible: !prevSettings.isVisible,
    }));
  };

  const updateBanner = () => {
    axios.post('http://localhost:5000/api/banner', bannerSettings)
      .then(response => {
        alert('Banner updated successfully');
      })
      .catch(error => {
        console.error('There was an error updating the banner!', error);
      });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {bannerSettings.isVisible && bannerSettings.timer > 0 ? (
          <div>
            <h2>{bannerSettings.description}</h2>
            <p>Timer: {bannerSettings.timer} seconds remaining</p>
            <a href={bannerSettings.link} target="_blank" rel="noopener noreferrer">Go to Link</a>
          </div>
        ) : (
          <p>The banner is hidden or the timer has expired.</p>
        )}
      </div>
      <button onClick={toggleBannerVisibility}>
        {bannerSettings.isVisible ? 'Hide Banner' : 'Show Banner'}
      </button>
      <form onSubmit={(e) => { e.preventDefault(); updateBanner(); }}>
        <label>
          Description:
          <input
            type="text"
            value={bannerSettings.description}
            onChange={(e) => setBannerSettings({ ...bannerSettings, description: e.target.value })}
          />
        </label>
        <label>
          Timer:
          <input
            type="number"
            value={bannerSettings.timer}
            onChange={(e) => setBannerSettings({ ...bannerSettings, timer: Number(e.target.value) })}
          />
        </label>
        <label>
          Link:
          <input
            type="text"
            value={bannerSettings.link}
            onChange={(e) => setBannerSettings({ ...bannerSettings, link: e.target.value })}
          />
        </label>
        <button type="submit">Update Banner</button>
      </form>
    </div>
  );
}

export default Dashboard;
