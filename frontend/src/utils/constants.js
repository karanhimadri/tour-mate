// Application constants

export const API_ENDPOINTS = {
  HOMESTAYS: '/homestays',
  EXPERIENCES: '/experiences',
  STORIES: '/stories',
  CULTURAL_FEED: '/cultural-feed',
  TRANSLATE: '/translate',
  EMERGENCY: '/emergency',
  CHAT: '/chat',
  AUTH: '/auth'
};

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
  BOOKMARKS: 'bookmarks',
  RECENT_SEARCHES: 'recent_searches',
  USER_LOCATION: 'user_location'
};

export const ROUTES = {
  HOME: '/',
  HOMESTAYS: '/homestays',
  ITINERARY: '/itinerary',
  TRANSLATOR: '/translator',
  EXPERIENCES: '/experiences',
  STORIES: '/stories',
  EMERGENCY: '/emergency',
  CULTURAL_FEED: '/cultural-feed',
  CHATBOT: '/chatbot',
  AUTH: '/auth'
};

export const LANGUAGES = {
  ENGLISH: 'en',
  HINDI: 'hi',
  BENGALI: 'bn',
  TELUGU: 'te',
  TAMIL: 'ta',
  MARATHI: 'mr',
  GUJARATI: 'gu',
  KANNADA: 'kn',
  MALAYALAM: 'ml',
  ODIA: 'or'
};

export const EMERGENCY_NUMBERS = {
  POLICE: '100',
  AMBULANCE: '102',
  FIRE: '101',
  TOURIST_POLICE: '1363',
  WOMEN_HELPLINE: '1091',
  RAILWAY: '139',
  ROAD_ACCIDENT: '1073'
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  }
};

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280
};

export const THEME_COLORS = {
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    900: '#312e81'
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    900: '#0f172a'
  }
};

export const DEFAULT_FILTERS = {
  homestays: {
    region: 'all',
    budget: 'all',
    type: 'all',
    rating: 'all'
  },
  experiences: {
    category: 'all',
    duration: 'all',
    price: 'all'
  }
};

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal'
];

export const POPULAR_DESTINATIONS = [
  'Goa',
  'Kerala',
  'Rajasthan',
  'Himachal Pradesh',
  'Uttarakhand',
  'Karnataka',
  'Tamil Nadu',
  'Maharashtra',
  'Delhi',
  'Agra'
];

export const APP_CONFIG = {
  APP_NAME: 'TourMate',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@tourmate.com',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service'
};
