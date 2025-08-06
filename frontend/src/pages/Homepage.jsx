import React, { useState } from 'react';

const Homepage = () => {
  const [activeTab, setActiveTab] = useState('homestays');

  const features = [
    {
      id: 'homestays',
      title: 'Authentic Homestays',
      icon: '🏠',
      description: 'Discover unlisted, authentic local homestays'
    },
    {
      id: 'experiences',
      title: 'Local Experiences',
      icon: '🎭',
      description: 'Explore genuine local culture and activities'
    },
    {
      id: 'planning',
      title: 'Smart Planning',
      icon: '📋',
      description: 'AI-powered personalized itinerary planning'
    },
    {
      id: 'language',
      title: 'Language Help',
      icon: '🗣️',
      description: 'Real-time translation and communication support'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'USA',
      text: 'TourMate helped me find the most amazing homestay in Kyoto. The family was incredible and I experienced authentic Japanese culture.',
      rating: 5
    },
    {
      name: 'Marco Rodriguez',
      location: 'Spain',
      text: 'The language support feature was a lifesaver! I could communicate with locals effortlessly during my trip to Thailand.',
      rating: 5
    },
    {
      name: 'Emma Chen',
      location: 'Canada',
      text: 'The personalized itinerary was perfect. Every recommendation was spot-on and I discovered hidden gems I never would have found.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-indigo-600">TourMate</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                How it Works
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Reviews
              </a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              TourMate
              <span className="block text-indigo-600">Smart Local Travel</span>
              <span className="block text-gray-700 text-3xl md:text-4xl mt-2">& Homestay Companion</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect with authentic, unlisted homestays and explore local experiences with personalized travel support,
              itinerary planning, language help, and real-time guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors">
                Start Your Journey
              </button>
              <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 hover:text-white transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TourMate?</h2>
            <p className="text-xl text-gray-600">Discover the perfect blend of technology and authentic travel experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How TourMate Works</h2>
            <p className="text-xl text-gray-600">Your journey to authentic travel in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tell Us Your Preferences</h3>
              <p className="text-gray-600">Share your travel dates, interests, budget, and the type of experience you're looking for.</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Matched</h3>
              <p className="text-gray-600">Our AI finds the perfect homestays and local experiences tailored to your preferences.</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Travel with Confidence</h3>
              <p className="text-gray-600">Enjoy real-time support, language assistance, and guided local experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Tab */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Features</h2>
          </div>

          <div className="flex flex-wrap justify-center mb-8">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`px-6 py-3 mx-2 mb-2 rounded-lg font-medium transition-colors ${activeTab === feature.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {feature.icon} {feature.title}
              </button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            {activeTab === 'homestays' && (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Authentic Homestays</h3>
                <p className="text-gray-600 mb-6">Connect with verified local families offering genuine cultural experiences in their homes.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Verified Hosts</h4>
                    <p className="text-gray-600 text-sm">All hosts are personally verified for safety and authenticity</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Cultural Exchange</h4>
                    <p className="text-gray-600 text-sm">Learn local customs and traditions from your host family</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Hidden Gems</h4>
                    <p className="text-gray-600 text-sm">Access unlisted properties in unique locations</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experiences' && (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Experiences</h3>
                <p className="text-gray-600 mb-6">Discover authentic activities and events curated by locals who know their city best.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Food Tours</h4>
                    <p className="text-gray-600 text-sm">Taste authentic cuisine at local favorites</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Cultural Activities</h4>
                    <p className="text-gray-600 text-sm">Participate in traditional crafts and ceremonies</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Off-the-beaten-path</h4>
                    <p className="text-gray-600 text-sm">Explore places tourists never find</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'planning' && (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Planning</h3>
                <p className="text-gray-600 mb-6">AI-powered itinerary planning that adapts to your preferences and real-time conditions.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Personalized Routes</h4>
                    <p className="text-gray-600 text-sm">Optimized paths based on your interests and time</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Real-time Updates</h4>
                    <p className="text-gray-600 text-sm">Adapt to weather, events, and crowds instantly</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Budget Tracking</h4>
                    <p className="text-gray-600 text-sm">Keep track of expenses and find deals</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'language' && (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Language Help</h3>
                <p className="text-gray-600 mb-6">Break language barriers with real-time translation and cultural communication tips.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Real-time Translation</h4>
                    <p className="text-gray-600 text-sm">Instant voice and text translation</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Cultural Context</h4>
                    <p className="text-gray-600 text-sm">Understand local etiquette and customs</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Emergency Phrases</h4>
                    <p className="text-gray-600 text-sm">Quick access to important local phrases</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-indigo-200">Real stories from real adventures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered authentic experiences with TourMate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors">
              Download App
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-gray-900 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">TourMate</h3>
              <p className="text-gray-400">Your smart companion for authentic local travel experiences.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
              <ul className="text-gray-400 space-y-2">
                <li>Homestays</li>
                <li>Local Experiences</li>
                <li>Smart Planning</li>
                <li>Language Support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="text-gray-400 space-y-2">
                <li>Help Center</li>
                <li>Safety</li>
                <li>Contact Us</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="text-gray-400 space-y-2">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Partners</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 TourMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;