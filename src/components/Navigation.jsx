import React from 'react';

const Navigation = ({
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onSave,
  currentQuestionIndex,
  totalQuestions,
  isComplete
}) => {
  return (
    <div className="bg-white border-t border-neutral-200 px-6 py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Left side - Previous button */}
        <div className="flex-1">
          <button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${canGoPrevious
                ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:shadow-sm'
                : 'bg-neutral-50 text-neutral-400 cursor-not-allowed'
              }
            `}
          >
            ← Previous
          </button>
        </div>

        {/* Center - Question counter and save button */}
        <div className="flex items-center gap-6">
          <div className="text-sm text-neutral-500 font-medium">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          
          <button
            onClick={onSave}
            className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200"
          >
            Save Progress
          </button>
        </div>

        {/* Right side - Next/Complete button */}
        <div className="flex-1 flex justify-end">
          <button
            onClick={onNext}
            disabled={!canGoNext && !isComplete}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${canGoNext || isComplete
                ? 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }
            `}
          >
            {isComplete ? 'View Report' : 'Next'} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;