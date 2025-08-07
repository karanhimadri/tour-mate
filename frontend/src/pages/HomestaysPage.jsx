import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaComments, FaStar } from 'react-icons/fa';

const HomestaysPage = () => {
  const [filters, setFilters] = useState({
    region: 'all',
    budget: 'all',
    type: 'all',
  });

  const homestays = [
    {
      id: 1,
      name: "Mountain View Retreat",
      host: "John Doe",
      rating: 4.8,
      type: "mountain",
      price: 120,
      image: "https://source.unsplash.com/random/400x300?mountain,house",
      region: "North",
    },
    // Add more homestays here
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Discover Homestays
      </h1>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Regions</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
          </select>

          <select
            value={filters.budget}
            onChange={(e) => handleFilterChange('budget', e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Budgets</option>
            <option value="budget">Budget (&lt;$50)</option>
            <option value="mid">Mid-Range ($50-$100)</option>
            <option value="luxury">Luxury (&gt;$100)</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">All Types</option>
            <option value="mountain">Mountain</option>
            <option value="coastal">Coastal</option>
            <option value="rural">Rural</option>
            <option value="urban">Urban</option>
          </select>
        </div>
      </div>

      {/* Homestays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homestays.map((homestay) => (
          <motion.div
            key={homestay.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={homestay.image}
              alt={homestay.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {homestay.name}
                </h3>
                <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{homestay.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Hosted by {homestay.host}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  ${homestay.price}/night
                </span>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  <FaComments />
                  Chat with Host
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HomestaysPage;
