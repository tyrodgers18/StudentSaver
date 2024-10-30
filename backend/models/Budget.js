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
    spent: {
        type: Number,
        default: 0, // Keep track of how much of a budget has been spent so far
    },
    startDate: {
        type: Date,
        default: function () {
            // Auto set the first day of the current month
            const now = new Date(); // Current date and time
            return new Date(now.getFullYear(), now.getMonth(), 1); // 1 sets the day to the first day of the month
        }
    },
    endDate: {
        type: Date,
        default: function () {
            // Auto set to the last day of the current month
            const now = new Date(); // Current date and time
            return new Date(now.getFullYear(), now.getMonth() + 1, 0); // Month + 1 sets it to the next month, 0 sets the day to the last day of the previous month
        }
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default value is the current date
    },
});

module.exports = mongoose.model('Budget', budgetSchema)