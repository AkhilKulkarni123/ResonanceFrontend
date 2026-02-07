import { createContext, useState, useCallback } from 'react';

export const DreamContext = createContext(null);

export function DreamProvider({ children }) {
  const [currentDream, setCurrentDream] = useState(null);
  const [recordingStep, setRecordingStep] = useState('record'); // record, review, context, analyzing, results

  const resetSession = useCallback(() => {
    setCurrentDream(null);
    setRecordingStep('record');
  }, []);

  return (
    <DreamContext.Provider value={{
      currentDream,
      setCurrentDream,
      recordingStep,
      setRecordingStep,
      resetSession,
    }}>
      {children}
    </DreamContext.Provider>
  );
}
