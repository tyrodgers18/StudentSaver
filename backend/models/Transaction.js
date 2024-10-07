// backend/models/Transaction.js
// Defines a Mongoose schema and model for transactions.

const mongoose = require('mongoose'); // Schemas for MongoDB

// Structure of a transaction in the database using a schema
const transactionSchema = new mongoose.Schema({
    userId: {
        type: String, // ID of the user who made the transaction
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number, // Transaction amount
        required: true,
    },
    type: {
        type: String, // Income or Expense
        enum: ['income', 'expense'], // Restricts values to either 'income' or 'expense'
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // Default value is the current date
    },
    note: {
        type: String,
    },

});

// Create a Mongoose model called Transaction based on the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

// The transaction model is exported allowing it to be imported and used in other parts of the backend like routes
module.exports = Transaction;