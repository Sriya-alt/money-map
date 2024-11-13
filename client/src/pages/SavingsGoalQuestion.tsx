import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker';
import { useQuestionnaire } from '../context/QuestionnaireContext';

const SavingsGoalQuestion: React.FC = () => {
  const navigate = useNavigate();
  const { setResponse } = useQuestionnaire();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Toggle selection for each option
  const handleOptionClick = (option: string) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option) // Remove if already selected
        : [...prevOptions, option] // Add if not selected
    );
  };

  // Proceed to the next question if at least one option is selected
  const handleContinue = () => {
    if (selectedOptions.length > 0) {
      setResponse('SavingsGoal', selectedOptions.join(', '));
      navigate('/questions/spendings'); // Adjust the path as needed
    }
  };

  return (
    <div className="question-page">
      <ProgressTracker currentStep={3} totalSteps={8} />
      <h2>
        <span role="img" aria-label="money bag">💰</span> Are you saving, or planning to, for any of these?
      </h2>
      <ul className="options-list">
        {[
          "Emergency Fund",
          "Retirement",
          "Investments",
          "New Home",
          "New Car",
          "Vacation",
          "Wedding",
          "I don't save for any of these"
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
      <button
        className="continue-button"
        onClick={handleContinue}
        disabled={selectedOptions.length === 0}
      >
        Continue
      </button>
    </div>
  );
};

export default SavingsGoalQuestion;