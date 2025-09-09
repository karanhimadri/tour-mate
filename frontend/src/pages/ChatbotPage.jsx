import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  FaCloudSun,
  FaCog,
  FaHome,
  FaLanguage,
  FaMapMarkerAlt,
  FaMicrophone,
  FaPaperPlane,
  FaRobot,
  FaSmile,
  FaStop,
  FaUser,
  FaUtensils
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
    { text: 'Best time to visit Rajasthan', category: 'weather', icon: FaCloudSun },
    { text: 'Cultural etiquette tips', category: 'culture', icon: FaSmile }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: FaCog },
    { id: 'homestay', name: 'Homestays', icon: FaHome },
    { id: 'language', name: 'Language', icon: FaLanguage },
    { id: 'food', name: 'Food', icon: FaUtensils },
    { id: 'weather', name: 'Weather', icon: FaCloudSun },
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

  // Load saved preferences and chat history
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('chatbot-dark-mode');
    const savedHistory = localStorage.getItem('chatbot-history');
    const savedSearchHistory = localStorage.getItem('chatbot-search-history');
    
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
    
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setMessages(prev => [...prev, ...parsedHistory]);
      } catch (e) {
        console.log('Could not load chat history');
      }
    }
    
    if (savedSearchHistory) {
      try {
        const parsedSearchHistory = JSON.parse(savedSearchHistory);
        setSearchHistory(parsedSearchHistory);
      } catch (e) {
        console.log('Could not load search history');
      }
    }
  }, []);

  // Save preferences and history
  useEffect(() => {
    localStorage.setItem('chatbot-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    // Only save user messages and bot responses (not the initial message)
    const messagesToSave = messages.slice(1);
    if (messagesToSave.length > 0) {
      localStorage.setItem('chatbot-history', JSON.stringify(messagesToSave.slice(-20))); // Keep last 20 messages
    }
  }, [messages]);

  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('chatbot-search-history', JSON.stringify(searchHistory.slice(0, 10))); // Keep last 10 searches
    }
  }, [searchHistory]);

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

  const clearChatHistory = () => {
    setMessages([{
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your TourMate assistant. I can help you with travel recommendations, local information, language translation, and more. How can I assist you today?',
      timestamp: new Date(),
      reactions: [],
    }]);
    localStorage.removeItem('chatbot-history');
    showNotification('Chat history cleared!');
  };

  const exportChatHistory = () => {
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: messages,
      searchHistory: searchHistory
    };
    
    const dataStr = JSON.stringify(chatData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `tourmate-chat-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showNotification('Chat history exported!');
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
      setInput('');
      setIsTyping(true);

      // Simulate typing delay and generate response
      setTimeout(() => {
        const { response, suggestions } = generateBotResponse(input);
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
    handleSend();
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col"
    >
      <div className="bg-white dark:bg-gray-800 rounded-t-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          TourMate Assistant
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your intelligent travel companion for India
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-white dark:bg-gray-800 p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-xs lg:max-w-md ${
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'bot' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-600 text-white'
                }`}>
                  {message.type === 'bot' ? <FaRobot /> : <FaUser />}
                </div>
                <div className={`p-4 rounded-lg ${
                  message.type === 'bot'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                    : 'bg-indigo-600 text-white'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <FaRobot />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Replies */}
      {messages.length <= 1 && (
        <div className="bg-white dark:bg-gray-800 px-6 py-3 border-t dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply.text)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {reply.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg p-6 border-t dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows="1"
              className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleVoiceInput}
              className={`absolute right-3 top-3 p-1 rounded-full transition-colors ${
                isRecording 
                  ? 'bg-red-500 text-white' 
                  : 'text-gray-400 hover:text-indigo-600'
              }`}
            >
              {isRecording ? <FaStop /> : <FaMicrophone />}
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane />
          </button>
        </div>
        {isRecording && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Recording... Speak now
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ChatbotPage;
