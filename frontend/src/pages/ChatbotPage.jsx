import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaMicrophone, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your TourMate assistant. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      setMessages([
        ...messages,
        {
          id: Date.now(),
          type: 'user',
          content: input,
        },
      ]);

      // Simulate bot response (replace with actual AI implementation)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: 'bot',
            content: 'Thank you for your message. I\'m simulating a response.',
          },
        ]);
      }, 1000);

      setInput('');
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // Implement Web Speech API logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        AI Travel Assistant
      </h1>

      {/* Chat Container */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[600px] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${
                message.type === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user'
                    ? 'bg-indigo-100 dark:bg-indigo-900'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                {message.type === 'user' ? (
                  <FaUser className="text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <FaRobot className="text-gray-600 dark:text-gray-400" />
                )}
              </div>
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t dark:border-gray-700 p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleVoiceInput}
              className={`p-3 rounded-lg transition-colors ${
                isRecording
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <FaMicrophone />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatbotPage;
