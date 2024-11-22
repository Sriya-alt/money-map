import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker';
import { useQuestionnaire } from '../context/QuestionnaireContext';

const FinanceFeelQuestion: React.FC = () => {
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
      setResponse('FinanceFeel', selectedOptions.join(', '));
      navigate('/questions/expenditures');
    }
  };

  return (
    <div className="question-page">
      <ProgressTracker currentStep={5} totalSteps={8} />
      <h2><span role="img" aria-label="seedling">🌱</span> How do you feel about your finances today?</h2>
      <ul className="options-list">
        {["Stressed – I want to hide", "Unsure – Not much direction", "Stable – No fires to put out", "Confident – Ready for my TED talk"].map((option) => (
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

export default FinanceFeelQuestion;