import React from 'react';
import './RecentTransactionsCard.css';

interface Transaction {
  type: string;
  amount: string;
}

interface RecentTransactionsCardProps {
  transactions: Transaction[];
  onViewMore: () => void;
}

const RecentTransactionsCard: React.FC<RecentTransactionsCardProps> = ({
  transactions,
  onViewMore,
}) => {
  return (
    <div className="recent-transactions-card">
      <h4>Recent Transactions</h4>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className="transaction-item">
            <span>{transaction.type}</span>
            <span>{transaction.amount}</span>
          </li>
        ))}
      </ul>
      <button className="view-more-button" onClick={onViewMore}>
        View More
      </button>
    </div>
  );
};

export default RecentTransactionsCard;

// Optional: Add a dummy export if needed
export {};