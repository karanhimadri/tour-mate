import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    FaCalendarAlt,
    FaCamera,
    FaClock,
    FaHiking,
    FaLocationArrow,
    FaMapMarkerAlt,
    FaMonument,
    FaRoute,
    FaSearch,
    FaShoppingBag,
    FaSpinner,
    FaStar,
    FaTree,
    FaUtensils,
    FaWater
} from 'react-icons/fa';

const ItineraryPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [targetLocation, setTargetLocation] = useState('');
  const [tripLength, setTripLength] = useState(3);
  const [activities, setActivities] = useState([]);
  const [nearbyDestinations, setNearbyDestinations] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingDestinations, setLoadingDestinations] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);

  // Sample destinations data (in a real app, this would come from an API)
  const sampleDestinations = [
    {
      id: 1,
      name: "Red Fort",
      category: "historical",
      distance: 2.5,
      rating: 4.5,
      timeNeeded: 2,
      description: "Magnificent Mughal fortress and palace",
      coordinates: { lat: 28.6562, lng: 77.2410 },
      icon: FaMonument,
      bestTime: "morning"
    },
    {
      id: 2,
      name: "India Gate",
      category: "monument",
      distance: 5.2,
      rating: 4.3,
      timeNeeded: 1.5,
      description: "War memorial and iconic landmark",
      coordinates: { lat: 28.6129, lng: 77.2295 },
      icon: FaMonument,
      bestTime: "evening"
    },
    {
      id: 3,
      name: "Lotus Temple",
      category: "spiritual",
      distance: 8.1,
      rating: 4.6,
      timeNeeded: 1,
      description: "Beautiful Baháʼí House of Worship",
      coordinates: { lat: 28.5535, lng: 77.2588 },
      icon: FaTree,
      bestTime: "morning"
    },
    {
      id: 4,
      name: "Chandni Chowk",
      category: "shopping",
      distance: 3.2,
      rating: 4.2,
      timeNeeded: 3,
      description: "Historic market and street food paradise",
      coordinates: { lat: 28.6506, lng: 77.2303 },
      icon: FaShoppingBag,
      bestTime: "afternoon"
    },
    {
      id: 5,
      name: "Humayun's Tomb",
      category: "historical",
      distance: 6.8,
      rating: 4.4,
      timeNeeded: 2,
      description: "UNESCO World Heritage Mughal tomb",
      coordinates: { lat: 28.5933, lng: 77.2507 },
      icon: FaMonument,
      bestTime: "morning"
    },
    {
      id: 6,
      name: "Yamuna River Walk",
      category: "nature",
      distance: 4.5,
      rating: 3.8,
      timeNeeded: 2,
      description: "Peaceful riverside walk and photography",
      coordinates: { lat: 28.6692, lng: 77.2483 },
      icon: FaWater,
      bestTime: "evening"
    },
    {
      id: 7,
      name: "Connaught Place",
      category: "shopping",
      distance: 7.3,
      rating: 4.1,
      timeNeeded: 2.5,
      description: "Central business district with shops and restaurants",
      coordinates: { lat: 28.6315, lng: 77.2167 },
      icon: FaShoppingBag,
      bestTime: "afternoon"
    },
    {
      id: 8,
      name: "Akshardham Temple",
      category: "spiritual",
      distance: 12.5,
      rating: 4.7,
      timeNeeded: 3,
      description: "Stunning Hindu temple complex",
      coordinates: { lat: 28.6127, lng: 77.2773 },
      icon: FaTree,
      bestTime: "morning"
    }
  ];

  const categoryIcons = {
    historical: FaMonument,
    monument: FaMonument,
    spiritual: FaTree,
    shopping: FaShoppingBag,
    nature: FaHiking,
    food: FaUtensils,
    photography: FaCamera
  };

  const getCurrentLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          // Simulate reverse geocoding
          setTargetLocation("New Delhi, India");
          fetchNearbyDestinations(latitude, longitude);
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to Delhi coordinates
          setCurrentLocation({ lat: 28.6139, lng: 77.2090 });
          setTargetLocation("New Delhi, India");
          fetchNearbyDestinations(28.6139, 77.2090);
          setLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoadingLocation(false);
    }
  };

  const fetchNearbyDestinations = (lat, lng) => {
    setLoadingDestinations(true);
    // Simulate API call delay
    setTimeout(() => {
      // Calculate distances and sort by proximity
      const destinationsWithDistance = sampleDestinations.map(dest => ({
        ...dest,
        distance: calculateDistance(lat, lng, dest.coordinates.lat, dest.coordinates.lng)
      })).sort((a, b) => a.distance - b.distance);
      
      setNearbyDestinations(destinationsWithDistance);
      setLoadingDestinations(false);
    }, 1500);
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  const toggleDestinationSelection = (destination) => {
    setSelectedDestinations(prev => {
      const isSelected = prev.find(d => d.id === destination.id);
      if (isSelected) {
        return prev.filter(d => d.id !== destination.id);
      } else {
        return [...prev, destination];
      }
    });
  };

  const generateItinerary = () => {
    if (selectedDestinations.length === 0) {
      alert("Please select at least one destination to generate an itinerary.");
      return;
    }

    // Sort destinations by distance (optimize travel route)
    const sortedDestinations = [...selectedDestinations].sort((a, b) => a.distance - b.distance);
    
    // Distribute destinations across days
    const itinerary = [];
    const destinationsPerDay = Math.ceil(sortedDestinations.length / tripLength);
    
    for (let day = 0; day < tripLength; day++) {
      const dayDestinations = sortedDestinations.slice(
        day * destinationsPerDay, 
        (day + 1) * destinationsPerDay
      );
      
      const dayPlan = {
        day: day + 1,
        date: new Date(Date.now() + day * 24 * 60 * 60 * 1000).toLocaleDateString(),
        destinations: dayDestinations.map((dest, index) => ({
          ...dest,
          startTime: getOptimalTime(dest.bestTime, index),
          endTime: getOptimalTime(dest.bestTime, index, dest.timeNeeded)
        })),
        totalDistance: dayDestinations.reduce((sum, dest) => sum + dest.distance, 0),
        estimatedTime: dayDestinations.reduce((sum, dest) => sum + dest.timeNeeded, 0)
      };
      
      itinerary.push(dayPlan);
    }
    
    setGeneratedItinerary(itinerary);
  };

  const getOptimalTime = (bestTime, index, duration = 0) => {
    const baseHours = {
      morning: 9,
      afternoon: 13,
      evening: 17
    };
    
    const startHour = baseHours[bestTime] || 10;
    const adjustedHour = startHour + (index * 3); // 3-hour gaps between activities
    
    if (duration) {
      return `${String(adjustedHour + duration).padStart(2, '0')}:00`;
    }
    
    return `${String(adjustedHour).padStart(2, '0')}:00`;
  };

  useEffect(() => {
    // Auto-fetch location on component mount
    getCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Smart Tour Planner
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Discover nearby attractions, plan your perfect itinerary, and optimize your travel route automatically
          </motion.p>
        </div>

        {/* Location & Trip Setup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Location
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={targetLocation}
                  onChange={(e) => setTargetLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={getCurrentLocation}
                  disabled={loadingLocation}
                  className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingLocation ? <FaSpinner className="animate-spin" /> : <FaLocationArrow />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trip Length (days)
              </label>
              <input
                type="number"
                value={tripLength}
                onChange={(e) => setTripLength(Number(e.target.value))}
                min="1"
                max="10"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={generateItinerary}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <FaRoute />
                Generate Itinerary
              </button>
            </div>
          </div>
        </motion.div>

        {/* Nearby Destinations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FaSearch className="text-indigo-600" />
                Nearby Attractions
              </h2>
              {currentLocation && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {nearbyDestinations.length} destinations found
                </span>
              )}
            </div>

            {loadingDestinations ? (
              <div className="text-center py-8">
                <FaSpinner className="animate-spin text-4xl text-indigo-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">Finding best attractions near you...</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {nearbyDestinations.map((destination) => {
                  const IconComponent = categoryIcons[destination.category] || FaMapMarkerAlt;
                  const isSelected = selectedDestinations.find(d => d.id === destination.id);
                  
                  return (
                    <motion.div
                      key={destination.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900 dark:border-indigo-400' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500'
                      }`}
                      onClick={() => toggleDestinationSelection(destination)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-200 dark:bg-indigo-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                            <IconComponent className={`text-xl ${isSelected ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-300'}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{destination.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{destination.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <FaMapMarkerAlt />
                                {destination.distance.toFixed(1)} km
                              </span>
                              <span className="flex items-center gap-1">
                                <FaClock />
                                {destination.timeNeeded}h
                              </span>
                              <span className="flex items-center gap-1">
                                <FaStar className="text-yellow-500" />
                                {destination.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected 
                            ? 'bg-indigo-600 border-indigo-600' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Generated Itinerary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FaCalendarAlt className="text-indigo-600" />
              Your Itinerary
            </h2>

            {generatedItinerary.length === 0 ? (
              <div className="text-center py-8">
                <FaRoute className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Select destinations and generate your personalized itinerary
                </p>
              </div>
            ) : (
              <div className="space-y-6 max-h-96 overflow-y-auto">
                {generatedItinerary.map((day) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Day {day.day}
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {day.date}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {day.destinations.map((dest, index) => {
                        const IconComponent = categoryIcons[dest.category] || FaMapMarkerAlt;
                        return (
                          <div key={dest.id} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg">
                            <div className="bg-indigo-100 dark:bg-indigo-800 p-2 rounded-lg">
                              <IconComponent className="text-indigo-600 dark:text-indigo-300" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">{dest.name}</h4>
                              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                <span>{dest.startTime} - {dest.endTime}</span>
                                <span>{dest.distance.toFixed(1)} km</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-700">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span>Total Distance: {day.totalDistance.toFixed(1)} km</span>
                        <span>Estimated Time: {day.estimatedTime}h</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Route Map Placeholder */}
        {generatedItinerary.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FaMapMarkerAlt className="text-indigo-600" />
              Optimized Route Map
            </h2>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 h-96 rounded-xl flex items-center justify-center border-2 border-dashed border-indigo-300 dark:border-indigo-600">
              <div className="text-center">
                <FaMapMarkerAlt className="text-6xl text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Interactive Route Map</p>
                <p className="text-gray-600 dark:text-gray-400">Your optimized travel route will be displayed here</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ItineraryPage;
