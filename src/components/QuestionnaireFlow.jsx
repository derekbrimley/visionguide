import React, { useState, useEffect, useRef } from 'react';
import { useQuestionnaire } from '../hooks/useQuestionnaire';
import { useQuestionnaireStorage } from '../hooks/useLocalStorage';
import QuestionCard from './QuestionCard';
import Navigation from './Navigation';
import ProgressBar from './ProgressBar';
import CategorySection from './CategorySection';
import { categoryOrder, wealthCategories } from '../data/wealthCategories';
import { getQuestionsByCategory } from '../data/questions';

const QuestionnaireFlow = ({ onComplete }) => {
  const [view, setView] = useState('overview'); // 'overview' or 'questionnaire'
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const initialized = useRef(false);

  // Storage hooks
  const {
    answers: storedAnswers,
    setAnswers: setStoredAnswers,
    currentQuestionIndex: storedQuestionIndex,
    setCurrentQuestionIndex: setStoredQuestionIndex,
    saveSession
  } = useQuestionnaireStorage();

  // Questionnaire logic  
  const questionnaire = useQuestionnaire();

  // Initialize with stored data only once
  useEffect(() => {
    if (!initialized.current && storedAnswers && Object.keys(storedAnswers).length > 0) {
      Object.entries(storedAnswers).forEach(([questionId, answer]) => {
        questionnaire.setAnswer(questionId, answer);
      });
      initialized.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedAnswers, questionnaire.setAnswer]);

  // Initialize question index separately
  useEffect(() => {
    if (storedQuestionIndex > 0) {
      questionnaire.goToQuestion(storedQuestionIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedQuestionIndex, questionnaire.goToQuestion]);

  // Save to storage when answers change
  useEffect(() => {
    if (Object.keys(questionnaire.answers).length > 0) {
      setStoredAnswers(questionnaire.answers);
      setStoredQuestionIndex(questionnaire.currentQuestionIndex);
    }
  }, [questionnaire.answers, questionnaire.currentQuestionIndex, setStoredAnswers, setStoredQuestionIndex]);

  const handleAnswerChange = (answer) => {
    questionnaire.setAnswer(questionnaire.currentQuestion.id, answer);
  };

  const handleNext = () => {
    if (questionnaire.isComplete) {
      onComplete(questionnaire.answers);
    } else {
      questionnaire.goNext();
    }
  };

  const handleSave = () => {
    const sessionData = {
      answers: questionnaire.answers,
      currentQuestionIndex: questionnaire.currentQuestionIndex,
      progress: questionnaire.progress,
      isComplete: questionnaire.isComplete
    };
    
    saveSession(sessionData);
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 2000);
  };

  const handleCategoryClick = (categoryId) => {
    // Find the first question in this category
    let questionIndex = 0;
    for (let i = 0; i < categoryOrder.length; i++) {
      if (categoryOrder[i] === categoryId) {
        break;
      }
      questionIndex += getQuestionsByCategory(categoryOrder[i]).length;
    }
    
    questionnaire.goToQuestion(questionIndex);
    setView('questionnaire');
  };

  const handleEnterCategory = (categoryId) => {
    handleCategoryClick(categoryId);
  };

  const getCategoryProgress = (categoryId) => {
    const categoryQuestions = getQuestionsByCategory(categoryId);
    const answeredQuestions = categoryQuestions.filter(q => 
      questionnaire.answers[q.id] && questionnaire.answers[q.id] !== ''
    );
    return categoryQuestions.length > 0 ? (answeredQuestions.length / categoryQuestions.length) * 100 : 0;
  };

  const renderOverview = () => (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">
            Life Vision Assessment
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Develop a comprehensive vision for your life across five key wealth categories. 
            This assessment will help you create a balanced, holistic approach to living your best life.
          </p>
        </div>

        {/* Overall Progress */}
        <div className="mb-12">
          <ProgressBar
            progress={questionnaire.progress}
            currentCategory={questionnaire.currentCategory}
            categoryProgress={questionnaire.categoryProgress}
            isCategoryComplete={questionnaire.isCategoryComplete}
            onCategoryClick={handleCategoryClick}
          />
        </div>

        {/* Category Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mb-12">
          {categoryOrder.map((categoryId) => (
            <CategorySection
              key={categoryId}
              category={categoryId}
              isActive={questionnaire.currentCategory === categoryId}
              progress={getCategoryProgress(categoryId)}
              onEnter={() => handleEnterCategory(categoryId)}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={() => {
              setView('questionnaire');
            }}
            className="px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            {questionnaire.progress > 0 ? 'Continue Assessment' : 'Start Assessment'}
          </button>
          
          {questionnaire.progress > 0 && (
            <button
              onClick={handleSave}
              className="px-8 py-4 bg-white border border-neutral-200 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-50 transition-colors duration-200"
            >
              Save Progress
            </button>
          )}
        </div>

        {/* Save Message */}
        {showSaveMessage && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            Progress saved!
          </div>
        )}
      </div>
    </div>
  );

  const renderQuestionnaire = () => (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setView('overview')}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Overview
            </button>
            <div className="text-sm text-neutral-500">
              {questionnaire.currentCategory && wealthCategories[questionnaire.currentCategory] && (
                <div className="flex items-center gap-2">
                  <span>{wealthCategories[questionnaire.currentCategory].icon}</span>
                  <span>{wealthCategories[questionnaire.currentCategory].title}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl">
          {questionnaire.currentQuestion ? (
            <QuestionCard
              question={questionnaire.currentQuestion}
              answer={questionnaire.getAnswer(questionnaire.currentQuestion.id)}
              onAnswerChange={handleAnswerChange}
            />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                Assessment Complete!
              </h2>
              <p className="text-neutral-600 mb-8">
                You've answered all questions. Ready to see your personalized life vision report?
              </p>
              <button
                onClick={() => onComplete(questionnaire.answers)}
                className="px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 shadow-lg"
              >
                Generate My Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <Navigation
        canGoPrevious={questionnaire.canGoPrevious}
        canGoNext={questionnaire.canGoNext}
        onPrevious={questionnaire.goPrevious}
        onNext={handleNext}
        onSave={handleSave}
        currentQuestionIndex={questionnaire.currentQuestionIndex}
        totalQuestions={questionnaire.totalQuestions}
        isComplete={questionnaire.isComplete}
      />

      {/* Save Message */}
      {showSaveMessage && (
        <div className="fixed bottom-24 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Progress saved!
        </div>
      )}
    </div>
  );

  return view === 'overview' ? renderOverview() : renderQuestionnaire();
};

export default QuestionnaireFlow;