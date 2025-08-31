import React, { useState } from 'react';
import QuestionnaireFlow from './components/QuestionnaireFlow';
import ReportGenerator from './components/ReportGenerator';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState<'questionnaire' | 'report'>('questionnaire');
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleQuestionnaireComplete = (questionnaireAnswers: Record<string, any>) => {
    setAnswers(questionnaireAnswers);
    setCurrentView('report');
  };

  const handleBackToQuestionnaire = () => {
    setCurrentView('questionnaire');
  };

  const handleStartOver = () => {
    setAnswers({});
    setCurrentView('questionnaire');
    localStorage.removeItem('vision-guide-answers');
    localStorage.removeItem('vision-guide-current-question');
    localStorage.removeItem('vision-guide-session-id');
  };

  return (
    <div className="App">
      {currentView === 'questionnaire' ? (
        <QuestionnaireFlow onComplete={handleQuestionnaireComplete} />
      ) : (
        <ReportGenerator 
          answers={answers}
          onBack={handleBackToQuestionnaire}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}

export default App;
