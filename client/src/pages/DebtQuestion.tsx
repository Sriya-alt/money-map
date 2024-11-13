import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker';
import { useQuestionnaire } from '../context/QuestionnaireContext';

const DebtQuestion: React.FC = () => {
  const navigate = useNavigate();
  const { setResponse } = useQuestionnaire();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionClick = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleContinue = () => {
    if (selectedOptions.length > 0) {
      setResponse('Debt', selectedOptions.join(', '));
      navigate('/questions/subscriptions');
    }
  };

  return (
    <div className="question-page">
      <ProgressTracker currentStep={1} totalSteps={8} />
      <h2><span role="img" aria-label="credit card">💳</span> Do you currently have any debt?</h2>
      <ul className="options-list">
        {["Credit Card", "Student Loans", "Auto Loans", "Personal Loans", "Medical Debt", "I don't currently have debt"].map((option) => (
          <li
            key={option}
            onClick={() => handleOptionClick(option)}
            className={selectedOptions.includes(option) ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>
      <button className="continue-button" onClick={handleContinue} disabled={selectedOptions.length === 0}>
        Continue
      </button>
    </div>
  );
};

export default DebtQuestion;