import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaBed, FaComments, FaMapMarkerAlt, FaStar, FaUser } from 'react-icons/fa';
import { homeyHutsListings } from '../data';

const HomestaysPage = () => {
  const [filters, setFilters] = useState({
    region: 'all',
    budget: 'all',
    type: 'all',
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredHomestays = homeyHutsListings.filter(homestay => {
    if (filters.region !== 'all' && !homestay.location.toLowerCase().includes(filters.region.toLowerCase())) {
      return false;
    }
    if (filters.budget !== 'all') {
      const budgetRanges = {
        low: [0, 5000],
        mid: [5000, 10000],
        high: [10000, Infinity]
      };
      const [min, max] = budgetRanges[filters.budget];
      if (homestay.currentPrice < min || homestay.currentPrice > max) {
        return false;
      }
    }
    if (filters.type !== 'all' && !homestay.tags.some(tag => 
      tag.toLowerCase().includes(filters.type.toLowerCase())
    )) {
      return false;
    }
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Hero Section with Gradient Text */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight"
        >
          Discover Authentic
          <span className="block bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Homestays
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Experience genuine local culture through carefully curated homestays that connect you with authentic traditions and warm hospitality.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <span className="text-2xl">✨</span>
          <span>Handpicked for You</span>
        </motion.div>
      </div>

      {/* Smart Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-12"
      >
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3"
        >
          <span className="text-3xl">🎯</span>
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Perfect Stay
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <span className="text-lg">📍</span>
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Region</span>
            </label>
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 dark:text-white text-gray-800 font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 hover:border-indigo-400 shadow-sm hover:shadow-md"
            >
              <option value="all">🌍 All Regions</option>
              <option value="uttarakhand">🏔️ Uttarakhand</option>
              <option value="himachal">🏔️ Himachal Pradesh</option>
              <option value="rajasthan">🏰 Rajasthan</option>
              <option value="odisha">🏖️ Odisha</option>
            </select>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <span className="text-lg">💰</span>
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Budget (₹)</span>
            </label>
            <select
              value={filters.budget}
              onChange={(e) => handleFilterChange('budget', e.target.value)}
              className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 dark:text-white text-gray-800 font-medium focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 hover:border-green-400 shadow-sm hover:shadow-md"
            >
              <option value="all">💸 All Budgets</option>
              <option value="low">💵 Under ₹5,000</option>
              <option value="mid">💳 ₹5,000 - ₹10,000</option>
              <option value="high">💎 Above ₹10,000</option>
            </select>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <span className="text-lg">🏡</span>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Type</span>
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 dark:text-white text-gray-800 font-medium focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 hover:border-purple-400 shadow-sm hover:shadow-md"
            >
              <option value="all">🎭 All Types</option>
              <option value="mountain">🏔️ Mountain View</option>
              <option value="villa">🏡 Villa</option>
              <option value="resort">🏨 Resort</option>
              <option value="beach">🏖️ Beach House</option>
            </select>
          </motion.div>
        </div>
      </motion.div>

      {/* Results Counter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 border-l-4 border-indigo-500">
          <p className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {filteredHomestays.length} Amazing Homestays Found
            </span>
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Each one carefully selected for authentic experiences
          </p>
        </div>
      </motion.div>

      {/* Homestays Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredHomestays.map((homestay, index) => (
          <motion.div
            key={homestay.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 1 + (index * 0.1), 
              duration: 0.6,
              ease: "easeOut"
            }}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-500"
          >
            <div className="relative overflow-hidden">
              <motion.img
                src={homestay.imageUrl}
                alt={homestay.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
              >
                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar className="text-sm" />
                  <span className="text-sm font-bold text-gray-800">{homestay.rating}</span>
                </div>
              </motion.div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 leading-tight mb-3">
                {homestay.name}
              </h3>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                <FaMapMarkerAlt className="text-indigo-500" />
                <span className="text-sm font-medium">{homestay.location}</span>
              </div>
              
              <div className="flex items-center gap-6 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <FaUser className="text-blue-500" />
                  <span className="font-medium">{homestay.guests} guests</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <FaBed className="text-green-500" />
                  <span className="font-medium">{homestay.bedrooms} bedrooms</span>
                </div>
              </div>
              
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-gray-500 line-through text-lg">₹{homestay.originalPrice}</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ₹{homestay.currentPrice}
                </span>
                <span className="text-gray-600 dark:text-gray-300 font-medium">per night</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaComments className="text-orange-500" />
                  <span className="font-medium">{homestay.reviews} reviews</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-indigo-700 hover:to-purple-700"
                >
                  Book Now
                </motion.button>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <span className="font-semibold text-gray-800 dark:text-white">Host:</span> {homestay.host}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {homestay.amenities?.map((amenity, amenityIndex) => (
                    <span 
                      key={amenityIndex}
                      className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900 dark:hover:to-purple-900 transition-all duration-300"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredHomestays.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🏠</div>
          <p className="text-gray-600 dark:text-gray-300 text-xl font-medium mb-2">
            No homestays found matching your criteria
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your filters to see more options
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HomestaysPage;
