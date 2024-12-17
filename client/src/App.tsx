import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Budget from './pages/Budget';
import Transactions from './pages/Transactions';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import DebtQuestion from './pages/DebtQuestion';
import SubscriptionQuestion from './pages/SubscriptionQuestion';
import SavingsGoalQuestion from './pages/SavingsGoalQuestion';
import FinanceFeelQuestion from './pages/FinanceFeelQuestion';
import SpendingQuestion from './pages/SpendingQuestion';
import ExpenditureQuestion from './pages/ExpenditureQuestion';
import BudgetAllocation from './pages/BudgetAllocation';
import SummaryPage from './pages/SummaryPage';
import NotificationPage from './pages/NotificationPage';
import NotificationDetail from './pages/NotificationDetail';
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
            <Route path="/questions/debt" element={<DebtQuestion />} />
            <Route path="/questions/subscriptions" element={<SubscriptionQuestion />} />
            <Route path="/questions/savings-goals" element={<SavingsGoalQuestion />} />
            <Route path="/questions/finance-feel" element={<FinanceFeelQuestion />} />
            <Route path="/questions/spendings" element={<SpendingQuestion />} />
            <Route path="/questions/expenditures" element={<ExpenditureQuestion />} />
            <Route path="/questions/budget-allocations" element={<BudgetAllocation />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/notifications/:category/:id" element={<NotificationDetail />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </QuestionnaireProvider>
      </div>
    </Router>
  );
}

export default App;