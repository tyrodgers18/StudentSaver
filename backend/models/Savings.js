// backend/models/Savings.js
// Defines a Mongoose schema and model for budgets.

const mongoose = require('mongoose'); // Schemas for MongoDB

const savingsSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    goalName: {
        type: String,
        required: true
    },
    targetAmount: {
        type: Number,
        required: true
    },
    currentAmount: {
        type: Number,
        default: 0 // Track how much has been saved to the goal
    },
    endDate: {   // Optional
        type: Date,
        default: null 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Savings', savingsSchema);