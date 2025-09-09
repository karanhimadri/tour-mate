import { useState } from 'react';
import { FaArrowRight, FaGlobe, FaHeart, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('homestays');

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
      text: 'TourMate helped me find the most amazing homestay in Kyoto. The family was incredible and I experienced authentic Japanese culture.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'Marco Rodriguez',
      location: 'Spain',
      text: 'The language support feature was a lifesaver! I could communicate with locals effortlessly during my trip to Thailand.',
      rating: 5,
      image: '👨‍🎨'
    },
    {
      name: 'Emma Chen',
      location: 'Canada',
      text: 'The personalized itinerary was perfect. Every recommendation was spot-on and I discovered hidden gems I never would have found.',
      rating: 5,
      image: '👩‍🏫'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Travelers', icon: <FaHeart /> },
    { number: '50+', label: 'Countries', icon: <FaGlobe /> },
    { number: '5K+', label: 'Verified Homestays', icon: <FaShieldAlt /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Logo/Brand */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-extrabold mb-4">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  TourMate
                </span>
              </h1>
              <div className="flex items-center justify-center space-x-2 text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-300">
                <span>Smart Local Travel</span>
                <span className="text-indigo-500">✈️</span>
                <span>Homestay Companion</span>
              </div>
            </div>

            {/* Main headline */}
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Discover Authentic Travel
              <span className="block text-indigo-600 dark:text-indigo-400">Beyond Tourism</span>
            </h2>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Connect with authentic, unlisted homestays and explore local experiences with 
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> personalized travel support</span>, 
              itinerary planning, language help, and real-time guidance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link 
                to="/auth"
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Start Your Journey
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/auth"
                className="group border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Get Started
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-indigo-600 dark:text-indigo-400 text-3xl mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Why Choose TourMate?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Discover the perfect blend of technology and authentic travel experiences that make every journey unforgettable</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature.id} className="group text-center p-8 rounded-2xl hover:shadow-2xl dark:hover:shadow-gray-700/50 transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600">
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                <div className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-100 dark:bg-indigo-900 px-4 py-2 rounded-full inline-block">
                  {feature.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">How TourMate Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Your journey to authentic travel in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tell Us Your Preferences</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Share your travel dates, interests, budget, and the type of experience you're looking for. Our AI learns what makes your perfect trip.</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Get Matched</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Our intelligent system finds the perfect homestays and local experiences tailored specifically to your unique preferences and travel style.</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-pink-500 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Travel with Confidence</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Enjoy 24/7 real-time support, language assistance, guided local experiences, and emergency help whenever you need it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Tab */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Explore Our Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Deep dive into what makes TourMate special</p>
          </div>

          <div className="flex flex-wrap justify-center mb-12">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`px-8 py-4 mx-2 mb-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${activeTab === feature.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                <span className="text-2xl mr-3">{feature.icon}</span>
                {feature.title}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 shadow-xl">
            {activeTab === 'homestays' && (
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Authentic Homestays</h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">Connect with verified local families offering genuine cultural experiences in their homes. Live like a local, not like a tourist.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-4">🛡️</div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Verified Hosts</h4>
                    <p className="text-gray-600 dark:text-gray-300">All hosts are personally verified for safety and authenticity through our rigorous screening process</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-4">🤝</div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Cultural Exchange</h4>
                    <p className="text-gray-600 dark:text-gray-300">Learn local customs and traditions directly from your host family in an authentic setting</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-4">💎</div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Hidden Gems</h4>
                    <p className="text-gray-600 dark:text-gray-300">Access unlisted properties in unique locations that you won't find anywhere else</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experiences' && (
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Local Experiences</h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">Discover authentic activities and events curated by locals who know their city's best-kept secrets.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-4">🍜</div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Food Tours</h4>
                    <p className="text-gray-600 dark:text-gray-300">Taste authentic cuisine at local favorites that tourists never discover</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-4">🎨</div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Cultural Activities</h4>
                    <p className="text-gray-600 dark:text-gray-300">Participate in traditional crafts, ceremonies, and local celebrations</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-4">🗺️</div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Off-the-beaten-path</h4>
                    <p className="text-gray-600 dark:text-gray-300">Explore hidden places and secret spots only locals know about</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'planning' && (
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Smart Planning</h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">AI-powered itinerary planning that adapts to your preferences and real-time conditions for the perfect trip.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-4">🎯</div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Personalized Routes</h4>
                    <p className="text-gray-600 dark:text-gray-300">Optimized paths based on your interests, energy levels, and available time</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-4">⚡</div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Real-time Updates</h4>
                    <p className="text-gray-600 dark:text-gray-300">Adapt to weather, events, and crowds instantly with smart suggestions</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-4">💰</div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Budget Tracking</h4>
                    <p className="text-gray-600 dark:text-gray-300">Keep track of expenses and find the best deals within your budget</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'language' && (
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Language Help</h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">Break language barriers with real-time translation and cultural communication tips that make conversations flow naturally.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-4">💬</div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Real-time Translation</h4>
                    <p className="text-gray-600 dark:text-gray-300">Instant voice and text translation with context-aware accuracy</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-4">🌍</div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Cultural Context</h4>
                    <p className="text-gray-600 dark:text-gray-300">Understand local etiquette, customs, and social norms</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-4xl mb-4">🚨</div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Emergency Phrases</h4>
                    <p className="text-gray-600 dark:text-gray-300">Quick access to critical phrases for safety and emergency situations</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">What Our Travelers Say</h2>
            <p className="text-xl text-indigo-200 dark:text-indigo-300 max-w-3xl mx-auto">Real stories from real adventures around the world</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.image}</div>
                  <div>
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed italic">"{testimonial.text}"</p>
                <div className="border-t dark:border-gray-700 pt-6">
                  <p className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-black dark:from-black dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of travelers who have discovered authentic experiences and created unforgettable memories with TourMate
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/auth"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Start Your Journey Now
              <FaArrowRight className="ml-2" />
            </Link>
            <button className="border-2 border-white text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">TourMate</h3>
              <p className="text-gray-400 dark:text-gray-500 text-lg mb-6 max-w-md">Your smart companion for authentic local travel experiences. Discover the world like never before.</p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white transition-colors text-2xl">📱</button>
                <button className="text-gray-400 hover:text-white transition-colors text-2xl">📧</button>
                <button className="text-gray-400 hover:text-white transition-colors text-2xl">🐦</button>
                <button className="text-gray-400 hover:text-white transition-colors text-2xl">📘</button>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Reviews</a></li>
                <li><Link to="/auth" className="text-gray-400 hover:text-white transition-colors">Get Started</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 dark:border-gray-600 pt-8 mt-12 text-center">
            <p className="text-gray-400 dark:text-gray-500">© 2025 TourMate. All rights reserved. Made with ❤️ for travelers.</p>
          </div>
        </div>
      </footer>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Homepage;
