import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  FaClock,
  FaCopy,
  FaDownload,
  FaFirstAid,
  FaHospital,
  FaLifeRing,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaMicrophone,
  FaQuestionCircle,
  FaShare
} from 'react-icons/fa';
import { emergencyContacts } from '../data';

const EmergencyPage = () => {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyServices, setNearbyServices] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [emergencyHistory, setEmergencyHistory] = useState([]);
  const [medicalInfo, setMedicalInfo] = useState({
    bloodType: '',
    allergies: '',
    medications: '',
    emergencyContact: ''
  });
  const [showMedicalInfo, setShowMedicalInfo] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [quickActions, setQuickActions] = useState(['Police', 'Ambulance', 'Fire']);
  const [networkStatus, setNetworkStatus] = useState('online');
  const sosButtonRef = useRef(null);
  const countdownRef = useRef(null);

  // Initialize location and services
  useEffect(() => {
    getCurrentLocation();
    checkNetworkStatus();
    loadMedicalInfo();
    
    // Network status listener
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setUserLocation(location);
          findNearbyServices(location);
        },
        (error) => {
          console.error('Location error:', error);
          showNotification('Location access denied. Using default emergency contacts.', 'warning');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    }
  };

  const findNearbyServices = (location) => {
    // Simulate finding nearby emergency services
    const services = [
      { type: 'Hospital', name: 'City General Hospital', distance: '0.8 km', time: '3 min' },
      { type: 'Police', name: 'Metro Police Station', distance: '1.2 km', time: '5 min' },
      { type: 'Fire', name: 'Fire Station 12', distance: '2.1 km', time: '7 min' }
    ];
    setNearbyServices(services);
  };

  const checkNetworkStatus = () => {
    setNetworkStatus(navigator.onLine ? 'online' : 'offline');
  };

  const loadMedicalInfo = () => {
    const saved = localStorage.getItem('medicalInfo');
    if (saved) {
      setMedicalInfo(JSON.parse(saved));
    }
  };

  const saveMedicalInfo = () => {
    localStorage.setItem('medicalInfo', JSON.stringify(medicalInfo));
    showNotification('Medical information saved!', 'success');
  };

  const handleSOSClick = () => {
    if (emergencyActive) {
      cancelEmergency();
      return;
    }

    setCountdown(5);
    setEmergencyActive(true);
    
    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          triggerEmergency();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelEmergency = () => {
    clearInterval(countdownRef.current);
    setCountdown(null);
    setEmergencyActive(false);
    showNotification('Emergency cancelled', 'info');
  };

  const triggerEmergency = () => {
    clearInterval(countdownRef.current);
    setEmergencyActive(false);
    setCountdown(null);
    
    // Log emergency
    const emergency = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      location: userLocation,
      status: 'Active'
    };
    
    setEmergencyHistory(prev => [emergency, ...prev.slice(0, 4)]);
    
    // Share location with emergency services
    shareLocationWithServices();
    
    showNotification('🚨 Emergency services have been notified!', 'error');
  };

  const shareLocationWithServices = () => {
    if (userLocation) {
      const locationString = `${userLocation.latitude.toFixed(6)}, ${userLocation.longitude.toFixed(6)}`;
      
      // Simulate emergency SMS
      const message = `EMERGENCY: I need help at location ${locationString}. Medical info: Blood type ${medicalInfo.bloodType || 'Unknown'}, Allergies: ${medicalInfo.allergies || 'None'}`;
      
      console.log('Emergency message:', message);
      
      // In real app, this would send SMS to emergency contacts
      if (medicalInfo.emergencyContact) {
        console.log(`Notifying emergency contact: ${medicalInfo.emergencyContact}`);
      }
    }
  };

  const getDirections = (service) => {
    if (userLocation) {
      // Simulate coordinates for the service (in real app, these would be actual coordinates)
      const serviceCoords = {
        'Hospital': { lat: userLocation.latitude + 0.01, lng: userLocation.longitude + 0.01 },
        'Police': { lat: userLocation.latitude - 0.01, lng: userLocation.longitude + 0.01 },
        'Fire': { lat: userLocation.latitude + 0.01, lng: userLocation.longitude - 0.01 }
      };
      
      const coords = serviceCoords[service.type] || serviceCoords['Hospital'];
      const mapsUrl = `https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${coords.lat},${coords.lng}`;
      
      window.open(mapsUrl, '_blank');
      showNotification(`Opening directions to ${service.name}`, 'info');
    } else {
      showNotification('Location not available. Please enable location services.', 'warning');
    }
  };

  const callEmergencyService = (number, serviceName) => {
    // Log the call attempt
    const callLog = {
      id: Date.now(),
      contact: serviceName,
      number: number,
      timestamp: new Date().toLocaleTimeString(),
      type: 'emergency_call'
    };
    
    setEmergencyHistory(prev => [callLog, ...prev.slice(0, 4)]);
    
    // Make the call
    window.location.href = `tel:${number}`;
    showNotification(`Calling ${serviceName}...`, 'info');
  };

  const handleQuickCall = (contact) => {
    window.location.href = `tel:${contact.number}`;
    showNotification(`Calling ${contact.name}...`, 'info');
    
    // Log the call
    const callLog = {
      id: Date.now(),
      contact: contact.name,
      number: contact.number,
      timestamp: new Date().toLocaleTimeString(),
      type: 'emergency_call'
    };
    
    setEmergencyHistory(prev => [callLog, ...prev.slice(0, 4)]);
  };

  const copyLocation = () => {
    if (userLocation) {
      const locationString = `${userLocation.latitude.toFixed(6)}, ${userLocation.longitude.toFixed(6)}`;
      navigator.clipboard.writeText(locationString);
      showNotification('Location copied to clipboard!', 'success');
    }
  };

  const shareLocation = () => {
    if (userLocation && navigator.share) {
      const locationString = `${userLocation.latitude.toFixed(6)}, ${userLocation.longitude.toFixed(6)}`;
      navigator.share({
        title: 'My Current Location',
        text: `I'm currently at: ${locationString}`,
        url: `https://maps.google.com/?q=${locationString}`
      });
    } else {
      copyLocation();
    }
  };

  const downloadEmergencyCard = () => {
    const emergencyData = {
      personalInfo: medicalInfo,
      emergencyContacts: emergencyContacts,
      location: userLocation,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(emergencyData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emergency-info.json';
    a.click();
    
    URL.revokeObjectURL(url);
    showNotification('Emergency card downloaded!', 'success');
  };

  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };
    
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    // Simulate voice recording for emergency
    setTimeout(() => {
      setIsRecording(false);
      showNotification('Voice message recorded for emergency services', 'success');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900 dark:to-orange-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Emergency Hub
            </h1>
            <div className="absolute -top-4 -right-4 text-4xl animate-pulse">🚨</div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your safety companion - instant access to emergency services, location sharing, and critical information
          </p>
          
          {/* Network Status */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full ${networkStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {networkStatus === 'online' ? 'Connected' : 'Offline Mode'}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main SOS Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
              
              {/* SOS Button */}
              <div className="text-center mb-8">
                <motion.button
                  ref={sosButtonRef}
                  onClick={handleSOSClick}
                  className={`relative w-48 h-48 mx-auto rounded-full font-black text-2xl transition-all duration-300 transform ${
                    emergencyActive 
                      ? 'bg-gradient-to-r from-red-600 to-red-800 animate-pulse scale-110 shadow-2xl' 
                      : 'bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 hover:scale-105 shadow-xl'
                  } text-white`}
                  whileHover={{ scale: emergencyActive ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75"></div>
                  <div className="relative z-10">
                    {countdown ? (
                      <div className="flex flex-col items-center">
                        <div className="text-6xl font-black">{countdown}</div>
                        <div className="text-sm">Tap to Cancel</div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="text-4xl font-black">SOS</div>
                        <div className="text-sm">Emergency Help</div>
                      </div>
                    )}
                  </div>
                </motion.button>
                
                <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  Press and hold for 5 seconds to automatically contact emergency services and share your location
                </p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {emergencyContacts.slice(0, 3).map((contact, index) => (
                  <motion.button
                    key={contact.id}
                    onClick={() => handleQuickCall(contact)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="text-3xl mb-2">
                      {contact.name === 'Police' && '👮'}
                      {contact.name === 'Ambulance' && '🚑'}
                      {contact.name === 'Fire' && '🚒'}
                    </div>
                    <div>{contact.name}</div>
                    <div className="text-sm opacity-80">{contact.number}</div>
                  </motion.button>
                ))}
              </div>

              {/* Location and Additional Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-600" />
                    Current Location
                  </h3>
                  {userLocation ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Lat: {userLocation.latitude.toFixed(6)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Lng: {userLocation.longitude.toFixed(6)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Accuracy: ±{userLocation.accuracy}m
                      </p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={copyLocation}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          <FaCopy className="inline mr-2" />
                          Copy
                        </button>
                        <button
                          onClick={shareLocation}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700 transition-colors"
                        >
                          <FaShare className="inline mr-2" />
                          Share
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <FaLocationArrow className="text-2xl mb-2 mx-auto" />
                      <p className="text-sm">Getting your location...</p>
                      <button
                        onClick={getCurrentLocation}
                        className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FaLifeRing className="text-orange-600" />
                    Quick Tools
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={startVoiceRecording}
                      className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 ${
                        isRecording 
                          ? 'bg-red-600 text-white animate-pulse' 
                          : 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800'
                      }`}
                    >
                      <FaMicrophone />
                      {isRecording ? 'Recording...' : 'Voice SOS'}
                    </button>
                    
                    <button
                      onClick={() => setShowMedicalInfo(true)}
                      className="w-full flex items-center gap-3 py-3 px-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      <FaFirstAid />
                      Medical Info
                    </button>
                    
                    <button
                      onClick={downloadEmergencyCard}
                      className="w-full flex items-center gap-3 py-3 px-4 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                    >
                      <FaDownload />
                      Download Card
                    </button>
                  </div>
                </div>
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
            
            {/* Nearby Services */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaHospital className="text-red-600" />
                Nearby Services
              </h3>
              
              <div className="space-y-3">
                {nearbyServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="text-lg">
                          {service.type === 'Hospital' && '🏥'}
                          {service.type === 'Police' && '👮'}
                          {service.type === 'Fire' && '🚒'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {service.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {service.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {service.distance}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {service.time}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => getDirections(service)}
                      className="w-full mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      Get Directions
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Emergency History */}
            {emergencyHistory.length > 0 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaClock className="text-blue-600" />
                  Recent Activity
                </h3>
                
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {emergencyHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {item.contact || 'Emergency Alert'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.timestamp}
                        </span>
                      </div>
                      {item.number && (
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          Called: {item.number}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Emergency Tips */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaQuestionCircle className="text-green-600" />
                Safety Tips
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <p className="font-medium text-green-800 dark:text-green-300 mb-1">
                    Before Calling
                  </p>
                  <ul className="text-green-700 dark:text-green-400 space-y-1 text-xs">
                    <li>• Stay calm and speak clearly</li>
                    <li>• Know your exact location</li>
                    <li>• Have your identification ready</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                    Medical Emergency
                  </p>
                  <ul className="text-blue-700 dark:text-blue-400 space-y-1 text-xs">
                    <li>• Call 102 for ambulance</li>
                    <li>• Don't move injured person</li>
                    <li>• Apply first aid if trained</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Medical Info Modal */}
        <AnimatePresence>
          {showMedicalInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowMedicalInfo(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                  <FaFirstAid className="text-red-600" />
                  Medical Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Blood Type
                    </label>
                    <select
                      value={medicalInfo.bloodType}
                      onChange={(e) => setMedicalInfo(prev => ({ ...prev, bloodType: e.target.value }))}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Allergies
                    </label>
                    <input
                      type="text"
                      value={medicalInfo.allergies}
                      onChange={(e) => setMedicalInfo(prev => ({ ...prev, allergies: e.target.value }))}
                      placeholder="List any allergies..."
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Medications
                    </label>
                    <input
                      type="text"
                      value={medicalInfo.medications}
                      onChange={(e) => setMedicalInfo(prev => ({ ...prev, medications: e.target.value }))}
                      placeholder="List current medications..."
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      value={medicalInfo.emergencyContact}
                      onChange={(e) => setMedicalInfo(prev => ({ ...prev, emergencyContact: e.target.value }))}
                      placeholder="Emergency contact number..."
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={saveMedicalInfo}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                  >
                    Save Info
                  </button>
                  <button
                    onClick={() => setShowMedicalInfo(false)}
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default EmergencyPage;
