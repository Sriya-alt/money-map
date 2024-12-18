import React, { useState } from "react";
import "./BudgetPage.css";
import Layout from "../components/Layout";

interface BudgetCategory {
  id: number;
  category: string;
  budgeted: number;
  activity: number;
  available: number;
  message: string;
  scheduleDate: string | null;
  urgency: "green" | "yellow" | "red";
}

const BudgetPage: React.FC = () => {
  const [budgetData, setBudgetData] = useState<BudgetCategory[]>([
    { id: 1, category: "Auto Loans", budgeted: 45, activity: 20, available: 25, message: "", scheduleDate: null, urgency: "green" },
    { id: 2, category: "Online Courses", budgeted: 67, activity: 0, available: 67, message: "", scheduleDate: null, urgency: "yellow" },
    { id: 3, category: "New Car", budgeted: 87, activity: 0, available: 87, message: "", scheduleDate: null, urgency: "green" },
    { id: 4, category: "Personal Care", budgeted: 100, activity: 0, available: 100, message: "", scheduleDate: null, urgency: "red" },
  ]);

  const [newAmount, setNewAmount] = useState<{ [key: number]: number }>({});
  const [messages, setMessages] = useState<{ [key: number]: string }>({});
  const [schedules, setSchedules] = useState<{ [key: number]: string }>({});

  const handleSave = (id: number) => {
    const updatedData = budgetData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          activity: item.activity + (newAmount[id] || 0),
          available: item.available - (newAmount[id] || 0),
          message: messages[id] || "",
          scheduleDate: schedules[id] || null,
        };
      }
      return item;
    });
    setBudgetData(updatedData);
    setNewAmount({ ...newAmount, [id]: 0 });
    setMessages({ ...messages, [id]: "" });
    setSchedules({ ...schedules, [id]: "" });
  };

  const handleUrgencyChange = (id: number, urgency: "green" | "yellow" | "red") => {
    setBudgetData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, urgency } : item
      )
    );
  };

  return (
    <Layout>
      <div className="budget-container">
        <h1>Budget Allocation</h1>
        <table className="budget-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Budgeted</th>
              <th>Activity</th>
              <th>Available</th>
              <th>Enter Amount</th>
              <th>Add Message</th>
              <th>Date</th>
              <th>Urgency</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {budgetData.map((item) => (
              <tr key={item.id} className={`urgency-${item.urgency}`}>
                <td>{item.category}</td>
                <td>£{item.budgeted.toFixed(2)}</td>
                <td>£{item.activity.toFixed(2)}</td>
                <td>£{item.available.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="input-box"
                    value={newAmount[item.id] || ""}
                    onChange={(e) =>
                      setNewAmount({ ...newAmount, [item.id]: parseFloat(e.target.value) })
                    }
                  />
                </td>
                <td>
                  <textarea
                    placeholder="Add a message"
                    className="message-box"
                    value={messages[item.id] || ""}
                    onChange={(e) =>
                      setMessages({ ...messages, [item.id]: e.target.value })
                    }
                  ></textarea>
                </td>
                <td>
                  <input
                    type="date"
                    className="date-box"
                    value={schedules[item.id] || ""}
                    onChange={(e) =>
                      setSchedules({ ...schedules, [item.id]: e.target.value })
                    }
                  />
                </td>
                <td>
                  <select
                    className="urgency-select"
                    value={item.urgency}
                    onChange={(e) =>
                      handleUrgencyChange(
                        item.id,
                        e.target.value as "green" | "yellow" | "red"
                      )
                    }
                  >
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="red">Red</option>
                  </select>
                </td>
                <td>
                  <button
                    className="save-button"
                    onClick={() => handleSave(item.id)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default BudgetPage;