// DashboardPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardPage.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


function DashboardPage() {

    const[transactions, setTransactions] = useState([]); // Store the fetched transactions from the backend
    const[total, setTotal] = useState(0); // Store the calculated total money of a user
    const[selectedMonth, setSelectedMonth] = useState(''); // State for selected month
    const[budgets, setBudgets] = useState([]); // Store the fetched budgets 
    const[savingsGoals, setSavingsGoals] = useState([]); // Store the savings goals
    const[error, setError] = useState('');



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
                calculateTotal(transactionsResponse.data); // Get the current total based on transactions incomes/expenses

                // Fetch budgets
                const budgetResponse = await axios.get('http://localhost:3000/api/budget/123');
                setBudgets(budgetResponse.data);
                console.log('Fetched Budgets:', budgetResponse.data);

                // Fetch savings goals
                const savingsResponse = await axios.get('http://localhost:3000/api/savings/123');
                setSavingsGoals(savingsResponse.data);
                console.log('Fetched Savings Goals:', savingsResponse.data);

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

    // Calculate a budgets percentage
    const calculateBudgetPercentage = (spent, budget) => {
        const percentage = (spent / budget) * 100;
        return Math.min(percentage, 100);
    };

    // Calculate a savings goals percentage
    const calculateSavingsPercentage = (currentAmount, targetAmount) => {
        const percentage = (currentAmount / targetAmount) * 100;
        return Math.min(percentage, 100)
    };

    // Helper function to calculate the total spent for a specific budget category
    const calculateSpentForCategory = (category) => {
        // Get the current date and the start of the current month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

         // Filter transactions that match the budget category, are expenses, and are in the current month
         const categoryTransactions = transactions.filter(
            (transaction) => 
                transaction.category === category && 
                transaction.type === 'expense' &&
                new Date(transaction.date) >= startOfMonth // Ensure the transaction is in the current month
        );

        // Sum the amount of all transactions in that category
        return categoryTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    }
    

    // Delete a budget from the dashboard and delete it in the backend
    const handleDeleteBudget = async (budgetId) => {
        try {
            await axios.delete(`http://localhost:3000/api/budget/${budgetId}`);
            setBudgets(budgets.filter(budget => budget._id !== budgetId));
        } catch (error) {
            console.error('Error deleting budget:', error);
            setError('Error deleting budget');
        }
    };

    // Delete a savings goal from the dashboard and backend
    const handleDeleteSavingsGoal = async (goalId) => {
        try {
            await axios.delete(`http://localhost:3000/api/savings/${goalId}`);
            setSavingsGoals(savingsGoals.filter(goal => goal._id !== goalId));
        } catch (error) {
            console.error('Error deleting savings goal:', error);
            setError('Error deleting savings goal');
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

    // const data = [
    //     { name: 'Red', value: 130 },
    //     { name: 'Blue', value: 50 },
    //     { name: 'Yellow', value: 100 },
    //   ];

    // const COLORS = ['#FF6384', '#36A2EB', '#FFCE56'];

    // const SimplePieChart = () => {
    //   return (
    //     <PieChart width={400} height={400}>
    //       <Pie
    //         data={data}
    //         cx={200}
    //         cy={200}
    //         labelLine={false}
    //         outerRadius={80}
    //         fill="#8884d8"
    //         dataKey="value"
    //       >
    //         {data.map((entry, index) => (
    //           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //         ))}
    //       </Pie>
    //       <Tooltip />
    //       <Legend />
    //     </PieChart>
    //   );
    // };


    // Calculate expenses by category for the pie chart
    const calculateExpensesByCategory = () => {
        const expensesByCategory = transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((acc, transaction) => {
                const { category, amount } = transaction;
                if (!acc[category]) {
                    acc[category] = 0;
                }
                acc[category] += parseFloat(amount);
                return acc;
            }, {});

        return Object.keys(expensesByCategory).map(category => ({
            name: category,
            value: expensesByCategory[category],
        }));
    };

    // const expenseData = calculateExpensesByCategory();

    return (
        <div className='dashboard-container'>
            {/* Budget section */}
            <div className='budget-section'>
                <h2>Budget Overview</h2>
                {error && <p className='error-message'>{error}</p>}

                {budgets.length > 0 ? (
                    budgets.map((budget) => {
                        const spent = calculateSpentForCategory(budget.category);
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

            {/* Transactions section */}
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

            {/* Savings section */}
            <div className='savings-section'>
                <h2>Savings Goals</h2>
                {savingsGoals.length > 0 ? (
                    savingsGoals.map((goal) => {
                        const progress = calculateSavingsPercentage(goal.currentAmount, goal.targetAmount);
                        return(
                            <div className='savings-item' key={goal.id}>
                                <h3>{goal.goalName}</h3>
                                <p>${goal.currentAmount} / {goal.targetAmount}</p>
                                <div className='progress-bar'>
                                    <div
                                        className='progress-bar-fill'
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <button className='delete-savings-btn' onClick={() => handleDeleteSavingsGoal(goal._id)}>
                                    ❌
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p>No savings goals to display</p>
                )}
            </div>

            {/* Pie Chart Section */}
            {/* <div className='chart-section'>
                <h2>Expenses by Category</h2>
                <SimplePieChart></SimplePieChart>
            </div> */}
        </div>


        
    )
}

export default DashboardPage;