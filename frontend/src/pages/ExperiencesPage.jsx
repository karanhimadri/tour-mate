import { motion } from 'framer-motion';
import { FaBookmark, FaClock, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { experiences } from '../data';

const ExperiencesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Authentic Local Experiences
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience) => (
          <motion.div
            key={experience.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {experience.title}
                </h3>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <FaBookmark />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                <FaMapMarkerAlt className="text-indigo-600" />
                <span className="text-sm">{experience.location}</span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                {experience.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {experience.duration}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {experience.rating}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Hosted by</span>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {experience.host}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-indigo-600">
                    ₹{experience.price}
                  </span>
                  <p className="text-sm text-gray-500">per person</p>
                </div>
              </div>
              
              <div className="mt-4">
                <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm">
                  {experience.category}
                </span>
              </div>
              
              <button className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Book Experience
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperiencesPage;
