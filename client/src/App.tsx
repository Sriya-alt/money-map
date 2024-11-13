import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import AuthSelection from './pages/AuthSelection';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import DebtQuestion from './pages/DebtQuestion';
import SubscriptionQuestion from './pages/SubscriptionQuestion';
import SavingsGoalQuestion from './pages/SavingsGoalQuestion';
import FinanceFeelQuestion from './pages/FinanceFeelQuestion';
import SpendingQuestion from   './pages/SpendingQuestion';
import ExpenditureQuestion from './pages/ExpenditureQuestion';
import BudgetAllocation from './pages/BudgetAllocation'; 
import SummaryPage from './pages/SummaryPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/auth-selection" element={<AuthSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/questions/debt" element={<DebtQuestion />} />
        <Route path="/questions/subscriptions" element={<SubscriptionQuestion />} />
        <Route path="/questions/savings-goals" element={<SavingsGoalQuestion />} />
        <Route path="/questions/finance-feel" element={<FinanceFeelQuestion />} />
        <Route path="/questions/spendings" element={<SpendingQuestion />} />
        <Route path="/questions/expenditures" element={<ExpenditureQuestion />} />
        <Route path="/questions/budget-allocations" element={<BudgetAllocation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="*" element={<Onboarding />} />
      </Routes>
    </div>
  );
}

export default App;