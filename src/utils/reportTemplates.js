import { wealthCategories, WEALTH_CATEGORIES } from '../data/wealthCategories';
import { getQuestionsByCategory } from '../data/questions';

// Analyze answers to identify key themes and values
export const analyzeAnswers = (answers) => {
  const analysis = {
    themes: [],
    values: [],
    priorities: {},
    conflicts: [],
    focusAreas: []
  };

  // Analyze each category
  Object.keys(WEALTH_CATEGORIES).forEach(categoryKey => {
    const categoryId = WEALTH_CATEGORIES[categoryKey];
    const categoryAnswers = getCategoryAnswers(answers, categoryId);
    const categoryAnalysis = analyzeCategoryAnswers(categoryAnswers, categoryId);
    
    analysis.priorities[categoryId] = categoryAnalysis;
  });

  // Identify overarching themes
  analysis.themes = identifyThemes(answers);
  analysis.values = identifyValues(answers);
  analysis.focusAreas = identifyFocusAreas(analysis.priorities);
  analysis.conflicts = identifyConflicts(answers);

  return analysis;
};

// Get answers for a specific category
const getCategoryAnswers = (answers, categoryId) => {
  const questions = getQuestionsByCategory(categoryId);
  const categoryAnswers = {};
  
  questions.forEach(question => {
    if (answers[question.id]) {
      categoryAnswers[question.id] = {
        question: question.question,
        answer: answers[question.id],
        type: question.type
      };
    }
  });
  
  return categoryAnswers;
};

// Analyze answers for a specific category
const analyzeCategoryAnswers = (categoryAnswers, categoryId) => {
  const analysis = {
    keyInsights: [],
    completeness: 0,
    priority: 'medium',
    summary: ''
  };

  const answerCount = Object.keys(categoryAnswers).length;
  const totalQuestions = getQuestionsByCategory(categoryId).length;
  analysis.completeness = totalQuestions > 0 ? (answerCount / totalQuestions) * 100 : 0;

  // Category-specific analysis
  switch (categoryId) {
    case WEALTH_CATEGORIES.TIME:
      analysis.keyInsights = analyzeTimeWealth(categoryAnswers);
      break;
    case WEALTH_CATEGORIES.SOCIAL:
      analysis.keyInsights = analyzeSocialWealth(categoryAnswers);
      break;
    case WEALTH_CATEGORIES.MENTAL:
      analysis.keyInsights = analyzeMentalWealth(categoryAnswers);
      break;
    case WEALTH_CATEGORIES.PHYSICAL:
      analysis.keyInsights = analyzePhysicalWealth(categoryAnswers);
      break;
    case WEALTH_CATEGORIES.FINANCIAL:
      analysis.keyInsights = analyzeFinancialWealth(categoryAnswers);
      break;
    default:
      analysis.keyInsights = [];
      break;
  }

  // Determine priority based on insights
  analysis.priority = determinePriority(analysis.keyInsights, categoryAnswers);
  analysis.summary = generateCategorySummary(categoryId, analysis.keyInsights);

  return analysis;
};

// Category-specific analysis functions
const analyzeTimeWealth = (answers) => {
  const insights = [];
  
  Object.values(answers).forEach(({ question, answer, type }) => {
    if (question.includes('control') && type === 'rating_scale') {
      if (answer <= 4) {
        insights.push('Low control over daily schedule - opportunity for improvement');
      } else if (answer >= 8) {
        insights.push('High control over time - good foundation for optimization');
      }
    }
    
    if (question.includes('energize') && answer) {
      insights.push(`Energy patterns: ${answer.substring(0, 100)}...`);
    }
    
    if (question.includes('ideal week') && answer) {
      insights.push('Has a clear vision for ideal time allocation');
    }
  });
  
  return insights;
};

const analyzeSocialWealth = (answers) => {
  const insights = [];
  
  Object.values(answers).forEach(({ question, answer, type }) => {
    if (question.includes('social environment')) {
      insights.push(`Preferred social style: ${answer}`);
    }
    
    if (question.includes('alone time') && type === 'slider') {
      if (answer <= 30) {
        insights.push('Highly social - thrives on connection with others');
      } else if (answer >= 70) {
        insights.push('Values solitude - needs significant alone time');
      } else {
        insights.push('Balanced social needs - flexible between alone and social time');
      }
    }
    
    if (question.includes('community') && answer) {
      insights.push('Values community contribution and connection');
    }
  });
  
  return insights;
};

const analyzeMentalWealth = (answers) => {
  const insights = [];
  
  Object.values(answers).forEach(({ question, answer }) => {
    if (question.includes('fulfilled') && answer) {
      insights.push('Clear understanding of fulfilling activities');
    }
    
    if (question.includes('problems') && answer) {
      insights.push('Identified meaningful problems to solve');
    }
    
    if (question.includes('purpose')) {
      insights.push(`Primary purpose driver: ${answer}`);
    }
    
    if (question.includes('regret') && answer) {
      insights.push('Has identified important life pursuits to explore');
    }
  });
  
  return insights;
};

