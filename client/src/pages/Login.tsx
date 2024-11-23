import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import {getToken, logout} from '../api/auth'; 

async function checkInput(email: string, psswd: string): Promise<boolean>{
  const isFormComplete = email && psswd;
  if(isFormComplete){return true;}else{return false;}
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const [isFormComplete, setIsFormComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

      //const data = await response.json();

      /* if (response.ok && data.success) {
        console.log('Success:', data);
        navigate('/dashboard') 
      } else {
        // Show error message if login fails
        setErrorMessage(data.message || 'Login failed. Please try again.');
      } */
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token); // Save the token in local storage. Will use a cookie eventually after more research
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
    <div className="login-page">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email.toLowerCase()}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>
        Login
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Login;