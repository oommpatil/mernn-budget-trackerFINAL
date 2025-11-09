import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Stats from '../components/Stats';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import './Dashboard.css';

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to refresh stats and transaction list
  const handleTransactionAdded = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <p>Track your income and expenses efficiently</p>
        </div>

        <Stats refresh={refreshKey} />
        
        <TransactionForm onTransactionAdded={handleTransactionAdded} />
        
        <TransactionList refresh={refreshKey} />
      </div>
    </div>
  );
};

export default Dashboard;