const analyzePhysicalWealth = (answers) => {
  const insights = [];
  
  Object.values(answers).forEach(({ question, answer }) => {
    if (question.includes('physical state') && answer) {
      insights.push('Has a clear vision for physical wellbeing');
    }
    
    if (question.includes('food')) {
      insights.push(`Food relationship: ${answer}`);
    }
    
    if (question.includes('physical activities') && answer) {
      insights.push('Identified enjoyable movement and exercise preferences');
    }
    
    if (question.includes('rest') && answer) {
      insights.push('Understands the importance of rest and recovery');
    }
  });
  
  return insights;
};

const analyzeFinancialWealth = (answers) => {
  const insights = [];
  
  Object.values(answers).forEach(({ question, answer }) => {
    if (question.includes('lifestyle') && answer) {
      insights.push('Clear vision for how money should enable desired lifestyle');
    }
    
    if (question.includes('relationship with money')) {
      insights.push(`Money mindset: ${answer}`);
    }
    
    if (question.includes('enough') && answer) {
      insights.push('Has thought about financial sufficiency');
    }
    
    if (question.includes('approach to earning')) {
      insights.push(`Preferred earning approach: ${answer}`);
    }
  });
  
  return insights;
};

// Identify overarching themes across all categories
const identifyThemes = (answers) => {
  const themes = [];
  const allAnswers = Object.values(answers).join(' ').toLowerCase();
  
  // Look for common themes in text answers
  const themeKeywords = {
    'autonomy': ['freedom', 'independence', 'control', 'choice', 'flexible'],
    'growth': ['learn', 'grow', 'develop', 'improve', 'challenge'],
    'connection': ['relationship', 'family', 'friends', 'community', 'connect'],
    'creativity': ['creative', 'art', 'express', 'create', 'innovate'],
    'service': ['help', 'serve', 'contribute', 'impact', 'difference'],
    'balance': ['balance', 'harmony', 'equilibrium', 'moderation'],
    'achievement': ['success', 'accomplish', 'achieve', 'excel', 'win']
  };
  
  Object.entries(themeKeywords).forEach(([theme, keywords]) => {
    const score = keywords.reduce((count, keyword) => 
      count + (allAnswers.match(new RegExp(keyword, 'g')) || []).length, 0);
    
    if (score >= 3) {
      themes.push(theme);
    }
  });
  
  return themes;
};

// Identify core values from answers
const identifyValues = (answers) => {
  const values = [];
  
  // This would be more sophisticated in a real implementation
  // For now, we'll extract some basic values based on question patterns
  
  return values;
};

// Identify 2-3 focus areas based on analysis
const identifyFocusAreas = (priorities) => {
  const focusAreas = [];
  
  // Sort categories by priority and completeness
  const categoryScores = Object.entries(priorities).map(([categoryId, analysis]) => ({
    categoryId,
    score: calculateFocusScore(analysis),
    analysis
  }));
  
  categoryScores.sort((a, b) => b.score - a.score);
  
  // Take top 2-3 categories as focus areas
  focusAreas.push(...categoryScores.slice(0, 3).map(item => ({
    category: item.categoryId,
    reason: generateFocusReason(item.categoryId, item.analysis)
  })));
  
  return focusAreas;
};

// Calculate focus score for prioritization
const calculateFocusScore = (analysis) => {
  let score = 0;
  
  // Higher score for areas with more insights
  score += analysis.keyInsights.length * 2;
  
  // Higher score for incomplete areas (opportunity for growth)
  if (analysis.completeness < 80) {
    score += (100 - analysis.completeness) / 10;
  }
  
  // Priority weighting
  const priorityWeight = {
    'high': 3,
    'medium': 2,
    'low': 1
  };
  score += priorityWeight[analysis.priority] || 2;
  
  return score;
};

// Generate reason for focus area selection
const generateFocusReason = (categoryId, analysis) => {
  const categoryName = wealthCategories[categoryId]?.title || categoryId;
  const insights = analysis.keyInsights;
  
  if (insights.length === 0) {
    return `${categoryName} needs attention - opportunity to develop this area further.`;
  }
  
  if (analysis.completeness < 50) {
    return `${categoryName} is partially explored - completing this assessment will provide valuable insights.`;
  }
  
  return `${categoryName} shows strong foundation - ready for targeted development.`;
};

// Identify potential conflicts between categories
const identifyConflicts = (answers) => {
  const conflicts = [];
  
  // This would analyze for contradictions or tensions between different answers
  // For example, wanting high income but also maximum flexibility
  
  return conflicts;
};

// Determine priority level for a category
const determinePriority = (insights, answers) => {
  if (insights.length >= 4) return 'high';
  if (insights.length >= 2) return 'medium';
  return 'low';
};

// Generate category summary
const generateCategorySummary = (categoryId, insights) => {
  const categoryName = wealthCategories[categoryId]?.title || categoryId;
  
  if (insights.length === 0) {
    return `Your ${categoryName} area needs more exploration to develop a clear vision.`;
  }
  
  if (insights.length >= 3) {
    return `You have a well-developed vision for your ${categoryName} with clear preferences and goals.`;
  }
  
  return `Your ${categoryName} vision is emerging with some clear preferences identified.`;
};