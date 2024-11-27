import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProgressTracker from '../components/ProgressTracker';
import { useQuestionnaire } from '../context/QuestionnaireContext';

const FinanceFeelQuestion: React.FC = () => {
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
      setResponse('FinanceFeel', selectedOptions.join(', '));
      navigate('/questions/expenditures');
    }
  };

  return (
    <Layout>
      <div className="question-page">
        <ProgressTracker currentStep={5} totalSteps={8} />
        <h2>🌱 How do you feel about your finances today?</h2>
        <ul className="options-list">
          {[
            'Stressed – I want to hide',
            'Unsure – Not much direction',
            'Stable – No fires to put out',
            'Confident – Ready for my TED talk',
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

export default FinanceFeelQuestion;