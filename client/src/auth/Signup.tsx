import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp, registerUser } from '../api/auth.ts';
import './auth.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      await registerUser(email, password);
      alert('Sign up successful! Please check your email to confirm your account.');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="auth">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="auth-message">
        <p>Already have an account? <Link to="/login">Click here to login</Link></p>
      </div>
    </div>
  );
}

export default Signup;