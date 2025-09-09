import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  FaArrowLeft,
  FaCar,
  FaCoffee,
  FaFilter,
  FaHeart,
  FaList,
  FaMap,
  FaMapMarkerAlt,
  FaPaw,
  FaShareAlt,
  FaSnowflake,
  FaStar,
  FaSwimmingPool,
  FaTv,
  FaUtensils,
  FaWifi
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { MountainView } from '../data';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [viewMode, setViewMode] = useState('list');
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    propertyType: 'all',
    amenities: [],
    rating: 'all'
  });
  const [favorites, setFavorites] = useState(new Set());
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Get search parameters
  const destination = searchParams.get('destination') || 'Delhi, India';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const guests = parseInt(searchParams.get('guests')) || 2;

  // Process MountainView data for search results
  const searchResults = React.useMemo(() => {
    if (!MountainView || !Array.isArray(MountainView)) {
      return [];
    }
    
    return MountainView.map((homestay, index) => ({
      id: homestay.id || `homestay-${index}`,
      name: homestay.title || homestay.name || 'Unnamed Homestay',
      location: homestay.location || 'Delhi, India',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      price: homestay.discounted_price || homestay.actual_price || 3000,
      originalPrice: homestay.actual_price || (homestay.discounted_price ? homestay.discounted_price * 1.2 : 3600),
      rating: homestay.ratings || 4.5,
      reviews: homestay.total_reviews || Math.floor(Math.random() * 200) + 50,
      images: homestay.images && homestay.images.length > 0 ? homestay.images : ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"],
      amenities: ['wifi', 'kitchen', 'ac', 'tv'],
      propertyType: 'Homestay',
      hostName: homestay.host_name || 'Host',
      hostRating: homestay.host_rating || 4.5,
      guests: homestay.homestay_capacity || 4,
      bedrooms: Math.floor((homestay.homestay_capacity || 4) / 2) || 2,
      bathrooms: Math.floor((homestay.homestay_capacity || 4) / 3) + 1 || 1,
      description: homestay.uniqueness || homestay.description || 'Beautiful homestay with great amenities.',
      instantBook: Math.random() > 0.5,
      superhost: (homestay.ratings || 4.5) > 4.7
    }));
  }, []);

  const amenityIcons = {
    wifi: FaWifi,
    parking: FaCar,
    kitchen: FaUtensils,
    pool: FaSwimmingPool,
    pets: FaPaw,
    ac: FaSnowflake,
    tv: FaTv,
    coffee: FaCoffee
  };

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  const handleBookNow = (property) => {
    alert(`Booking ${property.name} for ${guests} guests from ${startDate || 'today'} to ${endDate || 'tomorrow'}`);
  };

  // Filter results
  const filteredResults = searchResults.filter(property => {
    if (filters.priceRange !== 'all') {
      const ranges = {
        low: [0, 2500],
        mid: [2500, 4000],
        high: [4000, Infinity]
      };
      const [min, max] = ranges[filters.priceRange];
      if (property.price < min || property.price > max) return false;
    }
    
    if (filters.propertyType !== 'all' && property.propertyType.toLowerCase() !== filters.propertyType.toLowerCase()) {
      return false;
    }
    
    if (filters.amenities.length > 0) {
      if (!filters.amenities.every(amenity => property.amenities.includes(amenity))) {
        return false;
      }
    }
    
    if (filters.rating !== 'all') {
      const minRating = parseFloat(filters.rating);
      if (property.rating < minRating) return false;
    }
    
    return true;
  });

  // Sort results
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return b.rating - a.rating;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/homestays')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Search Results
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {sortedResults.length} homestays in {destination} • {guests} guests
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                >
                  <FaList className="text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded ${viewMode === 'map' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                >
                  <FaMap className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                <FaFilter className="text-gray-400" />
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'Any Price' },
                    { value: 'low', label: 'Under ₹2,500' },
                    { value: 'mid', label: '₹2,500 - ₹4,000' },
                    { value: 'high', label: 'Over ₹4,000' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value={option.value}
                        checked={filters.priceRange === option.value}
                        onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                        className="text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Property Type */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Property Type</h4>
                <select
                  value={filters.propertyType}
                  onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="homestay">Homestay</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
              
              {/* Rating */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Rating</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'Any Rating' },
                    { value: '4.5', label: '4.5+ Stars' },
                    { value: '4.0', label: '4.0+ Stars' },
                    { value: '3.5', label: '3.5+ Stars' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={option.value}
                        checked={filters.rating === option.value}
                        onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                        className="text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {viewMode === 'list' ? (
              <div className="space-y-6">
                {sortedResults.map((property) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedProperty(property)}
                  >
                    <div className="flex">
                      <div className="w-80 h-64 flex-shrink-0">
                        <img
                          src={property.images[0]}
                          alt={property.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              {property.superhost && (
                                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                  Superhost
                                </span>
                              )}
                              {property.instantBook && (
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                  Instant Book
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                              {property.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              <FaMapMarkerAlt className="mr-1" />
                              {property.location}
                            </p>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(property.id);
                            }}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                          >
                            <FaHeart className={`${favorites.has(property.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-1">
                            <FaStar className="text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{property.rating}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">({property.reviews} reviews)</span>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{property.guests} guests</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{property.bedrooms} bedrooms</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {property.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {property.amenities.slice(0, 4).map((amenity) => {
                              const IconComponent = amenityIcons[amenity];
                              return IconComponent ? (
                                <IconComponent key={amenity} className="text-gray-400 text-sm" />
                              ) : null;
                            })}
                            {property.amenities.length > 4 && (
                              <span className="text-xs text-gray-500">+{property.amenities.length - 4} more</span>
                            )}
                          </div>
                          
                          <div className="text-right">
                            {property.originalPrice > property.price && (
                              <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                ₹{property.originalPrice.toLocaleString()}
                              </div>
                            )}
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              ₹{property.price.toLocaleString()}
                              <span className="text-sm font-normal text-gray-600 dark:text-gray-400">/night</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3 mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookNow(property);
                            }}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                          >
                            Book Now
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <FaShareAlt className="text-gray-600 dark:text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {sortedResults.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🏠</div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
                    <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search criteria</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-96 flex items-center justify-center">
                <div className="text-center">
                  <FaMap className="text-gray-400 text-6xl mb-4 mx-auto" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Map View</h3>
                  <p className="text-gray-600 dark:text-gray-400">Map integration coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProperty(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedProperty.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                {selectedProperty.location}
              </p>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-1">
                  <FaStar className="text-yellow-400 fill-current" />
                  <span className="font-medium">{selectedProperty.rating}</span>
                  <span className="text-gray-600 dark:text-gray-400">({selectedProperty.reviews} reviews)</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">•</span>
                <span>{selectedProperty.guests} guests</span>
                <span className="text-gray-600 dark:text-gray-400">•</span>
                <span>{selectedProperty.bedrooms} bedrooms</span>
                <span className="text-gray-600 dark:text-gray-400">•</span>
                <span>{selectedProperty.bathrooms} bathrooms</span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {selectedProperty.description}
              </p>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{selectedProperty.price.toLocaleString()}/night
                  </div>
                  <button
                    onClick={() => handleBookNow(selectedProperty)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchResultsPage;
