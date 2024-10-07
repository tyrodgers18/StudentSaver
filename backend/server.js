// Node JS Backend - Tyler Rodgers

const express = require('express'); // Import Express.js framework to create the server
const mongoose = require('mongoose'); // Import mongoose to handle MongoDB database connection
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware for communication between the frontend and backend
require('dotenv').config(); // Import dotenv to load environment variables from the .env file

const app = express(); // Initialize the Express app
const port = process.env.PORT || 3000; // Set the port to the value in env variables or 3000

// Middleware
app.use(bodyParser.json()); // This middleware parses JSON from incoming requests to use in routes

// Enable CORS for the frontend (port 3001)
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from frontend running on localhost:3001
}));

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI) // Connect to MongoDB using the URI from .env
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// Import the transaction route
const transactionRoutes = require('./routes/transactions');

// Use the transaction routes in the app
app.use('/api/transactions', transactionRoutes); // This makes the transaction routes accessible at /api/transactions

// Test Route
// Basic route to test backend connection
app.get('/', (req, res) => {
  res.send('Welcome to Student Saver Backend!'); // Sends a response back to the client/frontend
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
