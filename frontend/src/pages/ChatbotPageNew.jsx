import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
    FaCog,
    FaCompress,
    FaCopy,
    FaExpand,
    FaHeart,
    FaHome,
    FaLanguage,
    FaMapMarkerAlt,
    FaMicrophone,
    FaMoon,
    FaPaperPlane,
    FaRobot,
    FaShare,
    FaSmile,
    FaStop,
    FaSun,
    FaThumbsUp,
    FaUser,
    FaUtensils,
    FaVolumeUp,
    FaWeather
} from 'react-icons/fa';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your TourMate assistant. I can help you with travel recommendations, local information, language translation, and more. How can I assist you today?',
      timestamp: new Date(),
      reactions: [],
    },
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchHistory, setSearchHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    { text: 'Find homestays in Kerala', category: 'homestay', icon: FaHome },
    { text: 'Translate "Hello" to Hindi', category: 'language', icon: FaLanguage },
    { text: 'Emergency contacts', category: 'emergency', icon: FaMapMarkerAlt },
    { text: 'Local food recommendations', category: 'food', icon: FaUtensils },
    { text: 'Best time to visit Rajasthan', category: 'weather', icon: FaWeather },
    { text: 'Cultural etiquette tips', category: 'culture', icon: FaSmile }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: FaCog },
    { id: 'homestay', name: 'Homestays', icon: FaHome },
    { id: 'language', name: 'Language', icon: FaLanguage },
    { id: 'food', name: 'Food', icon: FaUtensils },
    { id: 'weather', name: 'Weather', icon: FaWeather },
    { id: 'culture', name: 'Culture', icon: FaSmile },
    { id: 'emergency', name: 'Emergency', icon: FaMapMarkerAlt }
  ];

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addReaction = (messageId, reaction) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions?.find(r => r.type === reaction);
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions.map(r => 
              r.type === reaction ? { ...r, count: r.count + 1 } : r
            )
          };
        } else {
          return {
            ...msg,
            reactions: [...(msg.reactions || []), { type: reaction, count: 1 }]
          };
        }
      }
      return msg;
    }));
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
    showNotification('Message copied to clipboard!');
  };

  const shareMessage = (content) => {
    if (navigator.share) {
      navigator.share({
        title: 'TourMate Chat',
        text: content
      });
    } else {
      copyMessage(content);
    }
  };

  const speakMessage = (content) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const showNotification = (message) => {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Add to search history
    setSearchHistory(prev => [userMessage, ...prev.slice(0, 9)]);
    
    let response = '';
    let suggestions = [];
    
    if (lowerMessage.includes('homestay')) {
      response = 'I can help you find authentic homestays! Based on your preferences, I recommend checking our Homestays section. Are you looking for mountain views, beach access, or cultural experiences?';
      suggestions = ['Mountain homestays', 'Beach homestays', 'Cultural homestays', 'Budget options'];
    } else if (lowerMessage.includes('translate') || lowerMessage.includes('language')) {
      response = 'I can help with translations! Try our Language Translator feature. What language pair would you like to translate between?';
      suggestions = ['Hindi to English', 'English to Tamil', 'Local phrases', 'Emergency translations'];
    } else if (lowerMessage.includes('emergency')) {
      response = 'For emergencies, press the SOS button in our Emergency section. Important numbers: Police (100), Ambulance (102), Fire (101). Do you need specific emergency information?';
      suggestions = ['Tourist police', 'Medical emergency', 'Embassy contacts', 'Local helplines'];
    } else if (lowerMessage.includes('food') || lowerMessage.includes('restaurant')) {
      response = 'India has amazing cuisine! I recommend trying local specialties like biryani, masala dosa, or regional dishes. Check our Cultural Feed for food stories and cooking experiences!';
      suggestions = ['Vegetarian options', 'Street food safety', 'Local markets', 'Cooking classes'];
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('time to visit')) {
      response = 'The best time to visit depends on the region! North India: October-March, South India: November-February, Hill stations: April-June & September-November. Which region interests you?';
      suggestions = ['Monsoon season', 'Festival calendar', 'Peak season', 'Off-season deals'];
    } else if (lowerMessage.includes('culture') || lowerMessage.includes('etiquette')) {
      response = 'Indian culture is diverse! Basic etiquette: Remove shoes before entering homes, use right hand for eating, dress modestly at religious sites. Check our Cultural Feed for more insights!';
      suggestions = ['Religious customs', 'Greeting styles', 'Gift giving', 'Festival traditions'];
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = 'Hello there! 🙏 Welcome to TourMate! I\'m here to make your Indian adventure amazing. What would you like to explore today?';
      suggestions = ['Plan itinerary', 'Find accommodations', 'Learn phrases', 'Local customs'];
    } else if (lowerMessage.includes('thank')) {
      response = 'You\'re very welcome! 😊 I\'m always here to help make your travel experience better. Is there anything else you\'d like to know?';
      suggestions = ['More recommendations', 'Travel tips', 'Safety advice', 'Cultural insights'];
    } else {
      response = 'That\'s an interesting question! Let me help you with that. Could you be more specific about what you\'re looking for? I can assist with accommodations, translations, local information, emergencies, and cultural insights.';
      suggestions = ['Be more specific', 'Browse categories', 'Popular questions', 'Contact support'];
    }
    
    return { response, suggestions };
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: input,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      const currentInput = input;
      setInput('');
      setIsTyping(true);

      // Simulate typing delay and generate response
      setTimeout(() => {
        const { response, suggestions } = generateBotResponse(currentInput);
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          content: response,
          suggestions: suggestions,
          timestamp: new Date(),
          reactions: [],
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleQuickReply = (replyText) => {
    setInput(replyText);
    setTimeout(() => handleSend(), 100);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Start recording
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsRecording(false);
        };
        
        recognition.onerror = () => {
          setIsRecording(false);
        };
        
        recognition.onend = () => {
          setIsRecording(false);
        };
        
        recognition.start();
      } else {
        alert('Speech recognition not supported in this browser');
        setIsRecording(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50' : ''} ${isDarkMode ? 'dark' : ''}`}>
      <div className={`max-w-7xl mx-auto ${isFullscreen ? 'h-screen' : 'h-[calc(100vh-2rem)]'} flex ${isFullscreen ? '' : 'p-4'}`}>
        
        {/* Sidebar with Categories and History */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-l-3xl shadow-2xl border border-white/20 p-6 overflow-y-auto"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Chat Assistant</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
              </button>
            </div>
          </div>

          {/* Online Status */}
          <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${isOnline ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className={`text-sm font-medium ${isOnline ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <category.icon size={16} />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Recent Searches</h3>
              <div className="space-y-2">
                {searchHistory.slice(0, 5).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(search)}
                    className="w-full text-left p-2 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors truncate"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-2">
              {quickReplies
                .filter(reply => selectedCategory === 'all' || reply.category === selectedCategory)
                .map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply.text)}
                  className="flex items-center gap-2 p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-indigo-900 dark:hover:to-indigo-800 transition-all duration-200 group text-left"
                >
                  <reply.icon size={14} className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0" />
                  <span className="leading-tight">{reply.text}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-r-3xl shadow-2xl border border-white/20">
          
          {/* Chat Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-tr-3xl">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaRobot className="text-white text-xl" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">TourMate Assistant</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your intelligent travel companion for India</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {messages.length} messages
              </span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'bot' && (
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                      <FaRobot className="text-white text-sm" />
                    </div>
                  )}
                  
                  <div className={`max-w-lg ${message.type === 'user' ? 'order-1' : ''}`}>
                    <div className={`p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white ml-auto'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg border border-gray-200 dark:border-gray-700'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      {/* Message Actions */}
                      {message.type === 'bot' && (
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex gap-2">
                            <button
                              onClick={() => addReaction(message.id, 'like')}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <FaThumbsUp size={10} />
                              {message.reactions?.find(r => r.type === 'like')?.count || 0}
                            </button>
                            <button
                              onClick={() => addReaction(message.id, 'heart')}
                              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <FaHeart size={10} />
                              {message.reactions?.find(r => r.type === 'heart')?.count || 0}
                            </button>
                          </div>
                          
                          <div className="flex gap-1">
                            <button
                              onClick={() => speakMessage(message.content)}
                              className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                              <FaVolumeUp size={12} />
                            </button>
                            <button
                              onClick={() => copyMessage(message.content)}
                              className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                              <FaCopy size={12} />
                            </button>
                            <button
                              onClick={() => shareMessage(message.content)}
                              className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                              <FaShare size={12} />
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested follow-ups:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleQuickReply(suggestion)}
                                className="px-3 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shrink-0">
                      <FaUser className="text-white text-sm" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaRobot className="text-white text-sm" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 rounded-br-3xl">
            <div className="flex items-end gap-4">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full p-4 pr-12 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-2xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200"
                  rows="1"
                  style={{ minHeight: '52px', maxHeight: '120px' }}
                />
                <button
                  onClick={handleVoiceInput}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
                    isRecording
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900'
                  }`}
                >
                  {isRecording ? <FaStop size={16} /> : <FaMicrophone size={16} />}
                </button>
              </div>
              
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
