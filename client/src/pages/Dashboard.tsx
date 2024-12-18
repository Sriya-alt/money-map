import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Sidebar from '../components/SideBar';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import ExpenditurePieChart from '../components/ExpenditurePieChart';
import BudgetTable from '../components/BudgetTable';
import NotificationCard from '../components/NotificationCard';
import RecentTransactionsCard from '../components/RecentTransactionsCard';
import { getToken } from '../api/auth';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { responses, allocations, getRemainingBalance } = useQuestionnaire();
  const [date, setDate] = useState<Date | null>(new Date());
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const recentTransactions = [
    { type: 'EXPENSE', amount: '£23.54' },
    { type: 'EXPENSE', amount: '£102.22' },
    { type: 'EXPENSE', amount: '£3.78' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Ensure the token is included in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          const error = await response.json();
          setError(error.error || 'Failed to fetch data');
        }
      } catch (error) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewMoreNotifications = () => {
    navigate('/notifications'); // Navigate directly to the Notifications page
  };

  const handleViewMoreTransactions = () => {
    alert('Redirecting to transactions page...');
    // Add logic for navigating to transactions page if required
  };

  const handleNavigateToSupport = () => {
    navigate("/support");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
      {}
      <button className="help-button" onClick={handleNavigateToSupport}>
        Help
      </button>
    </div>
  );
};

export default Dashboard;