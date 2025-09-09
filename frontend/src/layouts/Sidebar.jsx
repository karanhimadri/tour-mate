import { useState } from 'react';
import {
    FaBed,
    FaBookOpen,
    FaExclamationTriangle,
    FaHome,
    FaLanguage,
    FaMapMarkedAlt,
    FaMoon,
    FaNewspaper,
    FaRobot,
    FaSignInAlt,
    FaSun,
    FaUserFriends
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { path: '/', name: 'Home', icon: <FaHome size={20} /> },
    { path: '/homestays', name: 'Homestays', icon: <FaBed size={20} /> },
    { path: '/itinerary', name: 'Itinerary', icon: <FaMapMarkedAlt size={20} /> },
    { path: '/translator', name: 'Translator', icon: <FaLanguage size={20} /> },
    { path: '/experiences', name: 'Experiences', icon: <FaUserFriends size={20} /> },
    { path: '/stories', name: 'Stories', icon: <FaBookOpen size={20} /> },
    { path: '/emergency', name: 'Emergency', icon: <FaExclamationTriangle size={20} /> },
    { path: '/cultural-feed', name: 'Cultural Feed', icon: <FaNewspaper size={20} /> },
    { path: '/chatbot', name: 'Chatbot', icon: <FaRobot size={20} /> },
    { path: '/auth', name: 'Sign In', icon: <FaSignInAlt size={20} /> },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="h-screen w-64 bg-white dark:bg-gray-800 fixed left-0 top-0 shadow-lg transition-all duration-300">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-8">TourMate</h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button
        onClick={toggleDarkMode}
        className="absolute bottom-8 left-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </div>
  );
};

export default Sidebar;
