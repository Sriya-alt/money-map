import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-selection-page">
      <h2>Login or Sign Up</h2>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/signup')}>Sign Up</button>
    </div>
  );
};

export default AuthSelection;