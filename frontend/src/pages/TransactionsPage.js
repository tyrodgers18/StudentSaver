// TransactionsPage.js

import React, { useState } from 'react';
import './TransactionsPage.css'; 

const TransactionsPage = () => {
    // useState hooks for form input fields
    const [type, setType] = useState('income'); // 'type' stores whether the transaction is income or expense
    const [amount, setAmount] = useState(''); 
    const [category, setCategory] = useState(''); 
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the form from reloading the page

        // Create a transaction object from the form inputs
        const transaction = {
            type,
            amount,
            category,
            date,
            note
        };

        console.log(transaction); // log the transaction (replace with backend call later)

        // Clear form after submission
        setAmount('');
        setCategory('');
        setDate('');
        setNote('');
    }


    return (
        <div className='transactions-page'>
            <h1>New Transaction</h1> 

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
