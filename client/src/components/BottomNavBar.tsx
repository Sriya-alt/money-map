import React from 'react';
import BottomNavBar from '../components/BottomNavBar';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-page">
      <div className="ready-to-assign">
        <h2>£1,000.00</h2>
        <p>Ready to Assign</p>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Dashboard;