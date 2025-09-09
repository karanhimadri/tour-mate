import { useEffect, useState } from 'react';
import { FaArrowRight, FaEnvelope, FaGlobe, FaHeart, FaLock, FaMoon, FaPlay, FaShieldAlt, FaStar, FaSun, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('homestays');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin', 'signup', 'forgot'
  const [darkMode, setDarkMode] = useState(false);
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const features = [
    {
      id: 'homestays',
      title: 'Authentic Homestays',
      icon: '🏠',
      description: 'Discover unlisted, authentic local homestays',
      highlight: 'Stay with verified families'
    },
    {
      id: 'experiences',
      title: 'Local Experiences',
      icon: '🎭',
      description: 'Explore genuine local culture and activities',
      highlight: 'Hidden gems & traditions'
    },
    {
      id: 'planning',
      title: 'Smart Planning',
      icon: '📋',
      description: 'AI-powered personalized itinerary planning',
      highlight: 'Custom travel routes'
    },
    {
      id: 'language',
      title: 'Language Help',
      icon: '🗣️',
      description: 'Real-time translation and communication support',
      highlight: 'Break language barriers'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'USA',
      text: 'TourMate helped me find the most amazing homestay in Kerala. The family was incredible and I experienced authentic Indian culture.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'Marco Rodriguez',
      location: 'Spain',
      text: 'The language support feature was a lifesaver! I could communicate with locals effortlessly during my trip to Rajasthan.',
      rating: 5,
      image: '👨‍💻'
    },
    {
      name: 'Priya Patel',
      location: 'India',
      text: 'As a local host, TourMate brings me wonderful guests who truly appreciate our culture and traditions.',
      rating: 5,
      image: '👩‍🎓'
    }
  ];

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    console.log(`${authMode} data:`, authData);
    
    // Simulate authentication success
    // In a real app, you would make an API call here
    if (authMode === 'signin' || authMode === 'signup') {
      // Set authentication state in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', authData.email);
      if (authData.name) {
        localStorage.setItem('userName', authData.name);
      }
      
      // Close modal and redirect to homestays
      setShowAuth(false);
      setAuthData({ email: '', password: '', confirmPassword: '', name: '' });
      
      // Navigate to homestays page
      navigate('/homestays');
    } else if (authMode === 'forgot') {
      // Handle forgot password - just show success message for now
      alert('Password reset link sent to your email!');
      setAuthMode('signin');
    }
  };

  const handleGoogleAuth = () => {
    // Simulate Google authentication success
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', 'user@gmail.com');
    localStorage.setItem('userName', 'Google User');
    
    // Close modal and redirect to homestays
    setShowAuth(false);
    setAuthData({ email: '', password: '', confirmPassword: '', name: '' });
    
    // Navigate to homestays page
    navigate('/homestays');
  };

  const handleInputChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-violet-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-indigo-500/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">TourMate</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Features</a>
            <a href="#experiences" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Experiences</a>
            <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Reviews</a>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>
            
            <button 
              onClick={() => { setShowAuth(true); setAuthMode('signin'); }}
              className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium"
            >
              Sign In
            </button>
            <button 
              onClick={() => { setShowAuth(true); setAuthMode('signup'); }}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-xl hover:from-blue-600 hover:to-violet-600 transition-all transform hover:scale-105 font-medium shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30 rounded-full mb-8 border border-blue-200 dark:border-blue-700">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">🇮🇳 Discover Incredible India</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-violet-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-violet-400">
              Your Ultimate
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
              Indian Adventure
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Begins Here
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience authentic India through verified local homestays, cultural immersion, 
            and AI-powered travel planning that connects you with the 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> heart and soul</span> of this incredible nation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => { setShowAuth(true); setAuthMode('signup'); }}
              className="group px-10 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Start Your Journey
                <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={() => { setShowAuth(true); setAuthMode('signup'); }}
              className="group px-10 py-4 border-2 border-blue-500 text-blue-600 dark:text-blue-400 rounded-2xl font-bold text-lg hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50"
            >
              <span className="flex items-center">
                Explore Homestays
                <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center transform group-hover:-translate-y-1 transition-transform">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1000+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Authentic Homestays</div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center transform group-hover:-translate-y-1 transition-transform">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">500+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Cultural Experiences</div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center transform group-hover:-translate-y-1 transition-transform">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50K+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Happy Travelers</div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center transform group-hover:-translate-y-1 transition-transform">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">25+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Indian States</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">TourMate</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're not just another travel platform. We're your gateway to authentic Indian experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30 rounded-full">
                    <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm">
                      ✨ {feature.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
                Experience India's
                <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Hidden Treasures
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                From the backwaters of Kerala to the deserts of Rajasthan, discover authentic experiences 
                that connect you with India's rich cultural heritage.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <FaShieldAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Verified & Safe
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Every homestay and experience is personally verified for your safety and authenticity.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <FaHeart className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      24/7 Support
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Round-the-clock assistance with local experts and emergency support.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <FaGlobe className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Global Community
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Join a community of conscious travelers exploring India responsibly.
                    </p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => { setShowAuth(true); setAuthMode('signup'); }}
                className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-violet-600 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-3"
              >
                <FaPlay className="text-lg" />
                <span>Start Your Journey</span>
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaPlay className="text-white text-2xl ml-1" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 font-semibold">
                      Watch: India Through Local Eyes
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      See how TourMate transforms travel experiences
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <div className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Popular Destinations
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover the most beloved spots for authentic homestay experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-400 to-violet-500 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h4 className="text-2xl font-bold mb-3">Rajasthan</h4>
              <p className="text-blue-100 mb-4">Royal heritage, desert safaris, and palace homestays</p>
              <Link to="/homestays" className="inline-flex items-center text-white font-semibold hover:underline">
                Explore <FaArrowRight className="ml-2" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h4 className="text-2xl font-bold mb-3">Kerala</h4>
              <p className="text-green-100 mb-4">Backwaters, spice plantations, and coastal villages</p>
              <Link to="/homestays" className="inline-flex items-center text-white font-semibold hover:underline">
                Explore <FaArrowRight className="ml-2" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h4 className="text-2xl font-bold mb-3">Himachal Pradesh</h4>
              <p className="text-purple-100 mb-4">Mountain retreats, adventure sports, and hill stations</p>
              <Link to="/homestays" className="inline-flex items-center text-white font-semibold hover:underline">
                Explore <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 dark:from-purple-800 dark:via-pink-800 dark:to-red-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">What Our Travelers Say</h2>
            <p className="text-xl text-purple-100 dark:text-purple-200 max-w-3xl mx-auto">
              Real stories from real adventures across incredible India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="text-5xl mr-4">{testimonial.image}</div>
                  <div>
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-xl" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t dark:border-gray-700 pt-6">
                  <p className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</p>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <div className="bg-indigo-600 dark:bg-indigo-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-indigo-200">Verified Homestays</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="text-indigo-200">Happy Travelers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.9★</div>
              <div className="text-indigo-200">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-indigo-200">AI Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start Your Journey?
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of travelers discovering authentic India through local connections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { setShowAuth(true); setAuthMode('signup'); }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Find Homestays</span>
              <FaArrowRight />
            </button>
            <button
              onClick={() => { setShowAuth(true); setAuthMode('signin'); }}
              className="border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {authMode === 'signin' ? 'Welcome Back' : authMode === 'signup' ? 'Join TourMate' : 'Reset Password'}
                </h2>
                <button 
                  onClick={() => setShowAuth(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Auth Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-6">
                {authMode === 'signup' && (
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={authData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                )}

                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={authData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                {authMode !== 'forgot' && (
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={authData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                )}

                {authMode === 'signup' && (
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={authData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                )}

                {authMode === 'signin' && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-600 dark:text-gray-400">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-violet-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  {authMode === 'signin' ? 'Sign In' : authMode === 'signup' ? 'Create Account' : 'Reset Password'}
                </button>
              </form>

              {/* Social Login */}
              {authMode !== 'forgot' && (
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleGoogleAuth}
                    className="mt-6 w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                </div>
              )}

              {/* Auth Mode Switch */}
              <div className="mt-8 text-center">
                {authMode === 'signin' ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <button
                      onClick={() => setAuthMode('signup')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                ) : authMode === 'signup' ? (
                  <p className="text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <button
                      onClick={() => setAuthMode('signin')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                ) : (
                  <button
                    onClick={() => setAuthMode('signin')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Back to Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
