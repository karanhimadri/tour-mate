import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    FaBookmark,
    FaCopy,
    FaExchangeAlt,
    FaGlobe,
    FaHistory,
    FaLanguage,
    FaMicrophone,
    FaSpinner,
    FaVolumeUp
} from 'react-icons/fa';

const TranslatorPage = () => {
  const [fromLanguage, setFromLanguage] = useState('en');
  const [toLanguage, setToLanguage] = useState('hi');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeCategory, setActiveCategory] = useState('greetings');
  const [translationHistory, setTranslationHistory] = useState([]);
  const [savedPhrases, setSavedPhrases] = useState([]);
  const [autoDetectLanguage, setAutoDetectLanguage] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [recognition, setRecognition] = useState(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.maxAlternatives = 1;
      
      // Set language based on fromLanguage
      recognitionInstance.lang = fromLanguage === 'hi' ? 'hi-IN' : 
                                 fromLanguage === 'bn' ? 'bn-BD' :
                                 fromLanguage === 'es' ? 'es-ES' :
                                 fromLanguage === 'fr' ? 'fr-FR' :
                                 fromLanguage === 'de' ? 'de-DE' :
                                 'en-US';
      
      recognitionInstance.onstart = () => {
        setIsRecording(true);
      };
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsRecording(false);
        
        // Auto-translate after voice input
        setTimeout(() => {
          handleTranslate();
        }, 500);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        
        // Show user-friendly error messages
        let errorMessage = 'Voice input failed. ';
        switch(event.error) {
          case 'not-allowed':
            errorMessage += 'Please allow microphone access.';
            break;
          case 'no-speech':
            errorMessage += 'No speech detected. Please try again.';
            break;
          case 'network':
            errorMessage += 'Network error. Check your connection.';
            break;
          default:
            errorMessage += 'Please try again.';
        }
        
        // You could add a toast notification here
        alert(errorMessage);
      };
      
      recognitionInstance.onend = () => {
        setIsRecording(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [fromLanguage]);

  // Voice input handler
  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      // Update language before starting
      recognition.lang = fromLanguage === 'hi' ? 'hi-IN' : 
                        fromLanguage === 'bn' ? 'bn-BD' :
                        fromLanguage === 'es' ? 'es-ES' :
                        fromLanguage === 'fr' ? 'fr-FR' :
                        fromLanguage === 'de' ? 'de-DE' :
                        fromLanguage === 'ta' ? 'ta-IN' :
                        fromLanguage === 'te' ? 'te-IN' :
                        'en-US';
      
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        alert('Failed to start voice input. Please try again.');
      }
    }
  };

  // Enhanced language support with flags and native names
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
  ];

  // Comprehensive common phrases for travelers
  const commonPhrases = {
    greetings: [
      { en: 'Hello', hi: 'नमस्ते', transliteration: 'Namaste' },
      { en: 'Good morning', hi: 'सुप्रभात', transliteration: 'Suprabhat' },
      { en: 'Good evening', hi: 'शुभ संध्या', transliteration: 'Shubh sandhya' },
      { en: 'How are you?', hi: 'आप कैसे हैं?', transliteration: 'Aap kaise hain?' },
      { en: 'Nice to meet you', hi: 'आपसे मिलकर खुशी हुई', transliteration: 'Aapse milkar khushi hui' },
      { en: 'Thank you', hi: 'धन्यवाद', transliteration: 'Dhanyawad' },
      { en: 'You\'re welcome', hi: 'आपका स्वागत है', transliteration: 'Aapka swagat hai' },
      { en: 'Goodbye', hi: 'अलविदा', transliteration: 'Alvida' }
    ],
    directions: [
      { en: 'Where is...?', hi: 'कहाँ है...?', transliteration: 'Kahan hai...?' },
      { en: 'How to go to...?', hi: '...कैसे जाना है?', transliteration: '...kaise jana hai?' },
      { en: 'Turn left', hi: 'बाएं मुड़ें', transliteration: 'Bayen muden' },
      { en: 'Turn right', hi: 'दाएं मुड़ें', transliteration: 'Dayen muden' },
      { en: 'Go straight', hi: 'सीधे जाएं', transliteration: 'Seedhe jayen' },
      { en: 'Stop here', hi: 'यहाँ रुकें', transliteration: 'Yahan ruken' },
      { en: 'How far is it?', hi: 'यह कितनी दूर है?', transliteration: 'Yah kitni door hai?' },
      { en: 'Is it nearby?', hi: 'क्या यह पास है?', transliteration: 'Kya yah paas hai?' }
    ],
    foodDining: [
      { en: 'I\'m hungry', hi: 'मुझे भूख लगी है', transliteration: 'Mujhe bhookh lagi hai' },
      { en: 'What do you recommend?', hi: 'आप क्या सुझाते हैं?', transliteration: 'Aap kya sujhate hain?' },
      { en: 'Is this spicy?', hi: 'क्या यह तीखा है?', transliteration: 'Kya yah teekha hai?' },
      { en: 'I\'m vegetarian', hi: 'मैं शाकाहारी हूँ', transliteration: 'Main shakahari hun' },
      { en: 'The bill, please', hi: 'बिल दीजिए', transliteration: 'Bill dijiye' },
      { en: 'It\'s delicious', hi: 'यह स्वादिष्ट है', transliteration: 'Yah swadisht hai' },
      { en: 'Water, please', hi: 'पानी दीजिए', transliteration: 'Paani dijiye' },
      { en: 'No sugar', hi: 'बिना चीनी', transliteration: 'Bina cheeni' }
    ],
    emergency: [
      { en: 'Help!', hi: 'मदद!', transliteration: 'Madad!' },
      { en: 'Call the police', hi: 'पुलिस को बुलाएं', transliteration: 'Police ko bulayen' },
      { en: 'I need a doctor', hi: 'मुझे डॉक्टर चाहिए', transliteration: 'Mujhe doctor chahiye' },
      { en: 'Where is the hospital?', hi: 'अस्पताल कहाँ है?', transliteration: 'Aspatal kahan hai?' },
      { en: 'I\'m lost', hi: 'मैं खो गया हूँ', transliteration: 'Main kho gaya hun' },
      { en: 'Call an ambulance', hi: 'एम्बुलेंस बुलाएं', transliteration: 'Ambulance bulayen' },
      { en: 'I don\'t feel well', hi: 'मैं ठीक महसूस नहीं कर रहा', transliteration: 'Main theek mehsoos nahi kar raha' },
      { en: 'Please help me', hi: 'कृपया मेरी मदद करें', transliteration: 'Kripaya meri madad karen' }
    ],
    shopping: [
      { en: 'How much does this cost?', hi: 'यह कितने का है?', transliteration: 'Yah kitne ka hai?' },
      { en: 'Too expensive', hi: 'बहुत महंगा', transliteration: 'Bahut mehnga' },
      { en: 'Can you give a discount?', hi: 'क्या कम कर सकते हैं?', transliteration: 'Kya kam kar sakte hain?' },
      { en: 'I\'ll take it', hi: 'मैं इसे लूंगा', transliteration: 'Main ise lunga' },
      { en: 'Do you accept cards?', hi: 'क्या आप कार्ड लेते हैं?', transliteration: 'Kya aap card lete hain?' },
      { en: 'Where is the market?', hi: 'बाज़ार कहाँ है?', transliteration: 'Bazaar kahan hai?' },
      { en: 'Show me something else', hi: 'कुछ और दिखाइए', transliteration: 'Kuch aur dikhayiye' },
      { en: 'I\'m just looking', hi: 'मैं सिर्फ देख रहा हूँ', transliteration: 'Main sirf dekh raha hun' }
    ],
    travel: [
      { en: 'Where is the train station?', hi: 'रेलवे स्टेशन कहाँ है?', transliteration: 'Railway station kahan hai?' },
      { en: 'When does the train leave?', hi: 'ट्रेन कब छूटती है?', transliteration: 'Train kab chhooți hai?' },
      { en: 'One ticket to...', hi: '...के लिए एक टिकट', transliteration: '...ke liye ek ticket' },
      { en: 'How long is the journey?', hi: 'यात्रा कितनी लंबी है?', transliteration: 'Yatra kitni lambi hai?' },
      { en: 'Is this seat free?', hi: 'क्या यह सीट खाली है?', transliteration: 'Kya yah seat khali hai?' },
      { en: 'Airport', hi: 'हवाई अड्डा', transliteration: 'Hawai adda' },
      { en: 'Bus stop', hi: 'बस स्टॉप', transliteration: 'Bus stop' },
      { en: 'Taxi', hi: 'टैक्सी', transliteration: 'Taxi' }
    ]
  };

  // Enhanced translation functions with comprehensive mapping
  const translateText = async (text, from, to) => {
    if (!text.trim()) return '';
    
    setIsTranslating(true);
    
    try {
      // Simulate translation API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Comprehensive translation mapping
      const translations = {
        // Basic greetings
        'hello': { 
          hi: 'नमस्ते', bn: 'নমস্কার', ta: 'வணக்கம்', te: 'నమస్కారం', 
          es: 'hola', fr: 'bonjour', de: 'hallo', ja: 'こんにちは',
          ar: 'مرحبا', zh: '你好', ru: 'привет', pt: 'olá', it: 'ciao'
        },
        'hello how are you': {
          hi: 'नमस्ते, आप कैसे हैं?', bn: 'নমস্কার, আপনি কেমন আছেন?', 
          ta: 'வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?', te: 'నమస్కారం, మీరు ఎలా ఉన్నారు?',
          es: 'hola, ¿cómo estás?', fr: 'bonjour, comment allez-vous?', 
          de: 'hallo, wie geht es dir?', ja: 'こんにちは、元気ですか？',
          ar: 'مرحبا، كيف حالك؟', zh: '你好，你好吗？', ru: 'привет, как дела?'
        },
        'good morning': { 
          hi: 'सुप्रभात', bn: 'সুপ্রভাত', ta: 'காலை வணக்கம்', te: 'శుభోదయం',
          es: 'buenos días', fr: 'bonjour', de: 'guten Morgen', ja: 'おはようございます',
          ar: 'صباح الخير', zh: '早上好', ru: 'доброе утро'
        },
        'good evening': {
          hi: 'शुभ संध्या', bn: 'শুভ সন্ধ্যা', ta: 'மாலை வணக்கம்', te: 'శుభ సాయంత్రం',
          es: 'buenas tardes', fr: 'bonsoir', de: 'guten Abend', ja: 'こんばんは'
        },
        'thank you': { 
          hi: 'धन्यवाद', bn: 'ধন্যবাদ', ta: 'நன்றி', te: 'ధన్యవాదాలు',
          es: 'gracias', fr: 'merci', de: 'danke', ja: 'ありがとう',
          ar: 'شكرا', zh: '谢谢', ru: 'спасибо'
        },
        'how are you': { 
          hi: 'आप कैसे हैं?', bn: 'আপনি কেমন আছেন?', ta: 'நீங்கள் எப்படி இருக்கிறீர்கள்?',
          es: '¿cómo estás?', fr: 'comment allez-vous?', de: 'wie geht es dir?'
        },
        'excuse me': { 
          hi: 'माफ करें', bn: 'দুঃখিত', ta: 'மன்னிக்கவும்', te: 'క్షమించండి',
          es: 'perdón', fr: 'excusez-moi', de: 'entschuldigung'
        },
        'where is': { 
          hi: 'कहाँ है', bn: 'কোথায়', ta: 'எங்கே', te: 'ఎక్కడ',
          es: 'dónde está', fr: 'où est', de: 'wo ist'
        },
        'please': { 
          hi: 'कृपया', bn: 'দয়া করে', ta: 'தயவுசெய்து', te: 'దయచేసి',
          es: 'por favor', fr: 's\'il vous plaît', de: 'bitte'
        },
        'yes': { 
          hi: 'हाँ', bn: 'হ্যাঁ', ta: 'ஆம்', te: 'అవును',
          es: 'sí', fr: 'oui', de: 'ja', ja: 'はい'
        },
        'no': { 
          hi: 'नहीं', bn: 'না', ta: 'இல்லை', te: 'కాదు',
          es: 'no', fr: 'non', de: 'nein', ja: 'いいえ'
        },
        'help': {
          hi: 'मदद', bn: 'সাহায্য', ta: 'உதவி', te: 'సహాయం',
          es: 'ayuda', fr: 'aide', de: 'hilfe'
        },
        'water': {
          hi: 'पानी', bn: 'পানি', ta: 'தண்ணீர்', te: 'నీరు',
          es: 'agua', fr: 'eau', de: 'wasser'
        },
        'food': {
          hi: 'खाना', bn: 'খাবার', ta: 'உணவு', te: 'ఆహారం',
          es: 'comida', fr: 'nourriture', de: 'essen'
        },
        'hospital': {
          hi: 'अस्पताल', bn: 'হাসপাতাল', ta: 'மருத்துவமனை', te: 'ఆసుపత్రి',
          es: 'hospital', fr: 'hôpital', de: 'krankenhaus'
        }
      };
      
      const lowerText = text.toLowerCase().trim();
      const translation = translations[lowerText]?.[to];
      
      if (translation) {
        return translation;
      } else {
        // Try partial matches for common phrases
        for (const [key, value] of Object.entries(translations)) {
          if (lowerText.includes(key) || key.includes(lowerText)) {
            return value[to] || `Translation not available for "${text}"`;
          }
        }
        
        // If no translation found, provide a helpful message
        return `Translation for "${text}" is not available in our database. Please try a common phrase.`;
      }
    } catch (error) {
      console.error('Translation error:', error);
      return 'Translation failed. Please try again.';
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    const translation = await translateText(inputText, fromLanguage, toLanguage);
    setTranslatedText(translation);
    
    // Add to history only if translation was successful
    if (translation && !translation.includes('not available') && !translation.includes('failed')) {
      const historyItem = {
        id: Date.now(),
        from: inputText,
        to: translation,
        fromLang: fromLanguage,
        toLang: toLanguage,
        timestamp: new Date().toLocaleTimeString()
      };
      setTranslationHistory(prev => [historyItem, ...prev.slice(0, 9)]);
    }
  };

  const handleSwapLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const handlePhraseClick = async (phrase) => {
    setInputText(phrase.en);
    const translation = await translateText(phrase.en, 'en', toLanguage);
    setTranslatedText(translation);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const savePhrase = (text, translation) => {
    const saved = {
      id: Date.now(),
      original: text,
      translation: translation,
      fromLang: fromLanguage,
      toLang: toLanguage
    };
    setSavedPhrases(prev => [saved, ...prev]);
  };

  const playAudio = (text, lang) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'es' ? 'es-ES' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const categoryIcons = {
    greetings: '👋',
    directions: '🗺️',
    foodDining: '🍽️',
    emergency: '🚨',
    shopping: '🛍️',
    travel: '✈️'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Universal Translator
            </h1>
            <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🌍</div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Break language barriers and communicate with anyone, anywhere in the world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Translator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
              
              {/* Language Selection */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From</label>
                  <select
                    value={fromLanguage}
                    onChange={(e) => setFromLanguage(e.target.value)}
                    className="w-full p-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name} ({lang.nativeName})
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={handleSwapLanguages}
                  className="mt-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
                >
                  <FaExchangeAlt className="text-xl" />
                </button>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label>
                  <select
                    value={toLanguage}
                    onChange={(e) => setToLanguage(e.target.value)}
                    className="w-full p-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name} ({lang.nativeName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Input Section */}
              <div className="mb-6">
                {isRecording && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Listening... Speak now</span>
                    </div>
                  </div>
                )}
                
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full p-6 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl h-40 resize-none text-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      onClick={handleVoiceInput}
                      disabled={!recognition}
                      className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                        isRecording 
                          ? 'bg-red-500 text-white animate-pulse shadow-lg' 
                          : recognition 
                            ? 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      title={!recognition ? 'Speech recognition not supported' : isRecording ? 'Click to stop recording' : 'Click to start voice input'}
                    >
                      <FaMicrophone className={isRecording ? 'animate-pulse' : ''} />
                    </button>
                    <button
                      onClick={() => copyToClipboard(inputText)}
                      className="p-3 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleTranslate}
                  disabled={!inputText.trim() || isTranslating}
                  className={`w-full mt-4 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform flex items-center justify-center gap-3 ${
                    !inputText.trim() || isTranslating
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg'
                  }`}
                >
                  {isTranslating ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <FaLanguage />
                      Translate
                    </>
                  )}
                </button>
              </div>

              {/* Output Section */}
              <div className="relative">
                <textarea
                  value={translatedText}
                  readOnly
                  placeholder="Translation will appear here..."
                  className="w-full p-6 bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-2xl h-40 resize-none text-lg text-gray-900 dark:text-white placeholder-gray-500"
                />
                {translatedText && (
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                      onClick={() => playAudio(translatedText, toLanguage)}
                      className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <FaVolumeUp />
                    </button>
                    <button
                      onClick={() => copyToClipboard(translatedText)}
                      className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                    >
                      <FaCopy />
                    </button>
                    <button
                      onClick={() => savePhrase(inputText, translatedText)}
                      className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                    >
                      <FaBookmark />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            
            {/* Common Phrases */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaGlobe className="text-blue-600" />
                Common Phrases
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.keys(commonPhrases).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {categoryIcons[category]} {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {commonPhrases[activeCategory]?.map((phrase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handlePhraseClick(phrase)}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors group"
                  >
                    <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600">
                      {phrase.en}
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 text-sm">
                      {phrase.hi}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs italic">
                      {phrase.transliteration}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Translation History */}
            {translationHistory.length > 0 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaHistory className="text-purple-600" />
                  Recent Translations
                </h3>
                
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {translationHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => {
                        setInputText(item.from);
                        setTranslatedText(item.to);
                      }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {languages.find(l => l.code === item.fromLang)?.flag} → {languages.find(l => l.code === item.toLang)?.flag}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-white truncate">
                        {item.from}
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 truncate">
                        {item.to}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Phrases */}
            {savedPhrases.length > 0 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaBookmark className="text-yellow-600" />
                  Saved Phrases
                </h3>
                
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {savedPhrases.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    >
                      <p className="text-sm text-gray-900 dark:text-white">
                        {item.original}
                      </p>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        {item.translation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorPage;
