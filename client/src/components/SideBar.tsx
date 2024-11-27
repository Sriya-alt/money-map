import React from 'react';
import './Sidebar.css';
import { useQuestionnaire } from '../context/QuestionnaireContext';

const Sidebar: React.FC = () => {
  const { responses } = useQuestionnaire();
  const { name, email, dateOfBirth } = responses;

  const initials = name
    ? name.split(' ').map((n) => n[0].toUpperCase()).join('')
    : '';

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-avatar">{initials}</div>
        <div className="user-info">
          <p className="user-name">{name || 'N/A'}</p>
          <p className="user-email">{email || 'N/A'}</p>
          <p className="user-dob">DOB: {dateOfBirth || 'N/A'}</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/my-account">My Account</a>
          </li>
          <li>
            <a href="/my-spending">My Spending</a>
          </li>
          <li>
            <a href="/budget">Budget</a>
          </li>
          <li>
            <a href="/saving-goals">Saving Goals</a>
          </li>
          <li>
            <a href="/notifications">Notifications</a>
          </li>
        </ul>
      </nav>
      <div className="logout">
        <a href="/logout">Logout</a>
      </div>
    </div>
  );
};

export default Sidebar;