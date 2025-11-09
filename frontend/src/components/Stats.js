import React, { useState, useEffect } from 'react';
import { transactionAPI } from '../services/api';
import './Stats.css';

const Stats = ({ refresh }) => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactionCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [refresh]);

  const fetchStats = async () => {
    try {
      const response = await transactionAPI.getStats();
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="stats-loading">Loading statistics...</div>;
  }

  return (
    <div className="stats-container">
      <div className="stat-card income">
        <div className="stat-icon">📈</div>
        <div className="stat-info">
          <h3>Total Income</h3>
          <p className="stat-amount">₹{stats.totalIncome.toFixed(2)}</p>
        </div>
      </div>

      <div className="stat-card expense">
        <div className="stat-icon">📉</div>
        <div className="stat-info">
          <h3>Total Expense</h3>
          <p className="stat-amount">₹{stats.totalExpense.toFixed(2)}</p>
        </div>
      </div>

      <div className="stat-card balance">
        <div className="stat-icon">💰</div>
        <div className="stat-info">
          <h3>Balance</h3>
          <p className={`stat-amount ${stats.balance >= 0 ? 'positive' : 'negative'}`}>
            ₹{stats.balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="stat-card total">
        <div className="stat-icon">📊</div>
        <div className="stat-info">
          <h3>Transactions</h3>
          <p className="stat-amount">{stats.transactionCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;