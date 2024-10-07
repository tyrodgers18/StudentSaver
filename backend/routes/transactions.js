// backend/routes/transactions.js
// Provides API routes to add new transations and fetch existing transactions for a user using Express.

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Import the Transaction model


// POST Route to add a new transaction
router.post('/add', async (req, res) => { // POST endpoint
    console.log('Received POST request to /api/transactions/add'); // Log when request hits
    console.log("Received Body:", req.body); // Log the request body for confirmation
    
    // Get data from the request body
    const { userId, amount, type, category, note, date } = req.body;

    try {
        // Create a new transaction with the data from the frontend
        const transaction = new Transaction({
          userId,
          amount,
          type,
          category,
          note,
          date,
        });

    // Save the transaction to the MongoDB database
    await transaction.save();

    // Upon success respond with the created transaction and a 201 status
    res.status(201).json(transaction);
    } catch (error) {
        // If an error occurs, return a 500 status and an error message
        res.status(500).json({ error: 'Error saving transaction' });
    }

});

// GET Route to fetch all transactions for a user
router.get('/:userId', async (req, res) => { // GET endpoint 
    try {
      // Find all transactions in the database that match the user's ID
      const transactions = await Transaction.find({ userId: req.params.userId });
  
      // Respond back with the list of transactions
      res.status(200).json(transactions);
    } catch (error) {
      // If an error occurs, return a 500 status and an error message
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Error fetching transactions' });
    }
  });
  
// The router is exported so that it can be used in the main server.js file to handle transaction API requests
module.exports = router;