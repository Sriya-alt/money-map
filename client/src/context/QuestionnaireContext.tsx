import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuestionnaireContextType {
  responses: Record<string, string>; // Stores user responses
  allocations: Record<string, number>; // Stores budget allocations
  activity: Record<string, number>; // Tracks spending for each category
  initialBalance: number; // Initial budget balance
  getRemainingBalance: () => number; // Calculate remaining balance
  setResponse: (question: string, answer: string) => void; // Updates a specific response
  setAllocation: (category: string, amount: number) => void; // Updates allocations
  setActivity: (category: string, amount: number) => void; // Updates activity
  resetResponses: () => void; // Resets all responses
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export const QuestionnaireProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [activity, setActivityState] = useState<Record<string, number>>({});
  const initialBalance = 1000; // Initial balance is set to £1,000

  // Calculate the remaining balance
  const getRemainingBalance = () => {
    const totalAllocated = Object.values(allocations).reduce((sum, value) => sum + value, 0);
    return initialBalance - totalAllocated;
  };

  // Function to update a response
  const setResponse = (question: string, answer: string) => {
    setResponses((prev) => ({ ...prev, [question]: answer }));
  };

  // Function to update a budget allocation
  const setAllocation = (category: string, amount: number) => {
    setAllocations((prev) => ({ ...prev, [category]: amount }));
  };

  // Function to update activity (spending)
  const setActivity = (category: string, amount: number) => {
    setActivityState((prev) => ({ ...prev, [category]: amount }));
  };

  // Function to reset all data
  const resetResponses = () => {
    setResponses({});
    setAllocations({});
    setActivityState({});
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        responses,
        allocations,
        activity,
        initialBalance,
        getRemainingBalance,
        setResponse,
        setAllocation,
        setActivity,
        resetResponses,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};