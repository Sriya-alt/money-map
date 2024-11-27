import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Importing pages
import Onboarding from './pages/Onboarding';
import AuthSelection from './pages/AuthSelection';
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
import NotificationPage from './pages/NotificationPage'; // Added notification page

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Onboarding />} />

        {/* Authentication Routes */}
        <Route path="/auth-selection" element={<AuthSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Questionnaire Routes */}
        <Route path="/questions/debt" element={<DebtQuestion />} />
        <Route path="/questions/subscriptions" element={<SubscriptionQuestion />} />
        <Route path="/questions/savings-goals" element={<SavingsGoalQuestion />} />
        <Route path="/questions/finance-feel" element={<FinanceFeelQuestion />} />
        <Route path="/questions/spendings" element={<SpendingQuestion />} />
        <Route path="/questions/expenditures" element={<ExpenditureQuestion />} />
        <Route path="/questions/budget-allocations" element={<BudgetAllocation />} />

        {/* Main Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Notifications */}
        <Route path="/notifications" element={<NotificationPage />} />

        {/* Summary Page */}
        <Route path="/summary" element={<SummaryPage />} />

        {/* Fallback route */}
        <Route path="*" element={<Onboarding />} />
      </Routes>
    </div>
  );
}

export default App;