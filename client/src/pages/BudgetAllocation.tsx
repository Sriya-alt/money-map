import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../context/QuestionnaireContext';

const BudgetAllocation: React.FC = () => {
  const navigate = useNavigate();
  const { responses } = useQuestionnaire();
  
  // Retrieve the monthly expenditure amount from the context
  const monthlyExpenditure = parseFloat(responses['MonthlyExpenditure']?.split(' ')[0] || '0');
  const [allocations, setAllocations] = useState<{ [key: string]: number }>({});
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate the current total allocation
  const totalAllocation = Object.values(allocations).reduce((sum, value) => sum + value, 0);

  // Function to handle input change for each category
  const handleAllocationChange = (category: string, value: number) => {
    setAllocations((prevAllocations) => ({
      ...prevAllocations,
      [category]: value,
    }));
  };

  // Handle Save button
  const handleSave = () => {
    if (totalAllocation > monthlyExpenditure) {
      setErrorMessage('Total allocation exceeds monthly expenditure!');
      return;
    }

    // Save the allocation (can add saving logic here if needed)
    console.log('Allocations:', allocations);

    // Navigate to a summary or dashboard
    navigate('/dashboard'); // Adjust the path as necessary
  };

  return (
    <div className="budget-allocation-page">
      <h2>Allocate Your Monthly Expenditure</h2>
      <p>Monthly Expenditure: {monthlyExpenditure} {responses['MonthlyExpenditure']?.split(' ')[1]}</p>

      {Object.entries(responses).map(([question, answer]) => {
        // Exclude MonthlyExpenditure and FinanceFeel from the allocation fields
        if (question === 'MonthlyExpenditure' || question === 'FinanceFeel') return null;

        // Split each response (comma-separated) into individual items
        const items = answer.split(', ').map((item) => item.trim());

        return items.map((item) => (
          <div key={item} className="allocation-item">
            <label>{item}</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={allocations[item] || ''}
              onChange={(e) => handleAllocationChange(item, parseFloat(e.target.value) || 0)}
              className="allocation-input"
            />
          </div>
        ));
      })}

      <div className="total-allocation">
        <strong>Total Allocation:</strong> {totalAllocation} {responses['MonthlyExpenditure']?.split(' ')[1]}
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button
        className="save-button"
        onClick={handleSave}
        disabled={totalAllocation > monthlyExpenditure}
      >
        Save
      </button>
    </div>
  );
};

export default BudgetAllocation;