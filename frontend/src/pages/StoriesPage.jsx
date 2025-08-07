import { motion } from 'framer-motion';
import { FaBookmark, FaComment, FaHeart, FaShare } from 'react-icons/fa';

const StoriesPage = () => {
  const stories = [
    {
      id: 1,
      author: 'Sarah Thompson',
      location: 'Himachal Pradesh, India',
      title: 'A Week in the Mountains',
      content:
        'Spent an incredible week in a traditional mountain homestay, learning about local customs and enjoying breathtaking views...',
      image: 'https://source.unsplash.com/random/800x400?mountains,india',
      likes: 234,
      comments: 45,
      date: '2 days ago',
    },
    // Add more stories here
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Travel Stories
      </h1>

      <div className="space-y-8">
        {stories.map((story) => (
          <motion.article
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`https://i.pravatar.cc/40?u=${story.id}`}
                  alt={story.author}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {story.author}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {story.location} • {story.date}
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                {story.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {story.content}
              </p>

              <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500">
                    <FaHeart />
                    <span>{story.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500">
                    <FaComment />
                    <span>{story.comments}</span>
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-gray-600 dark:text-gray-400 hover:text-yellow-500">
                    <FaBookmark />
                  </button>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-indigo-500">
                    <FaShare />
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

export default StoriesPage;
