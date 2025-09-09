import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Authpage from './pages/Authpage';
import Chatbot from './pages/ChatbotPageUserFriendly';
import CulturalFeed from './pages/CulturalFeedPage';
import Emergency from './pages/EmergencyPage';
import Experiences from './pages/ExperiencesPage';
import Homepage from './pages/Homepage';
import Homestays from './pages/HomestaysPage';
import SearchResults from './pages/SearchResultsPage';
import TourPlanPage from './pages/TourPlanPage';
import Translator from './pages/TranslatorPage';

const AppContent = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if current route should show header
  const shouldShowHeader = !['/home', '/auth'].includes(location.pathname) && location.pathname !== '/';

  // Check authentication status from localStorage or state management
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {shouldShowHeader && <Header isAuthenticated={isAuthenticated} />}
      <main className={shouldShowHeader ? 'pt-0' : ''}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/auth" element={<Authpage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/homestays" element={<Homestays />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/tour-plan" element={<TourPlanPage />} />
          <Route path="/itinerary" element={<TourPlanPage />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/cultural-feed" element={<CulturalFeed />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
