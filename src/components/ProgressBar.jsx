import React from 'react';
import { wealthCategories, categoryOrder } from '../data/wealthCategories';

const ProgressBar = ({ 
  progress, 
  currentCategory, 
  categoryProgress,
  isCategoryComplete,
  onCategoryClick 
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-neutral-700">Overall Progress</span>
          <span className="text-sm text-neutral-500">{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Category Progress */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-neutral-700 mb-3">Wealth Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categoryOrder.map((categoryId) => {
            const category = wealthCategories[categoryId];
            const isActive = currentCategory === categoryId;
            const isComplete = isCategoryComplete(categoryId);
            
            return (
              <button
                key={categoryId}
                onClick={() => onCategoryClick && onCategoryClick(categoryId)}
                className={`
                  p-3 rounded-lg border-2 transition-all duration-200 text-left
                  ${isActive 
                    ? 'border-primary-500 bg-primary-50' 
                    : isComplete 
                      ? 'border-green-500 bg-green-50 hover:bg-green-100' 
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{category.icon}</span>
                  <span className={`text-xs font-medium ${
                    isActive ? 'text-primary-700' : 
                    isComplete ? 'text-green-700' : 'text-neutral-600'
                  }`}>
                    {category.title}
                  </span>
                </div>
                <div className={`w-full ${
                  isActive ? 'bg-primary-200' : 
                  isComplete ? 'bg-green-200' : 'bg-neutral-200'
                } rounded-full h-1`}>
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-primary-500' : 
                      isComplete ? 'bg-green-500' : 'bg-neutral-400'
                    }`}
                    style={{ 
                      width: isActive ? `${categoryProgress}%` : 
                             isComplete ? '100%' : '0%' 
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Category Progress */}
      {currentCategory && (
        <div className="mt-4 p-4 bg-primary-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{wealthCategories[currentCategory].icon}</span>
            <h4 className="font-medium text-primary-800">
              {wealthCategories[currentCategory].title}
            </h4>
          </div>
          <p className="text-sm text-primary-700 mb-3">
            {wealthCategories[currentCategory].description}
          </p>
          <div className="w-full bg-primary-200 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${categoryProgress}%` }}
            />
          </div>
          <p className="text-xs text-primary-600 mt-1">
            {Math.round(categoryProgress)}% complete
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;