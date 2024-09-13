// React Frontend - Tyler Rodgers

import React, { useEffect, useState } from 'react'; // Import React, useEffect for lifecycle management, useState for component state
import axios from 'axios'; // Axios for HTTP requests
import './App.css'; 

function App() {
  const [message, setMessage] = useState(''); // To store response from the backend

  // Function to fetch data from backend, HTTP GET
  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then((response) => {
        setMessage(response.data); // Set the response message from backend
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []); // Empty array means it runs once when the component mounts

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Student Saver!</h1>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
