import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import './Login.css'; // Import the CSS file for styling

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  return (
    <Layout>
      <div className="login-container">
        <div className="login-box">
          <img
            src={require('../assets/logo.png')} // Update the path to match your logo
            alt="Money Map Logo"
            className="login-logo"
          />
          <h2 className="login-title">Money Map</h2>
          <p className="login-subtitle">"Mapping Your Path to Financial Freedom!"</p>
          <h3 className="login-heading">Login</h3>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter Username"
                className="login-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="login-input"
              />
            </div>
            <button type="button" className="login-button" onClick={handleLogin}>
              Login
            </button>
          </form>
          <p className="login-footer">
            Don't have an account? <a href="/signup">Create Account</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;