import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import './SummaryPage.css';

const SummaryPage: React.FC = () => {
  const { responses } = useQuestionnaire();
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/questions/budget-allocations');
  };

  return (
    <Layout>
      <div className="summary-page">
        <div className="summary-container">
          <h2 className="summary-header">Your Answers</h2>
          <ul className="summary-list">
            {Object.entries(responses).map(([question, answer]) => (
              <li key={question} className="summary-item">
                <span>{question}:</span> {answer || 'N/A'}
              </li>
            ))}
          </ul>
          <button onClick={handleFinish} className="finish-button">
            Finish
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SummaryPage;