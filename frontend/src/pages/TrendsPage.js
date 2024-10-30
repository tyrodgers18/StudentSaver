import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import './TrendsPage.css';

const TrendsPage = () => {
    const [transactions, setTransactions] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredData, setFilteredData] = useState([]); // Store data formatted for the chart based on chosen category
    const [error, setError] = useState(null);

    // Fetch transactions when the page loads
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // Replace '123' with the actual user ID or dynamic value
                const response = await axios.get('http://localhost:3000/api/transactions/123'); 
                setTransactions(response.data); // Store transactions
                console.log('Fetched Transactions:', response.data);
            } catch (error) {
                setError('Error fetching transactions');
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions(); // Call the fetch function when the component mounts
    }, []);

    // Ensure transactions is an array and get unique categories for the dropdown
    const categories = transactions ? [...new Set(transactions.map(transaction => transaction.category))] : [];
    

    // Effect to format data for the line chart whenever selectedCategory or transactions changes
    useEffect(() => {
        // Format data for the line chart based on the selected category
        const formatDataForChart = () => {
            // Filter transactions by the selected category
            const categoryTransactions = transactions.filter(
                transaction => transaction.category === selectedCategory
            );

            // Group transactions by month and calculate monthly totals for the category
            const monthlyTotals = categoryTransactions.reduce((acc, transaction) => {
                const month = new Date(transaction.date).toLocaleString('default', { month: 'short' }); // Extract month
                const amount = parseFloat(transaction.amount); // Parse amount to float
                if (!acc[month]) acc[month] = 0; // Initialize month to 0 if not present
                acc[month] += amount;
                return acc;
            }, {});

            // Convert monthly totals object into an array sorted by month for the chart
            const sortedMonthlyData = Object.keys(monthlyTotals)
                .map(month => ({name: month, total: monthlyTotals[month] }))
                .sort((a, b) => new Date(`1 ${a.name} 2024`) - new Date(`1 ${b.name} 2024`)); // Sorting by month

            return sortedMonthlyData;
        };

        // If category, Set the formatted data 
        if (selectedCategory) {
            setFilteredData(formatDataForChart());
        }
    }, [selectedCategory, transactions]);

    // Calculate the monthly comparison message
    const getComparisonMessage = () => {
        if (filteredData.length < 2) return '';
        
        const [lastMonth, currentMonth] = filteredData.slice(-2); // Extract data from the last two months
        const diff = currentMonth.total - lastMonth.total;
        // Return a message based on the difference
        return diff < 0
            ? `You saved $${Math.abs(diff).toFixed(2)} more than last month in ${selectedCategory}. Keep it up!`
            : `You spent $${Math.abs(diff).toFixed(2)} more than last month in ${selectedCategory}. Try to save more next month!`;
    };

    // JSX TrendsPage component
    return (
        <div className='trends-page'>
            <h1>Select a Category to see Spending Insights</h1>
            
            {/* Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Dropdown Menu */}
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Select a Category</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            
            <div className='chart-container'>
                {/* Line Chart */}
                {selectedCategory && (
                    <LineChart
                        width={600}
                        height={360}
                        data={filteredData} // Data for chart based on selected category
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" /> {/* Background grid with dashed lines*/}
                        <XAxis dataKey="name">
                            <Label value="Month" offset={-5} position="insideBottom" />
                        </XAxis>
                        <YAxis>
                            <Label value="Total Amount ($)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                        </YAxis>
                        <Tooltip /> {/* Shows data on hover of graph */}
                        <Legend layout="vertical" align='right' verticalAlign='middle'/>
                        <Line type="monotone" dataKey="total" stroke="#4A90E2" activeDot={{ r: 8 }} />
                    </LineChart>
                )}
            </div>
            {/* Comparison Message */}
            <p className='comparison-message'>{getComparisonMessage()}</p>
        </div>
    );
};

export default TrendsPage;
