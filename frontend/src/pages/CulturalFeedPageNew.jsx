import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
    FaBookmark,
    FaCalendarAlt,
    FaComment,
    FaEye,
    FaFire,
    FaGlobe,
    FaHeart,
    FaHistory,
    FaLanguage,
    FaMusic,
    FaPalette,
    FaPause,
    FaPlay,
    FaSearch,
    FaShare,
    FaStar,
    FaTheaterMasks,
    FaTrendingUp,
    FaUtensils,
    FaVideo
} from 'react-icons/fa';
import { culturalPosts } from '../data';

const CulturalFeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [userPreferences, setUserPreferences] = useState({
    categories: ['food', 'art', 'music', 'tradition'],
    location: 'India',
    language: 'English'
  });
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, magazine
  const [sortBy, setSortBy] = useState('recent'); // recent, popular, trending
  const audioRef = useRef(null);

  const categories = [
    { id: 'all', name: 'All', icon: FaGlobe, color: 'bg-blue-500' },
    { id: 'food', name: 'Cuisine', icon: FaUtensils, color: 'bg-orange-500' },
    { id: 'art', name: 'Art & Craft', icon: FaPalette, color: 'bg-purple-500' },
    { id: 'music', name: 'Music & Dance', icon: FaMusic, color: 'bg-green-500' },
    { id: 'tradition', name: 'Traditions', icon: FaTheaterMasks, color: 'bg-red-500' },
    { id: 'festival', name: 'Festivals', icon: FaCalendarAlt, color: 'bg-yellow-500' },
    { id: 'language', name: 'Language', icon: FaLanguage, color: 'bg-indigo-500' },
    { id: 'history', name: 'History', icon: FaHistory, color: 'bg-gray-500' }
  ];

  const enhancedPosts = culturalPosts.map((post, index) => ({
    ...post,
    likes: Math.floor(Math.random() * 500) + 100,
    comments: Math.floor(Math.random() * 100) + 10,
    views: Math.floor(Math.random() * 5000) + 500,
    audio: index % 3 === 0 ? `/audio/sample-${index}.mp3` : null,
    video: index % 4 === 0 ? `/video/sample-${index}.mp4` : null,
    tags: ['culture', 'heritage', 'traditional', 'authentic'],
    isVerified: Math.random() > 0.5,
    readTime: `${Math.floor(Math.random() * 8) + 2} min`,
    difficulty: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)],
    trending: Math.random() > 0.7,
    authorAvatar: ['👨‍🍳', '👩‍🎨', '🎭', '🎵', '📖', '🌟'][Math.floor(Math.random() * 6)]
  }));

  useEffect(() => {
    setPosts(enhancedPosts);
    setFilteredPosts(enhancedPosts);
    loadUserPreferences();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [activeFilter, searchQuery, posts, sortBy]);

  const loadUserPreferences = () => {
    const saved = localStorage.getItem('culturalFeedPreferences');
    if (saved) {
      setUserPreferences(JSON.parse(saved));
    }
  };

  const saveUserPreferences = (prefs) => {
    localStorage.setItem('culturalFeedPreferences', JSON.stringify(prefs));
    setUserPreferences(prefs);
  };

  const filterPosts = () => {
    let filtered = [...posts];

    // Filter by category
    if (activeFilter !== 'all') {
      filtered = filtered.filter(post => 
        post.category.toLowerCase().includes(activeFilter) ||
        post.tags?.some(tag => tag.toLowerCase().includes(activeFilter))
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'trending':
          return b.trending ? 1 : -1;
        case 'views':
          return b.views - a.views;
        default: // recent
          return new Date(b.date) - new Date(a.date);
      }
    });

    setFilteredPosts(filtered);
  };

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: likedPosts.includes(postId) ? post.likes - 1 : post.likes + 1 }
        : post
    ));

    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleBookmark = (postId) => {
    setBookmarkedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
    
    showNotification(
      bookmarkedPosts.includes(postId) ? 'Removed from bookmarks' : 'Added to bookmarks',
      'success'
    );
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${post.title}\n${window.location.href}`);
      showNotification('Link copied to clipboard!', 'success');
    }
  };

  const playAudio = (audioUrl, postId) => {
    if (currentAudio === postId && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(audioUrl);
    audioRef.current.play();
    setCurrentAudio(postId);
    setIsPlaying(true);

    audioRef.current.onended = () => {
      setIsPlaying(false);
      setCurrentAudio(null);
    };
  };

  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };
    
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  const getPostStats = (post) => {
    const engagement = ((post.likes + post.comments) / post.views * 100).toFixed(1);
    return { engagement };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Cultural Feed
            </h1>
            <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🎭</div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover, explore, and celebrate the rich cultural heritage of India through immersive stories and experiences
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-8 border border-white/20"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search cultural content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
              {['grid', 'list', 'magazine'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    viewMode === mode 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mt-6">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <category.icon className="text-sm" />
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className={`grid gap-6 mb-8 ${
          viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
          viewMode === 'list' ? 'grid-cols-1' :
          'grid-cols-1 lg:grid-cols-2'
        }`}>
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden group hover:shadow-3xl transition-all duration-500 ${
                viewMode === 'magazine' ? 'lg:flex lg:items-center' : ''
              }`}
              whileHover={{ y: -5 }}
            >
              
              {/* Post Image */}
              <div className={`relative overflow-hidden ${
                viewMode === 'magazine' ? 'lg:w-2/5' : 'w-full h-48'
              }`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Trending Badge */}
                {post.trending && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <FaFire className="text-xs" />
                    Trending
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </div>

                {/* Media Controls */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {post.audio && (
                    <button
                      onClick={() => playAudio(post.audio, post.id)}
                      className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300"
                    >
                      {currentAudio === post.id && isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                  )}
                  {post.video && (
                    <button className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300">
                      <FaVideo />
                    </button>
                  )}
                </div>
              </div>

              {/* Post Content */}
              <div className={`p-6 ${viewMode === 'magazine' ? 'lg:w-3/5' : ''}`}>
                
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{post.authorAvatar}</div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                        {post.author}
                        {post.isVerified && <FaStar className="text-yellow-500 text-xs" />}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {post.date} • {post.readTime}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      post.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {post.difficulty}
                    </span>
                  </div>
                </div>

                {/* Title and Content */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags?.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors duration-300 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Post Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <FaEye />
                      {post.views?.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaTrendingUp />
                      {getPostStats(post).engagement}%
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                        likedPosts.includes(post.id)
                          ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <FaHeart className={likedPosts.includes(post.id) ? 'text-red-500' : ''} />
                      {post.likes}
                    </button>
                    
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
                    >
                      <FaComment />
                      {post.comments}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        bookmarkedPosts.includes(post.id)
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <FaBookmark />
                    </button>
                    
                    <button
                      onClick={() => handleShare(post)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
                    >
                      <FaShare />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
            >
              Load More Stories
            </motion.button>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-2">
              No cultural content found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Try adjusting your search or filters to discover amazing cultural stories
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {selectedPost.title}
                </h2>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {selectedPost.content}
                </p>
                
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <h4 className="font-bold mb-2">About this content:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This cultural insight was shared by {selectedPost.author}. 
                    It represents authentic local knowledge and traditions passed down through generations.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CulturalFeedPage;
