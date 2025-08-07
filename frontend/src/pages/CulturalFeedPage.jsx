import { motion } from 'framer-motion';
import { FaBookmark, FaHeart, FaLanguage, FaShare } from 'react-icons/fa';

const CulturalFeedPage = () => {
  const culturalPosts = [
    {
      id: 1,
      category: 'Language Tips',
      title: 'Essential Hindi Greetings',
      content: 'Learn these basic Hindi greetings to connect with locals...',
      image: 'https://source.unsplash.com/random/400x300?india,culture',
      likes: 156,
    },
    {
      id: 2,
      category: 'Food Stories',
      title: 'The Art of Making Masala Chai',
      content: 'Discover the secrets behind India\'s favorite beverage...',
      image: 'https://source.unsplash.com/random/400x300?tea,india',
      likes: 234,
    },
    {
      id: 3,
      category: 'Regional Folklore',
      title: 'Legends of Rajasthan',
      content: 'Explore the fascinating tales behind Rajasthan\'s majestic forts...',
      image: 'https://source.unsplash.com/random/400x300?rajasthan,fort',
      likes: 189,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Cultural Feed
      </h1>

      <div className="space-y-8">
        {culturalPosts.map((post) => (
          <motion.article
            key={post.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 mb-2">
                  {post.category === 'Language Tips' && <FaLanguage />}
                  <span>{post.category}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {post.content}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500">
                      <FaHeart />
                      <span>{post.likes}</span>
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-indigo-500">
                      <FaShare />
                    </button>
                  </div>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-yellow-500">
                    <FaBookmark />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};

export default CulturalFeedPage;
