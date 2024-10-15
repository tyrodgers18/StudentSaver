// DashboardPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardPage.css';

function DashboardPage() {

    const[transactions, setTransactions] = useState([]); // Store the fetched transactions from the backend
    const[total, setTotal] = useState(0); // Store the calculate total money of a user
    const[selectedMonth, setSelectedMonth] = useState(''); // State for selected month
    const[budgets, setBudgets] = useState([]); // Store the fetched budgets 
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('DashboardPage rendered');

        // Get the current month to set as the default value for selectedMonth
        const currentMonth = new Date().toLocaleString('default', { month: 'long' }); 
        setSelectedMonth(currentMonth);

        // Retrieve a users transactions and budgets
        const fetchDashboardData = async () => {
            try {
                // Fetch transactions
                const transactionsResponse = await axios.get('http://localhost:3000/api/transactions/123'); // GET request to retrieve transactions
                setTransactions(transactionsResponse.data);
                console.log('Fetched Transactions:', transactionsResponse.data);
                calculateTotal(transactionsResponse.data); 

                // Fetch budgets
                const budgetResponse = await axios.get('http://localhost:3000/api/budget/123');
                setBudgets(budgetResponse.data);
                console.log('Fetched Budgets:', budgetResponse.data);

            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching transactions:', error);
            }
        };

        fetchDashboardData();
    }, []);

    // Calculate total balance
    const calculateTotal = (transactions) => {
        const income = transactions
            .filter(transaction => transaction.type === 'income')
            .reduce((acc, transaction) => { // Use an accumulator to add each income amount
                const amount = parseFloat(transaction.amount);
                console.log(`Adding income: $${amount}`); // Log each income added
                return acc + amount;
            }, 0);

        const expenses = transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((acc, transaction) => {
                const amount = parseFloat(transaction.amount);
                console.log(`Adding expense: $${amount}`); // Log each expense added
                return acc + amount;
            }, 0);

        console.log(`Total Income: $${income}`); // Log total income
        console.log(`Total Expenses: $${expenses}`); // Log total expenses
    
        // New current total
        const newTotal = income - expenses;
        console.log(`Calculated Total Balance: $${newTotal}`); 
        setTotal(newTotal);
    };

    // Capitalize income or expense
    const capitalizeTransactionType = (type) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    // Function to handle month selection
    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    // Utility function to filter transactions by selected month
    const filterTransactionsByMonth = () => {
        if (!selectedMonth) return transactions; // Return all transactions if no month is selected

        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date); 
            const transactionMonth = transactionDate.toLocaleString('default', {month: 'long'});
            return transactionMonth === selectedMonth;
        });
    };

    const calculateBudgetPercentage = (spent, budget) => {
        const percentage = (spent / budget) * 100;
        return Math.min(percentage, 100);
    };

    const handleDeleteBudget = async (budgetId) => {
        try {
            await axios.delete(`http://localhost:3000/api/budget/${budgetId}`);
            setBudgets(budgets.filter(budget => budget._id !== budgetId));
        } catch (error) {
            console.error('Error deleting budget:', error);
            setError('Error deleting budget');
        }
    };

    // Prepare list of months for dropdown
    const months = [
        { value: '', label: 'All Months' },
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' },
    ];

    return (
        <div className='dashboard-container'>
            <div className='budget-section'>
                <h2>Budget Overview</h2>
                {error && <p className='error-message'>{error}</p>}

                {budgets.length > 0 ? (
                    budgets.map((budget) => {
                        const spent = 200; // Placeholder - calc actual spending per category
                        const percentage = calculateBudgetPercentage(spent, budget.budgetAmount);

                        return (
                            <div className="budget-item" key={budget._id}>
                                <h3>{budget.category}</h3>
                                <p>${spent} / ${budget.budgetAmount}</p>
                                <div className="progress-bar">
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                {/* Delete button */}
                                <button className='delete-budget-btn' onClick={() => handleDeleteBudget(budget._id)}>
                                    ❌
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p>No budgets to display</p>
                )}
            </div>

            <div className='transactions-section'> 
                <h1>Total Balance: ${total.toFixed(2)}</h1> {/* Two decimal places */}
            
                {/* Dropdown to select a month */}
                <label htmlFor='month-select'>Filter by Month:</label>
                <select id='month-select' value={selectedMonth} onChange={handleMonthChange}> 
                    {months.map(month => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>

                <h2>Transactions:</h2>
                <ul>
                    {filterTransactionsByMonth().map(transaction => ( // Map over the transaction array to list each transaction
                        <li key={transaction._id}>
                            {capitalizeTransactionType(transaction.type)}: $ {transaction.amount} - {transaction.category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DashboardPage;