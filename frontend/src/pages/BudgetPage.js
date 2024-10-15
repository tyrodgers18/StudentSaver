// BudgetPage.js

import React, { useState } from 'react';
import axios from 'axios';
import './BudgetPage.css'; 


function BudgetPage() {
    // useState hooks for form input fields
    const [category, setCategory] = useState('');
    const [budgetAmount, setBudgetAmount] = useState('');

    // useState hook for error and success messages
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleBudgetSubmit = async (e) => {
        e.preventDefault(); // Prevents the form from reloading the page

        // Create a budget object from the form inputs
        const budget = {
            userId: '123', // Hard coded for now
            category,
            budgetAmount
        };

        console.log('Submitting budget: ', budget);

        try {
            // Make POST request to backend to add a new budget
            const response = await axios.post('http://localhost:3000/api/budget/add', budget);
            setMessage('Budget added successfully!');
            console.log(response.data);

            // Clear form after submission
            setCategory('');
            setBudgetAmount('');

        } catch (error) {
            setError('Error adding budget');
            console.error('Error saving budget:', error);
        }
    }


    return (
        <div className='budget-page'>
            <h1>Set your Budget</h1>

            {/* Display error or success message */}
            {error && <p className='error-message'>{error}</p>}
            {message && <p className='success-message'>{message}</p>}

            {/* Form for budget input */}
            <form className='budget-form' onSubmit={handleBudgetSubmit}> 
                {/* Input field for budget category */}
                <label htmlFor='category'>Category:</label>
                <input 
                    type='text'
                    id='category'
                    value={category} // Binds the value of this input to the category state
                    onChange={ (e) => setCategory(e.target.value)}
                    required
                />

                {/* Input field for budget amount */}
                <label htmlFor='budgetAmount'>Budget Amount:</label>
                <input
                    type='number'
                    id='budgetAmount'
                    value={budgetAmount} // Binds the value of the input to the budgetAmount state
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    required 
                />

                {/* Button to submit the form */}
                <button type='Submit'>Submit</button> {/* Triggers form submission */}
            </form>
        </div>
    );
}

export default BudgetPage;