import { WEALTH_CATEGORIES } from './wealthCategories';

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  RATING_SCALE: 'rating_scale',
  OPEN_ENDED: 'open_ended',
  SLIDER: 'slider'
};

export const questions = {
  [WEALTH_CATEGORIES.TIME]: [
    {
      id: 'time_1',
      category: WEALTH_CATEGORIES.TIME,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "How do you currently spend most of your waking hours?",
      options: [
        { value: 'work_traditional', label: 'Traditional 9-5 job' },
        { value: 'work_flexible', label: 'Flexible/remote work' },
        { value: 'entrepreneurship', label: 'Running my own business' },
        { value: 'creative_pursuits', label: 'Creative or artistic pursuits' },
        { value: 'caregiving', label: 'Caregiving responsibilities' },
        { value: 'education', label: 'Learning or education' },
        { value: 'mixed', label: 'A mix of different activities' }
      ],
      required: true
    },
    {
      id: 'time_2',
      category: WEALTH_CATEGORIES.TIME,
      type: QUESTION_TYPES.RATING_SCALE,
      question: "How much control do you feel you have over your daily schedule?",
      scale: { min: 1, max: 10, minLabel: 'No control', maxLabel: 'Complete control' },
      required: true
    },
    {
      id: 'time_3',
      category: WEALTH_CATEGORIES.TIME,
      type: QUESTION_TYPES.OPEN_ENDED,
      question: "What activities consistently energize you vs. drain you?",
      placeholder: "Think about specific activities, times of day, or types of work...",
      required: true
    },
    {
      id: 'time_4',
      category: WEALTH_CATEGORIES.TIME,
      type: QUESTION_TYPES.OPEN_ENDED,
      question: "Describe your ideal week. How would you spend your time if you had complete freedom?",
      placeholder: "Be specific about activities, rhythm, and balance...",
      required: true
    },
    {
      id: 'time_5',
      category: WEALTH_CATEGORIES.TIME,
      type: QUESTION_TYPES.RATING_SCALE,
      question: "How important is having a flexible schedule versus a structured routine?",
      scale: { min: 1, max: 10, minLabel: 'Need structure', maxLabel: 'Need flexibility' },
      required: true
    }
  ],

  [WEALTH_CATEGORIES.SOCIAL]: [
    {
      id: 'social_1',
      category: WEALTH_CATEGORIES.SOCIAL,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "What best describes your ideal social environment?",
      options: [
        { value: 'deep_few', label: 'A few deep, meaningful relationships' },
        { value: 'broad_network', label: 'A broad network of acquaintances' },
        { value: 'tight_community', label: 'A tight-knit community group' },
        { value: 'family_focused', label: 'Primarily family-centered' },
        { value: 'professional_network', label: 'Strong professional network' },
        { value: 'mixed_circles', label: 'Multiple different social circles' }
      ],
      required: true
    },
    {
      id: 'social_2',
      category: WEALTH_CATEGORIES.SOCIAL,
      type: QUESTION_TYPES.SLIDER,
      question: "What's your ideal balance between alone time and social time?",
      scale: { min: 0, max: 100, minLabel: '100% alone', maxLabel: '100% social' },
      required: true
    },
    {
      id: 'social_3',
      category: WEALTH_CATEGORIES.SOCIAL,
      type: QUESTION_TYPES.OPEN_ENDED,
      question: "Who are the most important people in your life, and what makes those relationships meaningful?",
      placeholder: "Think about the qualities and dynamics that matter most...",
      required: true
    },
    {
      id: 'social_4',
      category: WEALTH_CATEGORIES.SOCIAL,
      type: QUESTION_TYPES.OPEN_ENDED,
      question: "What does community mean to you? How do you want to contribute?",
      placeholder: "Consider both receiving support and giving back...",
      required: true
    },
    {
      id: 'social_5',
      category: WEALTH_CATEGORIES.SOCIAL,
      type: QUESTION_TYPES.RATING_SCALE,
      question: "How important is it for you to be around people who share your interests versus those who challenge your perspective?",
      scale: { min: 1, max: 10, minLabel: 'Similar interests', maxLabel: 'Different perspectives' },
      required: true
    }
  ],

  [WEALTH_CATEGORIES.MENTAL]: [
    {
      id: 'mental_1',
      category: WEALTH_CATEGORIES.MENTAL,
      type: QUESTION_TYPES.OPEN_ENDED,
      question: "What activities or pursuits make you feel most fulfilled and alive?",
      placeholder: "Think about when time seems to fly by...",
      required: true
    },
    {
      id: 'mental_2',
      category: WEALTH_CATEGORIES.MENTAL,
      type: QUESTION_TYPES.OPEN_ENDED,
      question: "What problems in the world do you feel called to solve or contribute to?",
      placeholder: "These could be big or small, personal or global...",
      required: true
    },
    {
      id: 'mental_3',
      category: WEALTH_CATEGORIES.MENTAL,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "What drives your sense of purpose most?",
      options: [
        { value: 'helping_others', label: 'Helping others and making a difference' },
        { value: 'creative_expression', label: 'Creative expression and innovation' },
        { value: 'learning_growth', label: 'Continuous learning and growth' },
        { value: 'achievement', label: 'Achievement and recognition' },
        { value: 'autonomy', label: 'Independence and self-direction' },
        { value: 'connection', label: 'Deep connections and relationships' },
        { value: 'legacy', label: 'Building something lasting' }
      ],
      required: true
    },
    {
      id: 'mental_4',
      category: WEALTH_CATEGORIES.MENTAL,
      type: QUESTION_TYPES.OPEN_ENDED,
      question: "What would you regret not pursuing or exploring in your lifetime?",
      placeholder: "Think about experiences, skills, or contributions...",
      required: true
    },
    {
      id: 'mental_5',
      category: WEALTH_CATEGORIES.MENTAL,
      type: QUESTION_TYPES.RATING_SCALE,
      question: "How important is intellectual challenge versus emotional fulfillment in your ideal life?",
      scale: { min: 1, max: 10, minLabel: 'Emotional fulfillment', maxLabel: 'Intellectual challenge' },
      required: true
    }
  ],

  [WEALTH_CATEGORIES.PHYSICAL]: [
    {
      id: 'physical_1',
      category: WEALTH_CATEGORIES.PHYSICAL,
      type: QUESTION_TYPES.OPEN_ENDED,
      question: "How would you describe your ideal physical state? How do you want to feel in your body?",
      placeholder: "Think about energy levels, strength, flexibility, overall wellbeing...",
      required: true
    },
    {
      id: 'physical_2',
      category: WEALTH_CATEGORIES.PHYSICAL,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "What role does food play in your ideal life?",
      options: [
        { value: 'fuel', label: 'Primarily fuel for my body' },
        { value: 'pleasure', label: 'A source of pleasure and enjoyment' },
        { value: 'social', label: 'A way to connect with others' },
        { value: 'cultural', label: 'Cultural expression and tradition' },
        { value: 'mindful', label: 'Mindful, intentional nourishment' },
        { value: 'creative', label: 'Creative outlet and experimentation' }
      ],
      required: true
    },
    {
      id: 'physical_3',
      category: WEALTH_CATEGORIES.PHYSICAL,
      type: QUESTION_TYPES.OPEN_ENDED,
      question: "What physical activities bring you joy? What does movement mean to you?",
      placeholder: "Consider both exercise and everyday movement...",
      required: true
    },
    {
      id: 'physical_4',
      category: WEALTH_CATEGORIES.PHYSICAL,
      type: QUESTION_TYPES.RATING_SCALE,
      question: "How much do you want to prioritize physical appearance versus functional health?",
      scale: { min: 1, max: 10, minLabel: 'Functional health', maxLabel: 'Physical appearance' },
      required: true
    },
    {
      id: 'physical_5',
      category: WEALTH_CATEGORIES.PHYSICAL,
      type: QUESTION_TYPES.OPEN_ENDED,
      question: "What does rest and recovery look like in your ideal life?",
      placeholder: "Think about sleep, relaxation, and recharging...",
      required: true
    }
  ],

  [WEALTH_CATEGORIES.FINANCIAL]: [
    {
      id: 'financial_1',
      category: WEALTH_CATEGORIES.FINANCIAL,
      type: QUESTION_TYPES.OPEN_ENDED,
      question: "What lifestyle do you actually want money to enable? Be specific.",
      placeholder: "Think about experiences, security, freedom, impact...",
      required: true
    },
    {
      id: 'financial_2',
      category: WEALTH_CATEGORIES.FINANCIAL,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "What best describes your relationship with money?",
      options: [
        { value: 'tool', label: 'Money is a tool for achieving my goals' },
        { value: 'security', label: 'Money represents safety and security' },
        { value: 'freedom', label: 'Money means freedom and options' },
        { value: 'stress', label: 'Money is a source of stress or anxiety' },
        { value: 'status', label: 'Money reflects success and status' },
        { value: 'complicated', label: 'I have a complicated relationship with money' }
      ],
      required: true
    },
    {
      id: 'financial_3',
      category: WEALTH_CATEGORIES.FINANCIAL,
      type: QUESTION_TYPES.OPEN_ENDED,
      question: "What would 'enough' money look like for you? How would you know when you have enough?",
      placeholder: "Think about specific scenarios or feelings...",
      required: true
    },
    {
      id: 'financial_4',
      category: WEALTH_CATEGORIES.FINANCIAL,
      type: QUESTION_TYPES.RATING_SCALE,
      question: "How important is financial security versus financial freedom?",
      scale: { min: 1, max: 10, minLabel: 'Security first', maxLabel: 'Freedom first' },
      required: true
    },
    {
      id: 'financial_5',
      category: WEALTH_CATEGORIES.FINANCIAL,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      question: "What's your preferred approach to earning money?",
      options: [
        { value: 'stable_employment', label: 'Stable employment with benefits' },
        { value: 'multiple_streams', label: 'Multiple income streams' },
        { value: 'high_risk_reward', label: 'High risk, high reward ventures' },
        { value: 'passive_income', label: 'Building passive income sources' },
        { value: 'service_based', label: 'Selling services or expertise' },
        { value: 'creative_monetization', label: 'Monetizing creative work' }
      ],
      required: true
    }
  ]
};

// Get all questions in order by category
export const getAllQuestions = () => {
  const allQuestions = [];
  Object.values(questions).forEach(categoryQuestions => {
    allQuestions.push(...categoryQuestions);
  });
  return allQuestions;
};

// Get questions by category
export const getQuestionsByCategory = (category) => {
  return questions[category] || [];
};