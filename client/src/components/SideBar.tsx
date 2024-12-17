import React from 'react';
import './Sidebar.css';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const { responses } = useQuestionnaire();
  const { name, email, dateOfBirth } = responses;

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0].toUpperCase())
        .join('')
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
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/account"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-spending"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              My Spending
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/budget"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Budget
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saving-goals"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Saving Goals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notifications"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Notifications
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="logout">
        <NavLink
          to="/logout"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;