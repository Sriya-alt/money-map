import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useQuestionnaire } from '../context/QuestionnaireContext';

const SummaryPage: React.FC = () => {
  const { responses } = useQuestionnaire();
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/questions/budget-allocations');
  };

  return (
    <Layout>
      <div className="summary-page">
        <h2>Your Answers</h2>
        <ul className="response-list">
          {Object.entries(responses).map(([question, answer]) => (
            <li key={question} className="response-item">
              <strong>{question}:</strong> {answer || 'N/A'}
            </li>
          ))}
        </ul>
        <button onClick={handleFinish} className="finish-button">
          Finish
        </button>
      </div>
    </Layout>
  );
};

export default SummaryPage;