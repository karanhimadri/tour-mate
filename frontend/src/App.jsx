import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './layouts/Sidebar';
import Chatbot from './pages/ChatbotPage';
import CulturalFeed from './pages/CulturalFeedPage';
import Emergency from './pages/EmergencyPage';
import Experiences from './pages/ExperiencesPage';
import Homepage from './pages/Homepage';
import Homestays from './pages/HomestaysPage';
import Itinerary from './pages/ItineraryPage';
import Stories from './pages/StoriesPage';
import Translator from './pages/TranslatorPage';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/homestays" element={<Homestays />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/translator" element={<Translator />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/cultural-feed" element={<CulturalFeed />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
