import React, { useState, useEffect } from 'react';
import './pages.css';

const Budget: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="page Budget">
      <header className="page-header">
        <h1>Budget Overview</h1>
        <p>Track your budget and manage your expenses.</p>
        <p className="current-time">Current Time: {formatTime(currentTime)}</p>
      </header>
      <div className="page-content">
        {/* Add your budget tracking content here */}
      </div>
    </div>
  );
}

export default Budget;