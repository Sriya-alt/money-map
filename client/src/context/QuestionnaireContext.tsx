import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuestionnaireContextType {
  responses: Record<string, string>; 
  allocations: Record<string, number>; 
  activity: Record<string, number>; 
  initialBalance: number; 
  getRemainingBalance: () => number; 
  setResponse: (question: string, answer: string) => void; 
  setAllocation: (category: string, amount: number) => void; 
  setActivity: (category: string, amount: number) => void; 
  resetResponses: () => void; 
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export const QuestionnaireProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [activity, setActivityState] = useState<Record<string, number>>({});
  const initialBalance = 1000; 

  
  const getRemainingBalance = () => {
    const totalAllocated = Object.values(allocations).reduce((sum, value) => sum + value, 0);
    return initialBalance - totalAllocated;
  };

 
  const setResponse = (question: string, answer: string) => {
    setResponses((prev) => ({ ...prev, [question]: answer }));
  };

  
  const setAllocation = (category: string, amount: number) => {
    setAllocations((prev) => ({ ...prev, [category]: amount }));
  };

  
  const setActivity = (category: string, amount: number) => {
    setActivityState((prev) => ({ ...prev, [category]: amount }));
  };

  
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