// DashboardPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {

    const[transactions, setTransactions] = useState([]); // Store the fetched transactions from the backend
    const[total, setTotal] = useState(0); // Store the calculate total money of a user

    useEffect(() => {
        console.log('DashboardPage rendered');

        // Retrieve a users transactions
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/transactions/123'); // GET request to retrieve transactions
                setTransactions(response.data);
                console.log('Fetched Transactions:', response.data);

                calculateTotal(response.data); 
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
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
    
        const newTotal = income - expenses;
        console.log(`Calculated Total Balance: $${newTotal}`); 
        setTotal(newTotal);
    };

    // Capitalize income or expense
    const capitalizeTransactionType = (type) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    return (
        <div>
            <h1>Dashboard Page</h1>
            <h2>Total Balance: ${total.toFixed(2)}</h2> {/* Two decimal places */}
            <h3>Transactions:</h3>
            <ul>
                {transactions.map(transaction => ( // Map over the transaction array to list each transaction
                    <li key={transaction._id}>
                        {capitalizeTransactionType(transaction.type)}: $ {transaction.amount} - {transaction.category}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DashboardPage;