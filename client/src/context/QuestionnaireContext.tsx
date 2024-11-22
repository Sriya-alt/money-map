import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuestionnaireContextType {
  responses: Record<string, string>;
  setResponse: (question: string, answer: string) => void;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export const QuestionnaireProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [responses, setResponses] = useState<Record<string, string>>({});

  const setResponse = (question: string, answer: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [question]: answer,
    }));
  };

  return (
    <QuestionnaireContext.Provider value={{ responses, setResponse }}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) throw new Error("useQuestionnaire must be used within QuestionnaireProvider");
  return context;
};