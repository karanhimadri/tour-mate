import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    FaArrowUp,
    FaBookmark,
    FaBookOpen,
    FaCamera,
    FaClock,
    FaComment,
    FaEye,
    FaHashtag,
    FaHeart,
    FaMapMarkerAlt,
    FaPlus,
    FaSearch,
    FaShare,
    FaStar
} from 'react-icons/fa';
import { stories } from '../data';

const StoriesPage = () => {
  const [likedStories, setLikedStories] = useState(new Set());
  const [bookmarkedStories, setBookmarkedStories] = useState(new Set());
  const [commentCounts, setCommentCounts] = useState({});
  const [shareModalOpen, setShareModalOpen] = useState(null);
  const [filterTag, setFilterTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedStory, setExpandedStory] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showCreateStoryModal, setShowCreateStoryModal] = useState(false);
  const [newStory, setNewStory] = useState({
    title: '',
    content: '',
    location: '',
    tags: []
  });

  // Initialize state from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedStories');
    const savedBookmarks = localStorage.getItem('bookmarkedStories');
    const savedComments = localStorage.getItem('commentCounts');
    
    if (savedLikes) setLikedStories(new Set(JSON.parse(savedLikes)));
    if (savedBookmarks) setBookmarkedStories(new Set(JSON.parse(savedBookmarks)));
    if (savedComments) setCommentCounts(JSON.parse(savedComments));

    // Initialize comment counts
    const initialCounts = {};
    stories.forEach(story => {
      initialCounts[story.id] = story.comments;
    });
    setCommentCounts(prev => ({ ...initialCounts, ...prev }));

    // Scroll listener
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save to localStorage
  const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify([...value]));
  };

  // Handle like toggle
  const handleLike = (storyId) => {
    const newLikedStories = new Set(likedStories);
    if (newLikedStories.has(storyId)) {
      newLikedStories.delete(storyId);
    } else {
      newLikedStories.add(storyId);
    }
    setLikedStories(newLikedStories);
    saveToStorage('likedStories', newLikedStories);
  };

  // Handle bookmark toggle
  const handleBookmark = (storyId) => {
    const newBookmarkedStories = new Set(bookmarkedStories);
    if (newBookmarkedStories.has(storyId)) {
      newBookmarkedStories.delete(storyId);
    } else {
      newBookmarkedStories.add(storyId);
    }
    setBookmarkedStories(newBookmarkedStories);
    saveToStorage('bookmarkedStories', newBookmarkedStories);
  };

  // Handle comment
  const handleComment = (storyId) => {
    const newCounts = { ...commentCounts };
    newCounts[storyId] = (newCounts[storyId] || 0) + 1;
    setCommentCounts(newCounts);
    localStorage.setItem('commentCounts', JSON.stringify(newCounts));
    
    // Simulate comment addition with a notification
    showNotification('Comment added successfully! 💬');
  };

  // Handle share
  const handleShare = (story) => {
    setSelectedStory(story);
    setShowShareModal(true);
  };

  // Share functions
  const shareToSocial = (platform, story) => {
    const url = window.location.href;
    const text = `Check out this amazing travel story: "${story.title}" by ${story.author}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareModal(false);
    showNotification(`Shared to ${platform.charAt(0).toUpperCase() + platform.slice(1)}! 🎉`);
  };

  // Copy link
  const copyLink = (story) => {
    navigator.clipboard.writeText(window.location.href + `#story-${story.id}`);
    setShowShareModal(false);
    showNotification('Link copied to clipboard! 📋');
  };

  // Show notification
  const showNotification = (message) => {
    // Simple notification (you could use a proper toast library)
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  // Filter and sort stories
  const getFilteredStories = () => {
    let filtered = stories;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Tag filter
    if (filterTag !== 'All') {
      filtered = filtered.filter(story => story.tags.includes(filterTag));
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        filtered = [...filtered].sort((a, b) => (b.likes + (commentCounts[b.id] || 0)) - (a.likes + (commentCounts[a.id] || 0)));
        break;
      case 'mostLiked':
        filtered = [...filtered].sort((a, b) => b.likes - a.likes);
        break;
      case 'mostCommented':
        filtered = [...filtered].sort((a, b) => (commentCounts[b.id] || 0) - (commentCounts[a.id] || 0));
        break;
      default: // latest
        filtered = [...filtered].reverse();
    }

    return filtered;
  };

  // Get all unique tags
  const getAllTags = () => {
    const tags = new Set();
    stories.forEach(story => {
      story.tags.forEach(tag => tags.add(tag));
    });
    return ['All', ...Array.from(tags).sort()];
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredStories = getFilteredStories();
  const allTags = getAllTags();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-orange-900 dark:to-red-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Travel Stories
            </h1>
            <div className="absolute -top-4 -right-4 text-4xl animate-bounce">📖</div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover amazing adventures and share your own journey with fellow travelers
          </p>
        </motion.div>

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-8 border border-white/20"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search stories, authors, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex gap-2 flex-wrap">
              {allTags.slice(0, 6).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    filterTag === tag
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag === 'All' ? '🌍' : '🏷️'} {tag}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="latest">🕒 Latest</option>
              <option value="popular">🔥 Popular</option>
              <option value="mostLiked">❤️ Most Liked</option>
              <option value="mostCommented">💬 Most Commented</option>
            </select>

            {/* Share Your Story Button */}
            <button 
              onClick={() => setShowCreateStoryModal(true)}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-bold hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <FaPlus />
              Share Story
            </button>
          </div>
        </motion.div>

        {/* Stories Grid */}
        <div className="space-y-8">
          <AnimatePresence>
            {filteredStories.map((story, index) => (
              <motion.article
                key={story.id}
                id={`story-${story.id}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:shadow-3xl transition-all duration-500 group"
              >
                {/* Story Image */}
                <div className="relative overflow-hidden h-72 md:h-96">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback image if original fails to load
                      e.target.src = `https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`;
                    }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Story Stats Overlay */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <FaEye />
                      {Math.floor(Math.random() * 1000) + 500}
                    </div>
                    <div className="bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <FaClock />
                      {story.date}
                    </div>
                  </div>

                  {/* Author Info Overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/60?u=${story.id}`}
                      alt={story.author}
                      className="w-12 h-12 rounded-full border-3 border-white shadow-lg"
                    />
                    <div>
                      <h3 className="font-bold text-white text-lg drop-shadow-lg">
                        {story.author}
                      </h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm drop-shadow">
                        <FaMapMarkerAlt className="text-orange-400" />
                        <span>{story.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Story Content */}
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-orange-600 transition-colors">
                    {story.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                    {expandedStory === story.id 
                      ? story.content 
                      : story.content.length > 200 
                        ? story.content.substring(0, 200) + '...'
                        : story.content
                    }
                  </p>

                  {story.content.length > 200 && (
                    <button
                      onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
                      className="text-orange-600 hover:text-orange-700 font-medium mb-4 flex items-center gap-2"
                    >
                      <FaBookOpen />
                      {expandedStory === story.id ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {story.tags?.map((tag, tagIndex) => (
                      <motion.span 
                        key={tagIndex}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setFilterTag(tag)}
                        className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:from-orange-200 hover:to-red-200 transition-all duration-300 flex items-center gap-1"
                      >
                        <FaHashtag className="text-xs" />
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-6">
                      
                      {/* Like Button */}
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLike(story.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                          likedStories.has(story.id)
                            ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-red-50 hover:text-red-500'
                        }`}
                      >
                        <FaHeart className={likedStories.has(story.id) ? 'animate-pulse' : ''} />
                        <span>{story.likes + (likedStories.has(story.id) ? 1 : 0)}</span>
                      </motion.button>
                      
                      {/* Comment Button */}
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleComment(story.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-500 transition-all duration-300"
                      >
                        <FaComment />
                        <span>{commentCounts[story.id] || story.comments}</span>
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      
                      {/* Share Button */}
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShare(story)}
                        className="p-3 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-xl hover:bg-green-50 hover:text-green-500 transition-all duration-300"
                        title="Share this story"
                      >
                        <FaShare />
                      </motion.button>
                      
                      {/* Bookmark Button */}
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleBookmark(story.id)}
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          bookmarkedStories.has(story.id)
                            ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-yellow-50 hover:text-yellow-500'
                        }`}
                        title="Bookmark this story"
                      >
                        <FaBookmark className={bookmarkedStories.has(story.id) ? 'animate-pulse' : ''} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredStories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">No stories found</h3>
            <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && selectedStory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowShareModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Share Story</h3>
                
                <div className="space-y-4">
                  <button
                    onClick={() => shareToSocial('facebook', selectedStory)}
                    className="w-full p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-white rounded text-blue-600 flex items-center justify-center text-sm font-bold">f</div>
                    Share on Facebook
                  </button>
                  
                  <button
                    onClick={() => shareToSocial('twitter', selectedStory)}
                    className="w-full p-4 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-white rounded text-sky-500 flex items-center justify-center text-sm font-bold">𝕏</div>
                    Share on Twitter
                  </button>
                  
                  <button
                    onClick={() => shareToSocial('whatsapp', selectedStory)}
                    className="w-full p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-white rounded text-green-500 flex items-center justify-center text-sm font-bold">W</div>
                    Share on WhatsApp
                  </button>
                  
                  <button
                    onClick={() => copyLink(selectedStory)}
                    className="w-full p-4 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-white rounded text-gray-600 flex items-center justify-center text-sm font-bold">🔗</div>
                    Copy Link
                  </button>
                </div>
                
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-full mt-6 p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Story Modal */}
        <AnimatePresence>
          {showCreateStoryModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowCreateStoryModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
                  <FaCamera className="text-orange-600" />
                  Share Your Travel Story
                </h3>
                
                <div className="space-y-6">
                  {/* Story Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Story Title
                    </label>
                    <input
                      type="text"
                      value={newStory.title}
                      onChange={(e) => setNewStory(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter an engaging title for your story..."
                      className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Story Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newStory.location}
                      onChange={(e) => setNewStory(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Where did this adventure take place?"
                      className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Story Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Story
                    </label>
                    <textarea
                      value={newStory.content}
                      onChange={(e) => setNewStory(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Tell us about your amazing travel experience..."
                      rows={6}
                      className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags (Optional)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {['Adventure', 'Culture', 'Food', 'Photography', 'Nature', 'City', 'Beach', 'Mountains'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setNewStory(prev => ({
                              ...prev,
                              tags: prev.tags.includes(tag) 
                                ? prev.tags.filter(t => t !== tag)
                                : [...prev.tags, tag]
                            }));
                          }}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            newStory.tags.includes(tag)
                              ? 'bg-orange-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => {
                        // Simulate story submission
                        showNotification('Story submitted successfully! 🎉');
                        setShowCreateStoryModal(false);
                        setNewStory({ title: '', content: '', location: '', tags: [] });
                      }}
                      disabled={!newStory.title || !newStory.content || !newStory.location}
                      className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                        !newStory.title || !newStory.content || !newStory.location
                          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 transform hover:scale-105 shadow-lg'
                      }`}
                    >
                      <FaStar />
                      Share Story
                    </button>
                    
                    <button
                      onClick={() => setShowCreateStoryModal(false)}
                      className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-colors z-40"
            >
              <FaArrowUp />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StoriesPage;
