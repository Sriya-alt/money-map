import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Sidebar from '../components/SideBar';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import ExpenditurePieChart from '../components/ExpenditurePieChart';
import BudgetTable from '../components/BudgetTable';
import NotificationCard from '../components/NotificationCard';
import RecentTransactionsCard from '../components/RecentTransactionsCard';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { responses, allocations, getRemainingBalance } = useQuestionnaire();
  const [date, setDate] = useState<Date | null>(new Date());
  const navigate = useNavigate();

  const recentTransactions = [
    { type: 'EXPENSE', amount: '£23.54' },
    { type: 'EXPENSE', amount: '£102.22' },
    { type: 'EXPENSE', amount: '£3.78' },
  ];

  const handleViewMoreNotifications = () => {
    navigate('/notifications'); // Navigate directly to the Notifications page
  };

  const handleViewMoreTransactions = () => {
    alert('Redirecting to transactions page...');
    // Add logic for navigating to transactions page if required
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      {/* Top Section */}
      <div className="top-section">
        <div className="balance-title-section">
          <div className="dashboard-header">
            <img src={require('../assets/logo.png')} alt="Logo" className="dashboard-logo" />
            <h1 className="dashboard-title">Dashboard</h1>
          </div>
          <div className="balance-section">
            <h2>£{getRemainingBalance().toFixed(2)}</h2>
            <p>Remaining Balance</p>
          </div>
        </div>

        <div className="calendar-section">
          <h3>Calendar</h3>
          <Calendar value={date} onChange={(value) => setDate(value as Date)} />
        </div>

        <div className="recent-transactions-section">
          <h3>Recent Transactions</h3>
          <RecentTransactionsCard
            transactions={recentTransactions}
            onViewMore={handleViewMoreTransactions} // Pass the required prop
          />
        </div>

        <div className="notification-section">
          <NotificationCard count={4} onClick={handleViewMoreNotifications} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="pie-chart-section">
          <h3>Expenditure Overview</h3>
          <ExpenditurePieChart data={allocations} />
        </div>

        <div className="budget-table-section">
          <h3>Budget Allocation</h3>
          <BudgetTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;