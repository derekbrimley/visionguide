export const WEALTH_CATEGORIES = {
  TIME: 'time',
  SOCIAL: 'social',
  MENTAL: 'mental',
  PHYSICAL: 'physical',
  FINANCIAL: 'financial'
};

export const wealthCategories = {
  [WEALTH_CATEGORIES.TIME]: {
    id: WEALTH_CATEGORIES.TIME,
    title: 'Time Wealth',
    description: 'How you spend your time',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    icon: '⏰',
    summary: 'Your relationship with time and how you choose to spend it'
  },
  [WEALTH_CATEGORIES.SOCIAL]: {
    id: WEALTH_CATEGORIES.SOCIAL,
    title: 'Social Wealth',
    description: 'Who you spend time with',
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    icon: '👥',
    summary: 'The relationships and community connections in your life'
  },
  [WEALTH_CATEGORIES.MENTAL]: {
    id: WEALTH_CATEGORIES.MENTAL,
    title: 'Mental Wealth',
    description: 'Your life purpose and meaning',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    icon: '🧠',
    summary: 'Your intellectual growth, purpose, and mental fulfillment'
  },
  [WEALTH_CATEGORIES.PHYSICAL]: {
    id: WEALTH_CATEGORIES.PHYSICAL,
    title: 'Physical Wealth',
    description: 'Diet, fitness, and health',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    icon: '💪',
    summary: 'Your physical health, energy, and body relationship'
  },
  [WEALTH_CATEGORIES.FINANCIAL]: {
    id: WEALTH_CATEGORIES.FINANCIAL,
    title: 'Financial Wealth',
    description: 'Money needed for your desired lifestyle',
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    icon: '💰',
    summary: 'Your relationship with money and financial goals'
  }
};

export const categoryOrder = [
  WEALTH_CATEGORIES.TIME,
  WEALTH_CATEGORIES.SOCIAL,
  WEALTH_CATEGORIES.MENTAL,
  WEALTH_CATEGORIES.PHYSICAL,
  WEALTH_CATEGORIES.FINANCIAL
];