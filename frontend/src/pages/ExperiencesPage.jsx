import { motion } from 'framer-motion';
import { FaBookmark, FaClock, FaStar } from 'react-icons/fa';

const ExperiencesPage = () => {
  const experiences = [
    {
      id: 1,
      title: 'Traditional Pottery Workshop',
      host: 'Maya Sharma',
      duration: '2 hours',
      rating: 4.9,
      price: 30,
      image: 'https://source.unsplash.com/random/400x300?pottery',
      category: 'Arts & Crafts',
    },
    {
      id: 2,
      title: 'Village Cooking Class',
      host: 'Raj Kumar',
      duration: '3 hours',
      rating: 4.8,
      price: 45,
      image: 'https://source.unsplash.com/random/400x300?cooking',
      category: 'Culinary',
    },
    // Add more experiences here
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Local Experiences
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
                <button className="text-gray-400 hover:text-yellow-500">
                  <FaBookmark />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Hosted by {experience.host}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <FaClock /> {experience.duration}
                </span>
                <span className="flex items-center gap-1 text-yellow-500">
                  <FaStar /> {experience.rating}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  ${experience.price}
                </span>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperiencesPage;
