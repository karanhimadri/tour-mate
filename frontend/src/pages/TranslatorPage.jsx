import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaBookmark, FaExchangeAlt, FaMicrophone, FaPlay } from 'react-icons/fa';

const TranslatorPage = () => {
  const [fromLanguage, setFromLanguage] = useState('en');
  const [toLanguage, setToLanguage] = useState('hi');
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'te', name: 'Telugu' },
    { code: 'ta', name: 'Tamil' },
    { code: 'mr', name: 'Marathi' },
  ];

  const commonPhrases = [
    {
      source: "Hello, how are you?",
      translated: "नमस्ते, आप कैसे हैं?",
      language: "Hindi",
    },
    {
      source: "Where is the nearest market?",
      translated: "निकटतम बाज़ार कहाँ है?",
      language: "Hindi",
    },
    {
      source: "Thank you very much",
      translated: "बहुत धन्यवाद",
      language: "Hindi",
    },
  ];

  const handleSwapLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
  };

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
    // Implement Web Speech API logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Voice Translator
      </h1>

      {/* Language Selection */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center gap-4">
          <select
            value={fromLanguage}
            onChange={(e) => setFromLanguage(e.target.value)}
            className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSwapLanguages}
            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <FaExchangeAlt />
          </button>

          <select
            value={toLanguage}
            onChange={(e) => setToLanguage(e.target.value)}
            className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Translation Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Input */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
              rows={6}
              className="w-full p-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 resize-none"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={handleStartRecording}
                className={`flex items-center gap-2 p-3 rounded-lg ${
                  isRecording
                    ? 'bg-red-500 text-white'
                    : 'bg-indigo-600 text-white'
                } hover:opacity-90 transition-colors`}
              >
                <FaMicrophone />
                {isRecording ? 'Stop Recording' : 'Start Speaking'}
              </button>
              <button className="flex items-center gap-2 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Translate
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-800 dark:text-white min-h-[100px]">
              {/* Translated text will appear here */}
            </p>
          </div>
        </div>

        {/* Common Phrases */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Common Phrases
          </h2>
          <div className="space-y-4">
            {commonPhrases.map((phrase, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-gray-800 dark:text-white font-medium">
                      {phrase.source}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {phrase.translated}
                    </p>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {phrase.language}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                      <FaPlay />
                    </button>
                    <button className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                      <FaBookmark />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TranslatorPage;
