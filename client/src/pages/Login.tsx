import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getToken, logout } from '../api/auth';
import './Login.css'; // Import the CSS file for styling

async function checkInput(email: string, psswd: string): Promise<boolean>{
  const isFormComplete = email && psswd;
  if(isFormComplete){return true;}else{return false;}
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = getToken();
    if (token) {
      navigate('/dashboard'); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  const handleLogin = async () => {
    const isFormComplete = await checkInput(email, password);
    if (!isFormComplete) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token); // Save the token in local storage
        navigate('/dashboard'); // Navigate to dashboard on success
      } else {
        const error = await response.json();
        setErrorMessage(error.error || 'Login failed.'); // Display error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page after logout
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
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                className="login-input"
                value={email.toLowerCase()}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="button" className="login-button" onClick={handleLogin}>
              Login
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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