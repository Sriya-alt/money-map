import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProgressTracker from '../components/ProgressTracker';
import { useQuestionnaire } from '../context/QuestionnaireContext';

const SavingsGoalQuestion: React.FC = () => {
  const navigate = useNavigate();
  const { setResponse } = useQuestionnaire();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionClick = (option: string) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option) ? prevOptions.filter((item) => item !== option) : [...prevOptions, option]
    );
  };

  const handleContinue = () => {
    if (selectedOptions.length > 0) {
      setResponse('SavingsGoal', selectedOptions.join(', '));
      navigate('/questions/spendings');
    }
  };

  return (
    <Layout>
      <div className="question-page">
        <ProgressTracker currentStep={3} totalSteps={8} />
        <h2>💰 Are you saving, or planning to, for any of these?</h2>
        <ul className="options-list">
          {[
            'Emergency Fund',
            'Retirement',
            'Investments',
            'New Home',
            'New Car',
            'Vacation',
            'Wedding',
            "I don't save for any of these",
          ].map((option) => (
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
    </Layout>
  );
};

export default SavingsGoalQuestion;