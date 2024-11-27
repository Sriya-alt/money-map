import React, { useState } from 'react';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import './BudgetTable.css'; // Import the CSS file

const BudgetTable: React.FC = () => {
  const { allocations, activity, setActivity } = useQuestionnaire();
  const [inputValues, setInputValues] = useState<Record<string, number>>({});

  const handleActivityChange = (category: string, value: number) => {
    setInputValues((prev) => ({ ...prev, [category]: value }));
  };

  const handleSave = (category: string) => {
    if (inputValues[category] !== undefined) {
      setActivity(category, inputValues[category]);
    }
  };

  return (
    <div className="budget-table-container">
      <h3>Budget Allocation</h3>
      <table className="budget-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Budgeted</th>
            <th>Activity</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(allocations).map(([category, budget]) => {
            const spent = activity[category] || 0;
            const available = budget - spent;

            return (
              <tr key={category}>
                <td>{category}</td>
                <td>£{budget.toFixed(2)}</td>
                <td>£{spent.toFixed(2)}</td>
                <td className={available < 0 ? 'negative' : ''}>£{available.toFixed(2)}</td>
                <td>
                  <div className="action-container">
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={inputValues[category] || ''}
                      onChange={(e) => handleActivityChange(category, parseFloat(e.target.value) || 0)}
                      className="activity-input"
                    />
                    <button onClick={() => handleSave(category)} className="save-button">
                      Save
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;