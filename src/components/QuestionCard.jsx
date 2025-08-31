import React from 'react';
import { QUESTION_TYPES } from '../data/questions';

const QuestionCard = ({ 
  question, 
  answer, 
  onAnswerChange, 
  className = '' 
}) => {
  if (!question) return null;

  const renderQuestionInput = () => {
    switch (question.type) {
      case QUESTION_TYPES.MULTIPLE_CHOICE:
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => onAnswerChange(option.value)}
                className={`
                  w-full p-4 text-left rounded-lg border-2 transition-all duration-200
                  ${answer === option.value 
                    ? 'border-primary-500 bg-primary-50 text-primary-800' 
                    : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center
                    ${answer === option.value 
                      ? 'border-primary-500 bg-primary-500' 
                      : 'border-neutral-300'
                    }
                  `}>
                    {answer === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case QUESTION_TYPES.RATING_SCALE:
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-neutral-600 mb-2">
              <span>{question.scale.minLabel}</span>
              <span>{question.scale.maxLabel}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              {Array.from({ length: question.scale.max - question.scale.min + 1 }, (_, i) => {
                const value = question.scale.min + i;
                return (
                  <button
                    key={value}
                    onClick={() => onAnswerChange(value)}
                    className={`
                      w-12 h-12 rounded-full border-2 font-semibold transition-all duration-200
                      ${answer === value 
                        ? 'border-primary-500 bg-primary-500 text-white shadow-lg' 
                        : 'border-neutral-300 bg-white hover:border-primary-300 hover:bg-primary-50'
                      }
                    `}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-center text-sm text-neutral-500">
              {answer && (
                <span>Selected: {answer}</span>
              )}
            </div>
          </div>
        );

      case QUESTION_TYPES.SLIDER:
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-neutral-600 mb-2">
              <span>{question.scale.minLabel}</span>
              <span>{question.scale.maxLabel}</span>
            </div>
            <div className="px-3">
              <input
                type="range"
                min={question.scale.min}
                max={question.scale.max}
                value={answer || question.scale.min}
                onChange={(e) => onAnswerChange(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((answer || question.scale.min) - question.scale.min) / (question.scale.max - question.scale.min) * 100}%, #e5e5e5 ${((answer || question.scale.min) - question.scale.min) / (question.scale.max - question.scale.min) * 100}%, #e5e5e5 100%)`
                }}
              />
            </div>
            <div className="text-center text-lg font-semibold text-primary-600">
              {answer || question.scale.min}{question.scale.unit || '%'}
            </div>
          </div>
        );

      case QUESTION_TYPES.OPEN_ENDED:
        return (
          <textarea
            value={answer || ''}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder={question.placeholder}
            rows={6}
            className="
              w-full p-4 border-2 border-neutral-200 rounded-lg 
              focus:border-primary-500 focus:ring-2 focus:ring-primary-100 
              transition-colors duration-200 resize-none
              font-medium text-neutral-800 placeholder-neutral-500
            "
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-neutral-200 ${className}`}>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-800 leading-relaxed">
            {question.question}
          </h2>
          {question.required && (
            <p className="text-sm text-neutral-500 mt-2">
              * This question is required
            </p>
          )}
        </div>
        
        <div className="mb-6">
          {renderQuestionInput()}
        </div>

        {/* Character count for open-ended questions */}
        {question.type === QUESTION_TYPES.OPEN_ENDED && answer && (
          <div className="text-xs text-neutral-500 text-right">
            {answer.length} characters
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;