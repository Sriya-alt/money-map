import React from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

const Home: React.FC = () => {
  return (
    <div className="Home">
      <header className="Home-header">
        <h1>Welcome to the Financial Budgeting App</h1>
        <p>Manage your finances efficiently and effectively.</p>
      </header>

      {/* Login and signup buttons */}
      <div className="Home-buttons">
        <Link to="/login">
          <button className="Home-login">Login</button>
        </Link>
        <Link to="/signup">
          <button className="Home-signup">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;