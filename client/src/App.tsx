import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';
import { QuestionnaireProvider } from './context/QuestionnaireContext'; 
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
import NotificationPage from './pages/NotificationPage';
import UserAccountPage from './components/UserAccountPage';
import SupportPage from "./components/Support";
import BudgetPage from "./pages/BudgetPage";

function App() {
  return (
    <BrowserRouter>
      <QuestionnaireProvider>
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
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="*" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<UserAccountPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        </Routes>
      </QuestionnaireProvider>
    </BrowserRouter>
  );
}

export default App;