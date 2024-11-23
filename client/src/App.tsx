import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Budget from './pages/Budget';
import Transactions from './pages/Transactions';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { QuestionnaireProvider } from './context/QuestionnaireContext';
import './App.css'; 

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <QuestionnaireProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </QuestionnaireProvider>
      </div>
    </Router>
  );
}

export default App;