import { useState, useCallback } from 'react';
import { getAllQuestions, getQuestionsByCategory } from '../data/questions';
import { categoryOrder } from '../data/wealthCategories';

export const useQuestionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const allQuestions = getAllQuestions();
  const currentCategory = categoryOrder[currentCategoryIndex];
  const currentCategoryQuestions = getQuestionsByCategory(currentCategory);
  const questionIndexInCategory = currentQuestionIndex - 
    categoryOrder.slice(0, currentCategoryIndex).reduce((acc, cat) => 
      acc + getQuestionsByCategory(cat).length, 0);

  const currentQuestion = allQuestions[currentQuestionIndex];

  // Progress calculations
  const totalQuestions = allQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const categoryProgress = ((questionIndexInCategory + 1) / currentCategoryQuestions.length) * 100;

  // Answer handling
  const setAnswer = useCallback((questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  const getAnswer = useCallback((questionId) => {
    return answers[questionId] || '';
  }, [answers]);

  // Navigation
  const canGoNext = useCallback(() => {
    if (!currentQuestion) return false;
    const answer = getAnswer(currentQuestion.id);
    if (currentQuestion.required && (!answer || answer === '')) {
      return false;
    }
    return currentQuestionIndex < totalQuestions - 1;
  }, [currentQuestion, currentQuestionIndex, totalQuestions, getAnswer]);

  const canGoPrevious = useCallback(() => {
    return currentQuestionIndex > 0;
  }, [currentQuestionIndex]);

  const goNext = useCallback(() => {
    if (canGoNext()) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      // Check if we've moved to a new category
      let nextCategoryIndex = currentCategoryIndex;
      let questionsUpToCategory = 0;
      
      for (let i = 0; i <= nextCategoryIndex; i++) {
        const categoryQuestions = getQuestionsByCategory(categoryOrder[i]);
        if (nextIndex >= questionsUpToCategory + categoryQuestions.length) {
          nextCategoryIndex++;
          questionsUpToCategory += categoryQuestions.length;
        } else {
          break;
        }
      }
      
      if (nextCategoryIndex !== currentCategoryIndex) {
        setCurrentCategoryIndex(nextCategoryIndex);
      }
    } else if (currentQuestionIndex === totalQuestions - 1) {
      setIsComplete(true);
    }
  }, [canGoNext, currentQuestionIndex, currentCategoryIndex, totalQuestions]);

  const goPrevious = useCallback(() => {
    if (canGoPrevious()) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      
      // Check if we've moved to a previous category
      let prevCategoryIndex = currentCategoryIndex;
      let questionsUpToCategory = 0;
      
      for (let i = 0; i < categoryOrder.length; i++) {
        const categoryQuestions = getQuestionsByCategory(categoryOrder[i]);
        if (prevIndex < questionsUpToCategory + categoryQuestions.length) {
          prevCategoryIndex = i;
          break;
        }
        questionsUpToCategory += categoryQuestions.length;
      }
      
      if (prevCategoryIndex !== currentCategoryIndex) {
        setCurrentCategoryIndex(prevCategoryIndex);
      }
    }
  }, [canGoPrevious, currentQuestionIndex, currentCategoryIndex]);

  // Jump to specific question
  const goToQuestion = useCallback((questionIndex) => {
    if (questionIndex >= 0 && questionIndex < totalQuestions) {
      setCurrentQuestionIndex(questionIndex);
      
      // Find the correct category
      let categoryIndex = 0;
      let questionsUpToCategory = 0;
      
      for (let i = 0; i < categoryOrder.length; i++) {
        const categoryQuestions = getQuestionsByCategory(categoryOrder[i]);
        if (questionIndex < questionsUpToCategory + categoryQuestions.length) {
          categoryIndex = i;
          break;
        }
        questionsUpToCategory += categoryQuestions.length;
      }
      
      setCurrentCategoryIndex(categoryIndex);
    }
  }, [totalQuestions]);

  // Get answers by category
  const getAnswersByCategory = useCallback((category) => {
    const categoryQuestions = getQuestionsByCategory(category);
    const categoryAnswers = {};
    
    categoryQuestions.forEach(question => {
      categoryAnswers[question.id] = answers[question.id] || '';
    });
    
    return categoryAnswers;
  }, [answers]);

  // Check if category is complete
  const isCategoryComplete = useCallback((category) => {
    const categoryQuestions = getQuestionsByCategory(category);
    return categoryQuestions.every(question => {
      const answer = answers[question.id];
      return !question.required || (answer && answer !== '');
    });
  }, [answers]);

  return {
    // Current state
    currentQuestion,
    currentCategory,
    currentQuestionIndex,
    currentCategoryIndex,
    questionIndexInCategory,
    isComplete,
    
    // Progress
    progress,
    categoryProgress,
    totalQuestions,
    
    // Answers
    answers,
    setAnswer,
    getAnswer,
    getAnswersByCategory,
    
    // Navigation
    canGoNext,
    canGoPrevious,
    goNext,
    goPrevious,
    goToQuestion,
    
    // Category info
    isCategoryComplete,
    
    // Data
    allQuestions,
    currentCategoryQuestions
  };
};