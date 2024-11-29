// backend/routes/savingsRoutes.js
// Provides API routes to add new budgets and fetch existing budgets for a user using Express.

const express = require('express');
const router = express.Router();
const Savings = require('../models/Savings'); // Import the Savings model

// POST route to add a new savings goal
router.post('/add', async (req, res) => {
    console.log('Received POST request to /api/savings/add');
    console.log("Received Body:", req.body);

    const { userId, goalName, targetAmount, endDate } = req.body;

    try {
        const savingsGoal = new Savings({
            userId,
            goalName,
            targetAmount,
            endDate: endDate || null
        });

        await savingsGoal.save(); // Save to mongoDB database
        res.status(201).json(savingsGoal); // Respond with the created savings goal

    } catch (error) {
        console.error('Error creating savings goal:', error);
        res.status(400).json({ message: 'Error creating savings goal' });
    }
});

// GET route to retrieve all savings goals for the current user
router.get('/:userId', async (req, res) => {
    try {
        const savingsGoals = await Savings.find({ userId: req.params.userId });
        res.status(200).json(savingsGoals);
    } catch (error) {
        console.error('Error fetching savings goals:', error);
        res.status(400).json({ message: 'Error fetching savings goals' });
    }
});

// DELETE route to delete a savings goal by its ID
router.delete('/:goalId', async (req, res) => {
    try {
        const goalId = req.params.goalId;
        await Savings.findByIdAndDelete(goalId);
        res.status(200).json({ message: 'Savings goal deleted successfully' });
    } catch (error) {
        console.error('Error deleting savings goal:', error);
        res.status(500).json({ message: 'Error deleting savings goal' });
    }
});

// PUT route to update the savings goal's current amount
router.put('/:goalId', async (req, res) => {
    const { goalId } = req.params;
    const { currentAmount } = req.body;

    try {
        const updatedGoal = await Savings.findByIdAndUpdate(
            goalId,
            { currentAmount },
            { new: true } // Return the updated value
        );

        if (!updatedGoal) {
            return res.status(404).json({message: 'Savings goal not found' });
        }

        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error('Error updating savings goal:', error);
        res.status(500).json({ message: 'Error updating savings goal '});
    }
});

module.exports = router;