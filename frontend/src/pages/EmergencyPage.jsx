import { motion } from 'framer-motion';
import { FaDownload, FaExclamationTriangle, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const EmergencyPage = () => {
  const emergencyContacts = [
    { name: 'Police', number: '100' },
    { name: 'Ambulance', number: '102' },
    { name: 'Fire', number: '101' },
    { name: 'Tourist Police', number: '1363' },
    { name: 'Women Helpline', number: '1091' },
  ];

  const handleSOSClick = () => {
    // Implement location sharing and emergency SMS logic
    alert('Emergency services have been notified of your location');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Emergency Services
      </h1>

      {/* SOS Button */}
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg shadow-lg mb-8">
        <div className="flex flex-col items-center">
          <button
            onClick={handleSOSClick}
            className="bg-red-600 text-white w-32 h-32 rounded-full flex items-center justify-center text-2xl font-bold hover:bg-red-700 transition-colors mb-4"
          >
            SOS
          </button>
          <p className="text-red-600 dark:text-red-400 text-center">
            Press in case of emergency.<br />
            This will share your location with emergency services.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Emergency Contacts */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <FaPhone />
            Emergency Contacts
          </h2>
          <div className="space-y-4">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.number}
                className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-gray-800 dark:text-white font-medium">
                  {contact.name}
                </span>
                <a
                  href={`tel:${contact.number}`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {contact.number}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Offline Emergency Kit */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <FaDownload />
            Offline Emergency Kit
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                Cached Data
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  Offline Maps
                </li>
                <li className="flex items-center gap-2">
                  <FaPhone />
                  Emergency Contacts
                </li>
                <li className="flex items-center gap-2">
                  <FaExclamationTriangle />
                  Safety Guidelines
                </li>
              </ul>
              <button className="mt-4 w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Download Offline Kit
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencyPage;
