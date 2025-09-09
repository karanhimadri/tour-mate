import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
    FaCamera,
    FaCloudSun,
    FaCog,
    FaCompass,
    FaCopy,
    FaHeart,
    FaHistory,
    FaHome, FaLanguage,
    FaMapMarkerAlt,
    FaMicrophone,
    FaMoon,
    FaPaperPlane,
    FaPhoneAlt,
    FaRobot,
    FaShare,
    FaSmile,
    FaStop,
    FaSun,
    FaTimes,
    FaUser,
    FaUtensils,
    FaVolumeUp
} from 'react-icons/fa';

const ChatbotPageEnhanced = () => {
  // Core chat state
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your TourMate assistant. I can help you with travel recommendations, local information, language translation, and more. How can I assist you today?',
      timestamp: new Date(),
      reactions: [],
      personality: 'friendly'
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Voice and interaction state
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // UI state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSidebar, setShowSidebar] = useState(true);
  const [activePersonality, setActivePersonality] = useState('friendly');
  
  // History and search
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHistory, setFilteredHistory] = useState([]);
  
  // Refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Themes configuration
  const themes = {
    blue: {
      primary: 'from-blue-600 to-blue-800',
      secondary: 'from-blue-100 to-blue-200',
      accent: 'bg-blue-500',
      text: 'text-blue-600'
    },
    purple: {
      primary: 'from-purple-600 to-purple-800',
      secondary: 'from-purple-100 to-purple-200',
      accent: 'bg-purple-500',
      text: 'text-purple-600'
    },
    green: {
      primary: 'from-green-600 to-green-800',
      secondary: 'from-green-100 to-green-200',
      accent: 'bg-green-500',
      text: 'text-green-600'
    },
    orange: {
      primary: 'from-orange-600 to-orange-800',
      secondary: 'from-orange-100 to-orange-200',
      accent: 'bg-orange-500',
      text: 'text-orange-600'
    }
  };

  // AI Personalities
  const personalities = [
    { id: 'friendly', name: 'Friendly Guide', icon: FaSmile, color: 'text-yellow-500' },
    { id: 'expert', name: 'Travel Expert', icon: FaCompass, color: 'text-blue-500' },
    { id: 'local', name: 'Local Expert', icon: FaMapMarkerAlt, color: 'text-green-500' },
    { id: 'photographer', name: 'Photo Guide', icon: FaCamera, color: 'text-purple-500' }
  ];

  // Quick reply categories
  const categories = [
    { id: 'all', name: 'All', icon: FaCog },
    { id: 'homestay', name: 'Homestays', icon: FaHome },
    { id: 'language', name: 'Language', icon: FaLanguage },
    { id: 'emergency', name: 'Emergency', icon: FaPhoneAlt },
    { id: 'food', name: 'Food', icon: FaUtensils },
    { id: 'weather', name: 'Weather', icon: FaCloudSun },
    { id: 'culture', name: 'Culture', icon: FaSmile }
  ];

  // Quick replies based on category
  const quickReplies = {
    all: [
      { text: 'Find homestays in Kerala', category: 'homestay', icon: FaHome },
      { text: 'Translate "Hello" to Hindi', category: 'language', icon: FaLanguage },
      { text: 'Emergency contacts', category: 'emergency', icon: FaPhoneAlt },
      { text: 'Local food recommendations', category: 'food', icon: FaUtensils },
      { text: 'Best time to visit Rajasthan', category: 'weather', icon: FaCloudSun },
      { text: 'Cultural etiquette tips', category: 'culture', icon: FaSmile }
    ],
    homestay: [
      { text: 'Beach homestays in Goa', category: 'homestay', icon: FaHome },
      { text: 'Mountain homestays in Himachal', category: 'homestay', icon: FaHome },
      { text: 'Heritage homestays in Rajasthan', category: 'homestay', icon: FaHome }
    ],
    language: [
      { text: 'Learn basic Hindi phrases', category: 'language', icon: FaLanguage },
      { text: 'Translate menu items', category: 'language', icon: FaLanguage },
      { text: 'Common travel phrases', category: 'language', icon: FaLanguage }
    ],
    emergency: [
      { text: 'Police contact numbers', category: 'emergency', icon: FaPhoneAlt },
      { text: 'Hospital locations', category: 'emergency', icon: FaPhoneAlt },
      { text: 'Tourist helpline', category: 'emergency', icon: FaPhoneAlt }
    ],
    food: [
      { text: 'Vegetarian restaurants nearby', category: 'food', icon: FaUtensils },
      { text: 'Local street food guide', category: 'food', icon: FaUtensils },
      { text: 'Regional specialties', category: 'food', icon: FaUtensils }
    ],
    weather: [
      { text: 'Current weather conditions', category: 'weather', icon: FaCloudSun },
      { text: 'Monsoon travel tips', category: 'weather', icon: FaCloudSun },
      { text: 'Seasonal packing guide', category: 'weather', icon: FaCloudSun }
    ],
    culture: [
      { text: 'Festival calendar', category: 'culture', icon: FaSmile },
      { text: 'Temple visit guidelines', category: 'culture', icon: FaSmile },
      { text: 'Local customs and traditions', category: 'culture', icon: FaSmile }
    ]
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Filter search history
  useEffect(() => {
    if (searchQuery) {
      const filtered = searchHistory.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(searchHistory);
    }
  }, [searchQuery, searchHistory]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now(),
        type: 'user',
        content: input,
        timestamp: new Date(),
        reactions: []
      };
      
      setMessages(prev => [...prev, newMessage]);
      setSearchHistory(prev => [...new Set([input, ...prev])].slice(0, 10));
      setInput('');
      setIsTyping(true);
      
      // Simulate AI response based on personality
      setTimeout(() => {
        const botResponse = generateBotResponse(input, activePersonality);
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  // Generate bot responses based on personality
  const generateBotResponse = (userInput, personality) => {
    const responses = {
      friendly: {
        homestay: "I'd love to help you find amazing homestays! 🏠 Kerala has beautiful backwater homestays where you can wake up to serene views. Would you like me to suggest some specific locations?",
        language: "Translation is one of my favorite features! 😊 'Hello' in Hindi is 'नमस्ते' (Namaste). Need help with more phrases?",
        emergency: "Safety first! 🚨 Here are important emergency numbers: Police: 100, Fire: 101, Ambulance: 108, Tourist Helpline: 1363. Stay safe!",
        default: "That's a great question! 😊 I'm here to make your Indian adventure amazing. What specific aspect would you like to explore?"
      },
      expert: {
        homestay: "Based on extensive travel data, Kerala's homestays offer authentic experiences. Consider Alleppey for backwaters, Munnar for hill stations, or Thekkady for wildlife proximity.",
        language: "Hindi translation: 'Hello' = 'नमस्ते' (Namaste). Pro tip: Learning basic greetings significantly enhances local interactions and cultural immersion.",
        emergency: "Critical emergency contacts: Police: 100, Medical: 108, Fire: 101, Tourist Helpline: 1363. I recommend saving these immediately upon arrival.",
        default: "I can provide comprehensive travel insights based on seasonal patterns, local expertise, and traveler feedback. What specific information do you need?"
      },
      local: {
        homestay: "Arrey, Kerala homestays are the best! My family friends run one in Kumrakonam - best fish curry you'll ever taste! Want their contact?",
        language: "Hindi mein 'Hello' ka matlab 'Namaste' hai! But in Kerala, we say 'Vanakkam' or 'Namaskaram'. Each state has its own style!",
        emergency: "Bhai, keep these numbers handy: 100 for police, 108 for ambulance. But honestly, ask any local - we Indians always help tourists!",
        default: "Arre yaar, you came to the right person! I know all the hidden gems. Tell me what you want to explore?"
      },
      photographer: {
        homestay: "Kerala homestays offer incredible photography opportunities! Golden hour shots over backwaters, traditional architecture details, and authentic lifestyle moments. Which visual style interests you?",
        language: "Visual learning tip: 'नमस्ते' (Namaste) makes great cultural photography when locals teach you. Document your language learning journey!",
        emergency: "Photography safety: Keep emergency contacts (100, 108, 101, 1363) in your camera bag. Remote locations require extra precautions for equipment and personal safety.",
        default: "Every moment in India is a potential masterpiece! What type of photography experience are you seeking? Landscapes, portraits, street photography?"
      }
    };

    const personalityResponses = responses[personality];
    let responseText = personalityResponses.default;

    Object.keys(personalityResponses).forEach(key => {
      if (userInput.toLowerCase().includes(key)) {
        responseText = personalityResponses[key];
      }
    });

    return {
      id: Date.now() + 1,
      type: 'bot',
      content: responseText,
      timestamp: new Date(),
      reactions: [],
      personality: personality
    };
  };

  // Voice recognition
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      
      recognition.start();
    }
  };

  // Text to speech
  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  // Message actions
  const addReaction = (messageId, reaction) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
        : msg
    ));
  };

  const copyMessage = (content) => {
    navigator.clipboard?.writeText(content);
  };

  const shareMessage = (content) => {
    if (navigator.share) {
      navigator.share({ text: content });
    } else {
      copyMessage(content);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : `bg-gradient-to-br ${themes[currentTheme].secondary}`
    }`}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className={`w-80 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-lg'
              } border-r flex flex-col`}
            >
              {/* Sidebar Header */}
              <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <FaRobot className={themes[currentTheme].text} />
                  TourMate AI
                </h2>
              </div>

              {/* AI Personalities */}
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-3 opacity-70">AI Personality</h3>
                <div className="space-y-2">
                  {personalities.map(personality => (
                    <button
                      key={personality.id}
                      onClick={() => setActivePersonality(personality.id)}
                      className={`w-full p-3 rounded-lg text-left transition-all flex items-center gap-3 ${
                        activePersonality === personality.id
                          ? `${themes[currentTheme].accent} text-white`
                          : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <personality.icon className={personality.color} />
                      <span className="text-sm">{personality.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selector */}
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-3 opacity-70">Themes</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(themes).map(([themeName, theme]) => (
                    <button
                      key={themeName}
                      onClick={() => setCurrentTheme(themeName)}
                      className={`p-2 rounded-lg border-2 transition-all ${
                        currentTheme === themeName ? 'border-current' : 'border-transparent'
                      }`}
                    >
                      <div className={`w-full h-6 rounded bg-gradient-to-r ${theme.primary}`}></div>
                      <span className="text-xs mt-1 block capitalize">{themeName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-3 opacity-70">Categories</h3>
                <div className="space-y-1">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full p-2 rounded-lg text-left transition-all flex items-center gap-3 text-sm ${
                        selectedCategory === category.id
                          ? `${themes[currentTheme].accent} text-white`
                          : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <category.icon className="text-sm" />
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search History */}
              <div className="p-4 flex-1">
                <h3 className="text-sm font-semibold mb-3 opacity-70">Search History</h3>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {filteredHistory.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(item)}
                      className={`w-full p-2 rounded text-left text-sm transition-all truncate ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <FaHistory className="inline mr-2 text-xs opacity-50" />
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`flex-1 p-2 rounded-lg transition-all ${
                      isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {isDarkMode ? <FaSun /> : <FaMoon />}
                  </button>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className={`p-2 rounded-lg transition-all ${
                      isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white/80'} backdrop-blur-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {!showSidebar && (
                  <button
                    onClick={() => setShowSidebar(true)}
                    className={`p-2 rounded-lg ${
                      isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <FaCog />
                  </button>
                )}
                <h1 className="text-xl font-bold">TourMate Assistant</h1>
                <span className={`text-sm px-2 py-1 rounded-full ${themes[currentTheme].accent} text-white`}>
                  {personalities.find(p => p.id === activePersonality)?.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-green-500`}></div>
                <span className="text-sm opacity-70">Online</span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4 max-w-4xl mx-auto">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.type === 'user'
                            ? `bg-gradient-to-r ${themes[currentTheme].primary} text-white`
                            : isDarkMode
                            ? 'bg-gray-700 text-white'
                            : 'bg-white shadow-lg'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {message.type === 'user' ? (
                            <FaUser className="text-sm opacity-75" />
                          ) : (
                            <FaRobot className={`text-sm ${themes[currentTheme].text}`} />
                          )}
                          <span className="text-xs opacity-75">
                            {message.type === 'user' ? 'You' : personalities.find(p => p.id === activePersonality)?.name}
                          </span>
                          <span className="text-xs opacity-50">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        
                        {/* Message Actions */}
                        {message.type === 'bot' && (
                          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
                            <button
                              onClick={() => addReaction(message.id, '❤️')}
                              className="text-xs hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded"
                            >
                              <FaHeart className="text-red-400" />
                            </button>
                            <button
                              onClick={() => copyMessage(message.content)}
                              className="text-xs hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded"
                            >
                              <FaCopy />
                            </button>
                            <button
                              onClick={() => shareMessage(message.content)}
                              className="text-xs hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded"
                            >
                              <FaShare />
                            </button>
                            <button
                              onClick={() => speakMessage(message.content)}
                              className="text-xs hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded"
                            >
                              <FaVolumeUp />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className={`px-4 py-3 rounded-2xl ${
                      isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'
                    }`}>
                      <div className="flex items-center gap-2">
                        <FaRobot className={`text-sm ${themes[currentTheme].text}`} />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Replies */}
            <div className="p-4 border-t">
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {(quickReplies[selectedCategory] || quickReplies.all).map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInput(reply.text);
                        inputRef.current?.focus();
                      }}
                      className={`flex-shrink-0 px-3 py-2 rounded-full text-sm border transition-all ${
                        isDarkMode 
                          ? 'border-gray-600 hover:bg-gray-700' 
                          : 'border-gray-300 hover:bg-gray-50'
                      } flex items-center gap-2`}
                    >
                      <reply.icon className="text-xs" />
                      {reply.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white/80'} backdrop-blur-lg`}>
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <div className={`flex items-center gap-2 p-3 rounded-2xl border ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-700' 
                        : 'border-gray-300 bg-white'
                    } focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent`}>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent outline-none resize-none"
                      />
                      <button
                        onClick={startListening}
                        disabled={isListening}
                        className={`p-2 rounded-full transition-all ${
                          isListening 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : `hover:bg-gray-100 dark:hover:bg-gray-600 ${themes[currentTheme].text}`
                        }`}
                      >
                        {isListening ? <FaStop /> : <FaMicrophone />}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    className={`p-3 rounded-full bg-gradient-to-r ${themes[currentTheme].primary} text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPageEnhanced;
