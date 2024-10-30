// React Frontend - Tyler Rodgers

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Package for page navigation
// import React, { useEffect, useState } from 'react'; // Import React, useEffect for lifecycle management, useState for component state
import React from 'react';
import Header from './components/Header'; 
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage'; 
import BudgetPage from './pages/BudgetPage';
import SettingsPage from './pages/SettingsPage';
import TrendsPage from './pages/TrendsPage';

// import axios from 'axios'; // Import Axios for HTTP requests to the backend
import './App.css'; 

function App() {
  // const [message, setMessage] = useState(''); // To store response from the backend

  // Function to fetch data from backend, HTTP GET
  // useEffect(() => {
  //   axios.get('http://localhost:3000/')
  //     .then((response) => {
  //       setMessage(response.data); // Set the response message from backend
  //     })
  //     .catch((error) => {
  //       console.error('There was an error fetching the data:', error);
  //     });
  // }, []); // Empty array means it runs once when the component mounts

  return (
    <Router>
      <Header /> {/* Render the Header component for navigation, will be on all pages */}

      <div className="App">

        {/* Define routes for the different pages */}
        <Routes>
          <Route path="/" element={<DashboardPage />} /> {/* Home & Default page */}
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path='/trends' element={<TrendsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
