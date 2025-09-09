import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
    FaCloudSun,
    FaCopy,
    FaHeart,
    FaHome, FaLanguage,
    FaMapMarkerAlt,
    FaMicrophone,
    FaMoon,
    FaPaperPlane,
    FaRobot,
    FaSmile,
    FaStop,
    FaSun,
    FaUser,
    FaUtensils,
    FaVolumeUp
} from 'react-icons/fa';

const ChatbotPageUserFriendly = () => {
  // Core chat state
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your TourMate assistant. I can help you with travel recommendations, homestays, language translation, emergency contacts, and more. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Quick replies - simplified and more relevant
  const quickReplies = [
    { text: 'Find homestays in Kerala', icon: FaHome, category: 'homestay' },
    { text: 'Translate "Hello" to Hindi', icon: FaLanguage, category: 'language' },
    { text: 'Emergency contacts', icon: FaMapMarkerAlt, category: 'emergency' },
    { text: 'Local food recommendations', icon: FaUtensils, category: 'food' },
    { text: 'Best time to visit Rajasthan', icon: FaCloudSun, category: 'weather' },
    { text: 'Cultural etiquette tips', icon: FaSmile, category: 'culture' }
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now(),
        type: 'user',
        content: input,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInput('');
      setIsTyping(true);
      
      // Simulate AI response
      setTimeout(() => {
        const botResponse = generateBotResponse(input);
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  // Generate bot responses
  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let responseText = "I'm here to help you with your travel needs in India! Feel free to ask about homestays, local recommendations, translations, or any travel-related questions.";

    if (input.includes('homestay') || input.includes('accommodation')) {
      responseText = "I'd love to help you find amazing homestays! 🏠 Kerala has beautiful backwater homestays where you can wake up to serene views. Would you like me to suggest some specific locations like Alleppey, Munnar, or Thekkady?";
    } else if (input.includes('translate') || input.includes('hindi') || input.includes('language')) {
      responseText = "Translation is one of my favorite features! 😊 'Hello' in Hindi is 'नमस्ते' (Namaste). I can help you with more phrases - just ask! Common greetings include 'Dhanyawad' (Thank you) and 'Kshama karein' (Excuse me).";
    } else if (input.includes('emergency') || input.includes('help') || input.includes('contact')) {
      responseText = "Safety first! 🚨 Here are important emergency numbers: Police: 100, Fire: 101, Ambulance: 108, Tourist Helpline: 1363. For any emergency, locals are usually very helpful too. Stay safe!";
    } else if (input.includes('food') || input.includes('restaurant') || input.includes('eat')) {
      responseText = "Indian cuisine is amazing! 🍛 I recommend trying local specialties like Kerala fish curry, Rajasthani dal baati, or South Indian dosas. Would you like vegetarian options or specific regional recommendations?";
    } else if (input.includes('weather') || input.includes('time to visit') || input.includes('season')) {
      responseText = "Weather planning is crucial! ☀️ Rajasthan is best visited October-March (cool weather), while Kerala is great year-round except heavy monsoon (June-September). What destinations are you considering?";
    } else if (input.includes('culture') || input.includes('etiquette') || input.includes('customs')) {
      responseText = "Indian culture is rich and diverse! 🙏 Key tips: Remove shoes before entering homes/temples, use your right hand for eating, dress modestly at religious sites, and always be respectful of local customs. Each region has unique traditions!";
    }

    return {
      id: Date.now() + 1,
      type: 'bot',
      content: responseText,
      timestamp: new Date(),
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

  // Copy message
  const copyMessage = (content) => {
    navigator.clipboard?.writeText(content);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className={`p-4 border-b backdrop-blur-lg ${
          isDarkMode 
            ? 'border-gray-700 bg-gray-800/80' 
            : 'border-white/20 bg-white/80'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                <FaRobot className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold">TourMate Assistant</h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Your AI travel companion for India
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Online</span>
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                    : 'bg-white/50 hover:bg-white/70 text-gray-700'
                }`}
              >
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-2xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-lg ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : isDarkMode
                          ? 'bg-gray-800 text-white border border-gray-700'
                          : 'bg-white text-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {message.type === 'user' ? (
                          <FaUser className="text-sm opacity-75" />
                        ) : (
                          <FaRobot className="text-sm text-blue-500" />
                        )}
                        <span className="text-xs opacity-75 font-medium">
                          {message.type === 'user' ? 'You' : 'TourMate'}
                        </span>
                        <span className="text-xs opacity-50">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      {/* Message Actions for bot messages */}
                      {message.type === 'bot' && (
                        <div className={`flex items-center gap-3 mt-3 pt-2 border-t ${
                          isDarkMode ? 'border-gray-600' : 'border-gray-200'
                        }`}>
                          <button
                            onClick={() => copyMessage(message.content)}
                            className={`text-xs p-2 rounded-lg transition-all ${
                              isDarkMode 
                                ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`}
                            title="Copy message"
                          >
                            <FaCopy />
                          </button>
                          <button
                            onClick={() => speakMessage(message.content)}
                            className={`text-xs p-2 rounded-lg transition-all ${
                              isDarkMode 
                                ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`}
                            title="Listen to message"
                          >
                            <FaVolumeUp />
                          </button>
                          <button
                            className={`text-xs p-2 rounded-lg transition-all ${
                              isDarkMode 
                                ? 'hover:bg-gray-700 text-red-400 hover:text-red-300' 
                                : 'hover:bg-gray-100 text-red-500 hover:text-red-600'
                            }`}
                            title="Like message"
                          >
                            <FaHeart />
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
                  <div className={`px-4 py-3 rounded-2xl shadow-lg ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <FaRobot className="text-sm text-blue-500" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Replies */}
          <div className={`p-4 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-white/20'
          }`}>
            <div className="mb-3">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Quick suggestions:
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(reply.text);
                    inputRef.current?.focus();
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm border transition-all ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-800 hover:bg-gray-700 text-white' 
                      : 'border-gray-300 bg-white/70 hover:bg-white text-gray-700'
                  } flex items-center gap-2 shadow-sm hover:shadow-md`}
                >
                  <reply.icon className="text-xs" />
                  {reply.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className={`p-4 border-t backdrop-blur-lg ${
            isDarkMode 
              ? 'border-gray-700 bg-gray-800/80' 
              : 'border-white/20 bg-white/80'
          }`}>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <div className={`flex items-center gap-2 p-3 rounded-2xl border shadow-lg ${
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
                    placeholder="Ask me about homestays, translations, emergency contacts..."
                    className={`flex-1 bg-transparent outline-none ${
                      isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
                    }`}
                  />
                  <button
                    onClick={startListening}
                    disabled={isListening}
                    className={`p-2 rounded-full transition-all ${
                      isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : isDarkMode
                        ? 'hover:bg-gray-600 text-gray-400'
                        : 'hover:bg-gray-100 text-gray-500'
                    }`}
                    title={isListening ? 'Listening...' : 'Voice input'}
                  >
                    {isListening ? <FaStop /> : <FaMicrophone />}
                  </button>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                title="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPageUserFriendly;
