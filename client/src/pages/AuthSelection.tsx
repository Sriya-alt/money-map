import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthSelection.css';
import Layout from '../components/Layout';

const AuthSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
    <div className="auth-selection-page">
      <h1 className="auth-selection-title">Welcome to MoneyMap</h1>
      <p className="auth-selection-description">
        Login or Sign Up to take control of your finances!
      </p>
      <div className="auth-selection-buttons">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
    </Layout>
  );
};

export default AuthSelection;