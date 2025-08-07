import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaClock, FaMapMarkerAlt, FaPlus, FaTrash } from 'react-icons/fa';

const ItineraryPage = () => {
  const [location, setLocation] = useState('');
  const [tripLength, setTripLength] = useState(1);
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    name: '',
    time: '',
    duration: 1,
  });

  const suggestedActivities = [
    'Local Market Visit',
    'Temple Tour',
    'Cooking Class',
    'Nature Walk',
    'Cultural Show',
    'Historical Sites',
  ];

  const handleAddActivity = () => {
    if (newActivity.name && newActivity.time) {
      setActivities([...activities, { ...newActivity, id: Date.now() }]);
      setNewActivity({ name: '', time: '', duration: 1 });
    }
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Smart Itinerary Planner
      </h1>

      {/* Trip Details Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter destination"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Trip Length (days)
            </label>
            <input
              type="number"
              value={tripLength}
              onChange={(e) => setTripLength(Number(e.target.value))}
              min="1"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Activity Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Schedule Builder
            </h2>

            {/* Add New Activity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <input
                type="text"
                value={newActivity.name}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, name: e.target.value })
                }
                placeholder="Activity name"
                className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="time"
                value={newActivity.time}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, time: e.target.value })
                }
                className="p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newActivity.duration}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      duration: Number(e.target.value),
                    })
                  }
                  min="0.5"
                  step="0.5"
                  className="w-20 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
                <button
                  onClick={handleAddActivity}
                  className="flex-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaPlus /> Add
                </button>
              </div>
            </div>

            {/* Activities List */}
            <div className="space-y-4">
              {activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {activity.name}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 text-sm mt-1">
                      <span className="flex items-center gap-1">
                        <FaClock /> {activity.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock /> {activity.duration}h
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteActivity(activity.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Suggested Activities & Map */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Suggested Activities
            </h2>
            <div className="flex flex-wrap gap-2">
              {suggestedActivities.map((activity) => (
                <button
                  key={activity}
                  onClick={() =>
                    setNewActivity({ ...newActivity, name: activity })
                  }
                  className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Route Map
            </h2>
            <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
              <FaMapMarkerAlt className="text-4xl text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItineraryPage;
