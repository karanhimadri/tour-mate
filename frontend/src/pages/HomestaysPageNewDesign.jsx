import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaBed, FaFilter, FaHeart, FaMapMarkerAlt, FaShareAlt, FaStar, FaUser } from 'react-icons/fa';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Welcome Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Your Journey! 🎉
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-6">
            Discover authentic homestays and connect with local families around the world
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">5,000+</div>
              <div className="text-sm opacity-80">Verified Homestays</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-80">Countries</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm opacity-80">Satisfaction Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight"
          >
            Discover Authentic
            <span className="block bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Homestays
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Experience genuine local culture through carefully curated homestays that connect you with authentic traditions and warm hospitality.
          </motion.p>
        </div>

        {/* Enhanced Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center mb-6">
            <FaFilter className="text-indigo-600 dark:text-indigo-400 mr-3 text-2xl" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Find Your Perfect Stay</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Region
              </label>
              <select
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              >
                <option value="all">All Regions</option>
                <option value="himachal">Himachal Pradesh</option>
                <option value="uttarakhand">Uttarakhand</option>
                <option value="kerala">Kerala</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="goa">Goa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Budget Range
              </label>
              <select
                value={filters.budget}
                onChange={(e) => handleFilterChange('budget', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              >
                <option value="all">All Budgets</option>
                <option value="low">Under ₹5,000</option>
                <option value="mid">₹5,000 - ₹10,000</option>
                <option value="high">Above ₹10,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Experience Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              >
                <option value="all">All Types</option>
                <option value="mountain">Mountain</option>
                <option value="beach">Beach</option>
                <option value="cultural">Cultural</option>
                <option value="adventure">Adventure</option>
                <option value="heritage">Heritage</option>
              </select>
            </div>
          </div>

          <div className="mt-6 text-center">
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Found {filteredHomestays.length} amazing homestays for you
            </span>
          </div>
        </motion.div>

        {/* Homestays Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredHomestays.map((homestay, index) => (
            <motion.div
              key={homestay.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={homestay.imageUrl || '/api/placeholder/400/250'}
                  alt={homestay.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                    <FaHeart className="text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                    <FaShareAlt className="text-gray-600 hover:text-indigo-500 transition-colors" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {homestay.tags?.[0] || 'Featured'}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {homestay.name}
                  </h3>
                  <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-lg">
                    <FaStar className="text-yellow-500 mr-1" size={14} />
                    <span className="text-sm font-medium text-gray-900 dark:text-yellow-100">
                      {homestay.rating || '4.8'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                  <FaMapMarkerAlt className="mr-2 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm">{homestay.location}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {homestay.description || 'Experience authentic local living with warm hospitality and genuine cultural immersion.'}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <FaBed className="mr-1" />
                      <span>{homestay.rooms || 2} rooms</span>
                    </div>
                    <div className="flex items-center">
                      <FaUser className="mr-1" />
                      <span>{homestay.guests || 4} guests</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{homestay.currentPrice?.toLocaleString() || '5,000'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">per night</div>
                  </div>
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredHomestays.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No homestays found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your filters to find more options
            </p>
            <button
              onClick={() => setFilters({ region: 'all', budget: 'all', type: 'all' })}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mt-16 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h3>
          <p className="text-xl opacity-90 mb-6">
            Let us help you find the perfect homestay that matches your unique preferences
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors transform hover:scale-105">
            Get Personalized Recommendations
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomestaysPage;
