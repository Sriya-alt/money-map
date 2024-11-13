import React from 'react';
import { useQuestionnaire } from '../context/QuestionnaireContext';

const Dashboard: React.FC = () => {
  const { responses } = useQuestionnaire();

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="ready-to-assign">
        <h2>£1,000.00</h2>
        <p>Ready to Assign</p>
      </div>
      <div>
        <h2>Your Responses:</h2>
        <ul>
          {Object.entries(responses).map(([question, answer]) => (
            <li key={question}>
              <strong>{question}:</strong> {answer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

