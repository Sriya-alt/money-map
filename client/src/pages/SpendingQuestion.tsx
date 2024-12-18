import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProgressTracker from '../components/ProgressTracker';
import { useQuestionnaire } from '../context/QuestionnaireContext';

const SpendingQuestion: React.FC = () => {
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
      setResponse('Spending', selectedOptions.join(', '));
      navigate('/questions/finance-feel');
    }
  };

  return (
    <Layout>
      <div className="question-page">
        <ProgressTracker currentStep={4} totalSteps={8} />
        <h2>Which of these do you regularly spend money on?</h2>
        <ul className="options-list">
          {['Groceries', 'Phone', 'Internet', 'Personal Care', 'Clothing', 'Rent'].map((option) => (
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

export default SpendingQuestion;