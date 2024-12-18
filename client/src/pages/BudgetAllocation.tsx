import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import '../pages/BudgetAllocation.css';
import Layout from '../components/Layout';

const BudgetAllocation: React.FC = () => {
  const navigate = useNavigate();
  const { responses, setAllocation } = useQuestionnaire();
  const monthlyExpenditure = parseFloat(responses['MonthlyExpenditure']?.split(' ')[0] || '0');
  const [allocations, setLocalAllocations] = useState<{ [key: string]: number }>({});
  const [errorMessage, setErrorMessage] = useState('');

  const totalAllocation = Object.values(allocations).reduce((sum, value) => sum + value, 0);

  const handleAllocationChange = (category: string, value: number) => {
    setLocalAllocations((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSave = async () => {
    if (totalAllocation > monthlyExpenditure) {
      const proceed = window.confirm('Total allocation exceeds monthly expenditure! Please reduce the amounts in order to proceed.');
      if (!proceed) {
        setErrorMessage('Total allocation exceeds monthly expenditure! Please reduce the amounts.');
        return;
      }
    }

    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (!token) {
      setErrorMessage('No token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ totalAllocation }),
      });

      if (response.ok) {
        Object.entries(allocations).forEach(([category, amount]) => {
          setAllocation(category, amount);
        });

        navigate('/dashboard'); // Redirect to the dashboard page
      } else {
        const error = await response.json();
        setErrorMessage(error.error || 'Failed to save budget allocation.');
      }
    } catch (error) {
      console.error('Error saving budget allocation:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className="budget-allocation-page">
        <h2>Allocate Your Monthly Expenditure</h2>
        <p>Monthly Expenditure: {monthlyExpenditure} {responses['MonthlyExpenditure']?.split(' ')[1]}</p>

        {Object.entries(responses).map(([question, answer]) => {
          if (question === 'MonthlyExpenditure' || question === 'FinanceFeel') return null;

          const items = answer.split(', ').map((item) => item.trim());

          return items.map((item) => (
            <div key={item} className="allocation-item">
              <label>{item}</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={allocations[item] || ''}
                onChange={(e) => handleAllocationChange(item, parseInt(e.target.value) || 0)}
                className="allocation-input"
              />
            </div>
          ));
        })}

        <div className="total-allocation">
          <strong>Total Allocation:</strong> {totalAllocation} {responses['MonthlyExpenditure']?.split(' ')[1]}
        </div>

        <button
          className="save-button"
          onClick={handleSave}
        >
          Save
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </Layout>
  );
};

export default BudgetAllocation;