// backend/routes/budgetRoutes.js
// Provides API routes to add new budgets and fetch existing budgets for a user using Express.

const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget'); // Import the Budget model

// POST Route to add a new budget
router.post('/add', async (req, res) => {
    console.log('Received POST request to /api/budget/add'); // Log the request
    console.log("Received Body:", req.body); // Log the request body

    // Extract data from the request body
    const { userId, category, budgetAmount } = req.body;

    try {
        // Create a new Budget with the userId, category, and budget amount
        const budget = new Budget({
            userId,
            category,
            budgetAmount
        });

        // Save the budget to the MongoDB database
        await budget.save();

        // Respond with the created budget 
        res.status(201).json(budget);
    } catch (error) {
        res.status(400).json({ message: 'Error creating budget'});
    }
});

// GET Route to retrieve all budgets for the current user
router.get('/:userId', async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.params.userId });

        // Respond with the list of budgets
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Error fetching budgets:', error);
        res.status(400).json({ message: 'Error fetching budgets' });
    }
});

// DELETE route to delete a budget by its ID
router.delete('/:budgetId', async (req, res) => {
    try {
        const budgetId = req.params.budgetId; // Extract the budgetId from req.params
        await Budget.findByIdAndDelete(budgetId); // Use Mongoose to find and delete the budget by ID

        res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (error) {
        console.error('Error deleting budget:', error);
        res.status(500).json({ message: 'Error deleting budget' });
    }
});

module.exports = router;