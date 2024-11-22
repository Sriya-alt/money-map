import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import ProgressTracker from '../components/ProgressTracker';

const ExpenditureQuestion: React.FC = () => {
  const navigate = useNavigate();
  const { setResponse } = useQuestionnaire();
  const [expenditure, setExpenditure] = useState<string>('');
  const [currency, setCurrency] = useState<string>('Euros');

  const handleContinue = () => {
    if (expenditure && currency) {
      setResponse('MonthlyExpenditure', `${expenditure} ${currency}`);
      navigate('/summary'); // Adjust the next page path as needed
    }
  };

  return (
    <div className="question-page">
      <ProgressTracker currentStep={6} totalSteps={8} />
      <h2>What is your monthly expenditure?</h2>

      <div className="input-group">
        <label htmlFor="expenditure">Enter Amount</label>
        <input
          type="number"
          id="expenditure"
          placeholder="Enter amount"
          value={expenditure}
          onChange={(e) => setExpenditure(e.target.value)}
          className="expenditure-input"
        />
      </div>

      <div className="input-group">
        <label htmlFor="currency">Select Currency</label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="currency-select"
        >
          <option value="€ - Euros">€ - Euros</option>
          <option value="$ - Dollars">$ - Dollars</option>
          <option value="£ - Pounds">£ - Pounds</option>
          <option value="A$ - Australian Dollar">A$ - Australian Dollar</option>
          <option value="C$ - Canadian Dollar">C$ - Canadian Dollar</option>
        </select>
      </div>

      <button
        className="continue-button"
        onClick={handleContinue}
        disabled={!expenditure || !currency}
      >
        Continue
      </button>
    </div>
  );
};

// Ensure the component is exported as a module
export default ExpenditureQuestion;