import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { getToken, logout } from '../api/auth';

const Sidebar: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; dateOfBirth: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = getToken();
      if (!token) {
        navigate('/');
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
          setUserInfo(data); // Assuming the data is an array with a single user object
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    logout(); // Call the logout function to remove the token and delete the cookie
    navigate('/'); // Redirect to the home page
  };

  const initials = userInfo?.name
    ? userInfo.name
        .split(' ')
        .map((n) => n[0].toUpperCase())
        .join('')
    : '';

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-avatar">{initials}</div>
        <div className="user-info">
          <p className="user-name">{userInfo?.name || 'N/A'}</p>
          {/* <p className="user-email">{userInfo?.email || 'N/A'}</p> */}
          {/* <p className="user-dob">DOB: {userInfo?.dateOfBirth || 'N/A'}</p> */}
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
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;