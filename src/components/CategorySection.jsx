import React from 'react';
import { wealthCategories } from '../data/wealthCategories';

const CategorySection = ({ category, isActive, onEnter, progress = 0 }) => {
  const categoryData = wealthCategories[category];
  
  if (!categoryData) return null;

  return (
    <div 
      className={`
        bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer
        transform hover:scale-105 hover:shadow-lg
        ${isActive 
          ? 'border-primary-500 shadow-lg' 
          : 'border-neutral-200 hover:border-neutral-300'
        }
      `}
      onClick={onEnter}
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`
            p-4 rounded-xl ${categoryData.lightColor} flex-shrink-0
          `}>
            <span className="text-3xl">{categoryData.icon}</span>
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-neutral-800 mb-2">
              {categoryData.title}
            </h3>
            <p className="text-lg text-neutral-600 mb-4">
              {categoryData.description}
            </p>
            <p className="text-sm text-neutral-500">
              {categoryData.summary}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-neutral-600">Progress</span>
            <span className="text-sm text-neutral-500">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                progress === 100 ? 'bg-green-500' : categoryData.color.replace('bg-', 'bg-')
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <div className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${progress === 100 
              ? 'bg-green-100 text-green-800' 
              : progress > 0 
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-neutral-100 text-neutral-600'
            }
          `}>
            {progress === 100 ? 'Complete' : progress > 0 ? 'In Progress' : 'Not Started'}
          </div>
          
          <div className="text-primary-600 font-medium">
            {isActive ? 'Current' : progress === 100 ? 'Review' : 'Start'} →
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;