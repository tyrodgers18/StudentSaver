// TransactionsPage.js

import React, { useState } from 'react';
import axios from 'axios'; // HTTP requests
import './TransactionsPage.css'; 

const TransactionsPage = () => {
    // useState hooks for form input fields
    const [type, setType] = useState('income'); // 'type' stores whether the transaction is income or expense
    const [amount, setAmount] = useState(''); 
    const [category, setCategory] = useState(''); 
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');

    // useState hook for error and success messages
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the form from reloading the page

        // Create a transaction object from the form inputs
        const transaction = {
            userId: '123',
            type,
            amount,
            category,
            date,
            note
        };

        console.log('Submitting transaction:', transaction);

        try {
            // Make POST request to backend to add a new transaction
            const response = await axios.post('http://localhost:3000/api/transactions/add', transaction);
            setMessage('Transaction added succesfully!');
            console.log(response.data);

            // Clear form after submission
            setAmount('');
            setCategory('');
            setDate('');
            setNote('');
        
        } catch (error) {
            setError('Error adding transaction. Try again.');
            console.error('Error adding the transaction:', error);
        }
    }


    return (
        <div className='transactions-page'>
            <h1>New Transaction</h1> 

            {/* Display error or success message */}
            {error && <p className='error-message'>{error}</p>}
            {message && <p className='success-message'>{message}</p>}

            {/* Type selection buttons */}
            <div className='transaction-type-buttons'>
                <div
                        className={`transaction-type-button ${type === 'income' ? 'selected' : ''}`}
                        onClick={() => setType('income')}
                >
                    Income
                </div>
                <div
                    className={`transaction-type-button ${type === 'expense' ? 'selected' : ''}`}
                    onClick={() => setType('expense')}
                >
                    Expense
                </div>
            </div>


            {/* Form for transaction input */}
            <form className='transaction-form' onSubmit={handleSubmit}> 
                {/* Input field for transaction amount */}
                <label htmlFor='amount'>Amount:</label>
                <input
                    type = 'number'
                    id = 'amount'
                    value = {amount} // Binds the value of the input to the amount state
                    onChange={(e) => setAmount(e.target.value)}
                    required // Makes this input field mandatory
                />

                {/* Input field for category of transaction */}
                <label htmlFor='category'>Category:</label>
                <input
                    type='text'
                    id='category'
                    value={category} // Binds the value of this input to the category state
                    onChange={(e) => setCategory(e.target.value)}
                    required // Makes this input field mandatory
                />

                {/* Input field for the transaction date */}
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date} // Binds the value of this input to the date state
                    onChange={(e) => setDate(e.target.value)}
                    required // Makes this input field mandatory
                />

                {/* Text area for an optional note */}
                <label htmlFor="note">Note:</label>
                <textarea
                    id="note"
                    value={note} // Binds the value of this input to the note state
                    onChange={(e) => setNote(e.target.value)} // Update the note as the user types
                />

                {/* Button to submit the form */}
                <button type="submit">Submit</button> {/* Triggers form submission */}
            </form>
        </div>
    );
}

export default TransactionsPage;
