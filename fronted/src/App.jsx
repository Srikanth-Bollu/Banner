// src/App.js
import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import axios from 'axios';

function App() {
  const [bannerSettings, setBannerSettings] = useState({});

  useEffect(() => {
    axios.get('/api/banner')
      .then(response => setBannerSettings(response.data))
      .catch(error => console.error('There was an error!', error));
  }, []);

  return (
    <div className="App">
      <Banner {...bannerSettings} />
      <Dashboard />
    </div>
  );
}

export default App;
