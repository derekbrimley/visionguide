import { useState, useEffect, useCallback } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Function to remove the key from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

// Hook for managing questionnaire data persistence
export const useQuestionnaireStorage = () => {
  const [answers, setAnswers, clearAnswers] = useLocalStorage('vision-guide-answers', {});
  const [currentQuestionIndex, setCurrentQuestionIndex, clearCurrentIndex] = useLocalStorage('vision-guide-current-question', 0);
  const [sessionId, setSessionId, clearSessionId] = useLocalStorage('vision-guide-session-id', null);

  // Generate a new session ID if one doesn't exist
  useEffect(() => {
    if (!sessionId) {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
    }
  }, [sessionId, setSessionId]);

  // Save complete session data
  const saveSession = useCallback((data) => {
    const sessionData = {
      ...data,
      sessionId: sessionId,
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };
    
    // Save current session
    window.localStorage.setItem('vision-guide-session', JSON.stringify(sessionData));
    
    // Save to session history
    const sessionHistory = JSON.parse(window.localStorage.getItem('vision-guide-sessions') || '[]');
    const existingIndex = sessionHistory.findIndex(s => s.sessionId === sessionId);
    
    if (existingIndex >= 0) {
      sessionHistory[existingIndex] = sessionData;
    } else {
      sessionHistory.push(sessionData);
    }
    
    // Keep only last 10 sessions
    if (sessionHistory.length > 10) {
      sessionHistory.splice(0, sessionHistory.length - 10);
    }
    
    window.localStorage.setItem('vision-guide-sessions', JSON.stringify(sessionHistory));
  }, [sessionId]);

  // Load session data
  const loadSession = useCallback((loadSessionId) => {
    try {
      const sessionHistory = JSON.parse(window.localStorage.getItem('vision-guide-sessions') || '[]');
      const session = sessionHistory.find(s => s.sessionId === loadSessionId);
      
      if (session) {
        setAnswers(session.answers || {});
        setCurrentQuestionIndex(session.currentQuestionIndex || 0);
        setSessionId(session.sessionId);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading session:', error);
      return false;
    }
  }, [setAnswers, setCurrentQuestionIndex, setSessionId]);

  // Get all saved sessions
  const getSavedSessions = useCallback(() => {
    try {
      const sessionHistory = JSON.parse(window.localStorage.getItem('vision-guide-sessions') || '[]');
      return sessionHistory.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    } catch (error) {
      console.error('Error getting saved sessions:', error);
      return [];
    }
  }, []);

  // Clear all data
  const clearAll = useCallback(() => {
    clearAnswers();
    clearCurrentIndex();
    clearSessionId();
    window.localStorage.removeItem('vision-guide-session');
  }, [clearAnswers, clearCurrentIndex, clearSessionId]);

  return {
    answers,
    setAnswers,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    sessionId,
    saveSession,
    loadSession,
    getSavedSessions,
    clearAll
  };
};