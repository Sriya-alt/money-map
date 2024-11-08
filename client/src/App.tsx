import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Budget from './pages/Budget.tsx';
import Transactions from './pages/Transactions.tsx';
import Account from './pages/Account.tsx';
import Login from './auth/Login.tsx';
import Signup from './auth/Signup.tsx';
import Navbar from './components/Navbar.tsx';
import './App.css'; 

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 