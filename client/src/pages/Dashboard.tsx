import React, { useEffect, useState } from 'react';
import { getToken } from '../api/auth';
import { useQuestionnaire } from '../context/QuestionnaireContext';

const Dashboard: React.FC = () => {
  const { responses } = useQuestionnaire();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Ensure the token is included in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          const error = await response.json();
          setError(error.error || 'Failed to fetch data');
        }
      } catch (error) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
      <div>
        <h2>Your Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Dashboard;