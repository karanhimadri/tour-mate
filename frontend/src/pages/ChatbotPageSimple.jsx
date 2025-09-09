import { useState } from 'react';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

const ChatbotPageSimple = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your TourMate assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: input,
        timestamp: new Date(),
      };
      
      setMessages([...messages, newMessage]);
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: 'Thank you for your message! I\'m here to help you with your travel needs.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaRobot className="text-blue-500" />
            TourMate Chatbot
          </h1>
          <p className="text-gray-600">Your AI travel companion for India</p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.type === 'user' ? (
                      <FaUser className="text-sm" />
                    ) : (
                      <FaRobot className="text-sm" />
                    )}
                    <span className="text-xs opacity-75">
                      {message.type === 'user' ? 'You' : 'TourMate'}
                    </span>
                  </div>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default ChatbotPageSimple;
