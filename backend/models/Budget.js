// backend/models/Budget.js
// Defines a Mongoose schema and model for budgets.


const mongoose = require('mongoose') // Schemas for MongoDB

const budgetSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    budgetAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default value is the current date
    },
});

module.exports = mongoose.model('Budget', budgetSchema)