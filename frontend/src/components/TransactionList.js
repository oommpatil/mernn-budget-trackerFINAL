import React, { useState, useEffect } from 'react';
import { transactionAPI } from '../services/api';
import './TransactionList.css';

const TransactionList = ({ refresh }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, [refresh]);

  const fetchTransactions = async () => {
    try {
      const response = await transactionAPI.getAll();
      setTransactions(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load transactions');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionAPI.delete(id);
        setTransactions(transactions.filter(t => t._id !== id));
      } catch (err) {
        alert('Failed to delete transaction');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading transactions...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (transactions.length === 0) {
    return (
      <div className="no-transactions">
        <p>📝 No transactions yet. Add your first transaction above!</p>
      </div>
    );
  }

  return (
    <div className="transaction-list-container">
      <h3>Transaction History</h3>
      <div className="transaction-list">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className={`transaction-item ${transaction.type}`}
          >
            <div className="transaction-icon">
              {transaction.type === 'income' ? '📈' : '📉'}
            </div>
            
            <div className="transaction-details">
              <div className="transaction-header">
                <h4>{transaction.category}</h4>
                <span className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                </span>
              </div>
              
              <div className="transaction-meta">
                <span className="transaction-date">{formatDate(transaction.date)}</span>
                {transaction.description && (
                  <span className="transaction-description">
                    {transaction.description}
                  </span>
                )}
              </div>
            </div>
            
            <div className="transaction-actions">
              <button
                onClick={() => handleDelete(transaction._id)}
                className="btn-delete"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;