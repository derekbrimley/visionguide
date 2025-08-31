import React, { useState, useEffect } from 'react';
import { analyzeAnswers } from '../utils/reportTemplates';
import { wealthCategories, categoryOrder } from '../data/wealthCategories';

const ReportGenerator = ({ answers, onBack, onStartOver }) => {
  const [analysis, setAnalysis] = useState(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    // Simulate report generation with a delay
    const generateReport = async () => {
      setIsGenerating(true);
      
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const reportAnalysis = analyzeAnswers(answers);
      setAnalysis(reportAnalysis);
      setIsGenerating(false);
    };
    
    generateReport();
  }, [answers]);

  const generateLifeVisionStatement = () => {
    if (!analysis) return '';
    
    const themes = analysis.themes;
    const focusAreas = analysis.focusAreas.map(area => 
      wealthCategories[area.category]?.title.toLowerCase()
    );
    
    // This is a simplified version - in a real app, this would use Claude API
    return `My ideal life is one where I have meaningful control over my time, nurturing relationships that energize me, and pursue work that aligns with my values. I prioritize ${focusAreas.slice(0, 2).join(' and ')} as foundations for a fulfilling life, while maintaining balance across all aspects of wealth. ${themes.includes('autonomy') ? 'Freedom and flexibility are essential to my wellbeing.' : ''} ${themes.includes('growth') ? 'Continuous learning and personal development drive my decisions.' : ''} ${themes.includes('connection') ? 'Deep, meaningful relationships are at the center of my vision.' : ''}`;
  };

  const generateLifeRazorStatement = () => {
    const focusAreas = analysis?.focusAreas || [];
    const themes = analysis?.themes || [];
    
    let razor = "I will say yes to opportunities that ";
    const criteria = [];
    
    if (themes.includes('growth')) {
      criteria.push("challenge me to learn and grow");
    }
    if (themes.includes('autonomy')) {
      criteria.push("give me control over my time and decisions");
    }
    if (themes.includes('connection')) {
      criteria.push("strengthen my relationships or build community");
    }
    if (focusAreas.some(area => area.category === 'time')) {
      criteria.push("align with how I want to spend my time");
    }
    
    if (criteria.length === 0) {
      criteria.push("align with my core values and long-term vision");
    }
    
    return razor + criteria.slice(0, 2).join(" and ") + ".";
  };

  const generateCategoryVision = (categoryId) => {
    const categoryAnalysis = analysis?.priorities[categoryId];
    const categoryData = wealthCategories[categoryId];
    
    if (!categoryAnalysis || !categoryData) {
      return `My vision for ${categoryData?.title || categoryId} is still developing as I explore what matters most to me in this area.`;
    }
    
    const insights = categoryAnalysis.keyInsights;
    if (insights.length === 0) {
      return `My ${categoryData.title} vision is an area for exploration and development.`;
    }
    
    // Generate category-specific vision based on insights
    return generateCategorySpecificVision(categoryId, insights);
  };

  const generateCategorySpecificVision = (categoryId, insights) => {
    const categoryData = wealthCategories[categoryId];
    
    switch (categoryId) {
      case 'time':
        return `I envision my time being spent in alignment with my energy and values, with sufficient control over my schedule to prioritize what matters most. ${insights.join('. ')}.`;
      
      case 'social':
        return `My ideal social life involves ${insights.find(i => i.includes('social style')) || 'meaningful connections'} with people who energize and inspire me. ${insights.filter(i => !i.includes('social style')).join('. ')}.`;
      
      case 'mental':
        return `My mental wealth centers on pursuing meaningful work and growth that aligns with my purpose. ${insights.join('. ')}.`;
      
      case 'physical':
        return `I see my physical health as a foundation for everything else, focusing on feeling strong, energized, and comfortable in my body. ${insights.join('. ')}.`;
      
      case 'financial':
        return `My relationship with money is as a tool to enable the lifestyle and freedom I desire. ${insights.join('. ')}.`;
      
      default:
        return `My vision for ${categoryData.title} incorporates: ${insights.join(', ')}.`;
    }
  };

  const generateNextSteps = () => {
    if (!analysis) return [];
    
    const steps = [];
    const focusAreas = analysis.focusAreas.slice(0, 3);
    
    focusAreas.forEach((area, index) => {
      const categoryData = wealthCategories[area.category];
      steps.push({
        id: index + 1,
        category: area.category,
        title: `Develop Your ${categoryData?.title} Vision`,
        description: `${area.reason} Consider specific actions and changes that align with your ${categoryData?.title.toLowerCase()} goals.`,
        timeframe: '30 days'
      });
    });
    
    // Add general reflection step
    steps.push({
      id: steps.length + 1,
      category: 'reflection',
      title: 'Regular Vision Review',
      description: 'Schedule monthly check-ins to review your progress and adjust your vision as needed.',
      timeframe: 'Ongoing'
    });
    
    return steps;
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-neutral-700 mb-2">
            Generating Your Life Vision Report
          </h2>
          <p className="text-neutral-600">
            Analyzing your responses and crafting your personalized vision...
          </p>
        </div>
      </div>
    );
  }

  const lifeVision = generateLifeVisionStatement();
  const lifeRazor = generateLifeRazorStatement();
  const nextSteps = generateNextSteps();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">
            Your Life Vision Report
          </h1>
          <p className="text-xl text-neutral-600">
            A comprehensive guide to your holistic life vision
          </p>
        </div>

        {/* Life Vision Statement */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">🌟</span>
            Your Life Vision Statement
          </h2>
          <div className="bg-primary-50 rounded-lg p-6">
            <p className="text-lg leading-relaxed text-neutral-800">
              {lifeVision}
            </p>
          </div>
        </div>

        {/* Life Razor */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            Your Life Razor
          </h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <p className="text-lg font-medium text-neutral-800 italic">
              "{lifeRazor}"
            </p>
            <p className="text-sm text-neutral-600 mt-3">
              Use this statement as a filter for making decisions about opportunities, commitments, and life choices.
            </p>
          </div>
        </div>

        {/* Category Visions */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">
            Five Wealth Category Visions
          </h2>
          <div className="space-y-6">
            {categoryOrder.map((categoryId) => {
              const categoryData = wealthCategories[categoryId];
              const categoryAnalysis = analysis?.priorities[categoryId];
              
              return (
                <div key={categoryId} className="border-l-4 pl-6" style={{ borderColor: categoryData.color.replace('bg-', '#').replace('500', '') + '80' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{categoryData.icon}</span>
                    <h3 className="text-xl font-semibold text-neutral-800">
                      {categoryData.title}
                    </h3>
                  </div>
                  <p className="text-neutral-700 leading-relaxed mb-3">
                    {generateCategoryVision(categoryId)}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      categoryAnalysis?.completeness >= 80 
                        ? 'bg-green-100 text-green-800' 
                        : categoryAnalysis?.completeness >= 50 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {Math.round(categoryAnalysis?.completeness || 0)}% complete
                    </span>
                    <span className="text-neutral-500">
                      {categoryAnalysis?.keyInsights.length || 0} insights identified
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Focus Areas */}
        {analysis?.focusAreas && analysis.focusAreas.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              Recommended Focus Areas
            </h2>
            <p className="text-neutral-600 mb-6">
              Based on your responses, these are the 2-3 wealth categories we recommend prioritizing in the next 90 days:
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {analysis.focusAreas.map((area, index) => {
                const categoryData = wealthCategories[area.category];
                return (
                  <div key={area.category} className="bg-primary-50 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{categoryData.icon}</span>
                      <h3 className="font-semibold text-primary-800">
                        {index + 1}. {categoryData.title}
                      </h3>
                    </div>
                    <p className="text-sm text-primary-700">
                      {area.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">✅</span>
            Your Next Steps
          </h2>
          <p className="text-neutral-600 mb-6">
            Specific, actionable steps to begin implementing your life vision:
          </p>
          <div className="space-y-4">
            {nextSteps.map((step) => (
              <div key={step.id} className="flex gap-4 p-4 bg-neutral-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold">
                  {step.id}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-800 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 mb-2">
                    {step.description}
                  </p>
                  <span className="text-xs font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded">
                    {step.timeframe}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => window.print()}
              className="px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200"
            >
              Save as PDF
            </button>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-neutral-100 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-200 transition-colors duration-200"
            >
              Back to Assessment
            </button>
            <button
              onClick={onStartOver}
              className="px-8 py-4 border border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-50 transition-colors duration-200"
            >
              Start New Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;