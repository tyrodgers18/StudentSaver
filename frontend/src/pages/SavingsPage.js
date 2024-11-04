// SavingsPage.js

import React, { useState } from 'react';
import axios from 'axios';
import './SavingsPage.css'; 

function SavingsPage() {
    // useState hooks for form input fields
    const [goalName, setGoalName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [endDate, setEndDate] = useState('');

    // useState hook for error and success messages
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSavingsSubmit = async (e) => {
        e.preventDefault(); // Prevents the form from reloading the page

        // Create a savings goal object from the form inputs
        const savingsGoal = {
            userId: '123', // Hard coded for now
            goalName,
            targetAmount,
            endDate: endDate || null, // Null if not given
        };

        console.log('Submitting savings goal: ', savingsGoal);

        try {
            // Make POST request to backend to add a new budget
            const response = await axios.post('http://localhost:3000/api/savings/add', savingsGoal);
            setMessage('Savings goal added successfully!');
            console.log(response.data);

            // Clear form after submission
            setGoalName('');
            setTargetAmount('');

        } catch (error) {
            setError('Error adding savings goal');
            console.error('Error saving goal:', error);
        }
    }

    return (
        <div className='savings-page'>
            <h1>Create a Savings Goal</h1>

            {/* Display error or success message */}
            {error && <p className='error-message'>{error}</p>}
            {message && <p className='success-message'>{message}</p>}

            {/* Form for savings goal input */}
            <form className='savings-form' onSubmit={handleSavingsSubmit}>
                {/* Input field for savings goal name */}
                <label htmlFor='goalName'>Goal Name:</label>
                <input
                    type='text'
                    id='goalName'
                    value={goalName} // Bind the value of the input to the goalName state
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder='e.g., Vacation, New Computer'
                    required
                />

                {/* Input field for target amount */}
                <label htmlFor='targetAmount'>Target Amount ($):</label>
                <input
                    type='number'
                    id='targetAmount'
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    required
                />
                {/* Input field for end date (optional) */}
                <label htmlFor='endDate'>End Date (optional):</label>
                <input
                    type='date'
                    id='endDate'
                    value={endDate} // Binds the value of the input to the endDate state
                    onChange={(e) => setEndDate(e.target.value)}
                />

                {/* Submit button */}
                <button type='Submit'>Submit</button>
            </form>
            
        </div>
    );

};

export default SavingsPage;