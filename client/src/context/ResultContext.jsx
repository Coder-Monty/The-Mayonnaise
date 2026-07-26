import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext(null);

export function ResultProvider({ children }) {
  const [latestPredictorResult, setLatestPredictorResult] = useState(null);
  const [latestResearchResult, setLatestResearchResult] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  return (
    <ResultContext.Provider
      value={{
        latestPredictorResult,
        setLatestPredictorResult,
        latestResearchResult,
        setLatestResearchResult,
        isChatOpen,
        setIsChatOpen,
        toggleChat,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
}

export function useResultContext() {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error('useResultContext must be used within a ResultProvider');
  }
  return context;
}
