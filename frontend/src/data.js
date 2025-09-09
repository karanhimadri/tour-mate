const homeyHutsCategories = [
  "Featured",
  "Mountain View",
  "Villa",
  "Resort",
  "Private Pool",
  "Family Friendly",
  "Beach House",
  "Ocean Front",
  "Lake Front",
  "Countryside Views"
];

const homeyHutsListings = [
  {
    id: 1,
    name: "Jungle Kinare – Sound of Nature",
    location: "Sunderkhal Mukteshwar, Uttarakhand",
    guests: 8,
    bedrooms: 3,
    rating: 5.0,
    reviews: 6,
    originalPrice: 6080,
    currentPrice: 4256,
    totalPrice: 4766.72,
    imageUrl: "https://images.unsplash.com/photo-1587061949404-d4fb1c81efbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Featured", "Mountain View"],
    host: "Priya Sharma",
    amenities: ["WiFi", "Kitchen", "Parking", "Garden"]
  },
  {
    id: 2,
    name: "Blue Magpie – Experience in the Hills",
    location: "Satkhol, Mukteshwar, Uttarakhand",
    guests: 4,
    bedrooms: 1,
    rating: 5.0,
    reviews: 1,
    originalPrice: 6000,
    currentPrice: 4200,
    totalPrice: 4704,
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Featured", "Villa"],
    host: "Rajesh Kumar",
    amenities: ["WiFi", "Kitchen", "Fireplace", "Balcony"]
  },
  {
    id: 3,
    name: "Himalayan Dream Cove by the River",
    location: "Manali, Himachal Pradesh",
    guests: 12,
    bedrooms: 6,
    rating: 4.8,
    reviews: 9,
    originalPrice: 14231,
    currentPrice: 9961,
    totalPrice: 11753.98,
    imageUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Mountain View", "Resort"],
    host: "Anita Verma",
    amenities: ["WiFi", "Restaurant", "Spa", "River View"]
  },
  {
    id: 4,
    name: "Surfing Yogis – 1BR Luxe Cottage",
    location: "Balighai, Puri, Odisha",
    guests: 5,
    bedrooms: 1,
    rating: 4.9,
    reviews: 10,
    originalPrice: 15200,
    currentPrice: 10640,
    totalPrice: 12555.20,
    imageUrl: "https://homeyhuts-prod-assets.s3.ap-south-1.amazonaws.com/2518/image_0sohp_8_11_2025_6%3A42%3A03_AM.webp",
    tags: ["Beach House", "Featured"],
    host: "Suresh Patel",
    amenities: ["WiFi", "Beach Access", "Yoga Space", "Kitchen"]
  },
  {
    id: 5,
    name: "Royal Heritage Haveli",
    location: "Jaipur, Rajasthan",
    guests: 10,
    bedrooms: 4,
    rating: 4.7,
    reviews: 23,
    originalPrice: 8500,
    currentPrice: 6375,
    totalPrice: 7530,
    imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Villa", "Countryside Views"],
    host: "Maharaja Singh",
    amenities: ["WiFi", "Pool", "Garden", "Traditional Decor"]
  }
];

const experiences = [
  {
    id: 1,
    title: 'Traditional Pottery Workshop',
    host: 'Maya Sharma',
    duration: '2 hours',
    rating: 4.9,
    price: 30,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Arts & Crafts',
    location: 'Khurja, Uttar Pradesh',
    description: 'Learn the ancient art of pottery making with master craftsman Maya Sharma.'
  },
  {
    id: 2,
    title: 'Village Cooking Class',
    host: 'Raj Kumar',
    duration: '3 hours',
    rating: 4.8,
    price: 45,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Culinary',
    location: 'Pushkar, Rajasthan',
    description: 'Cook authentic Rajasthani dishes in a traditional village kitchen.'
  },
  {
    id: 3,
    title: 'Morning Yoga by the Ganges',
    host: 'Guru Ashwin',
    duration: '1.5 hours',
    rating: 4.9,
    price: 25,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Wellness',
    location: 'Rishikesh, Uttarakhand',
    description: 'Start your day with peaceful yoga session by the holy river Ganges.'
  },
  {
    id: 4,
    title: 'Spice Market Tour & Tasting',
    host: 'Deepika Merchant',
    duration: '2.5 hours',
    rating: 4.7,
    price: 35,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Culinary',
    location: 'Old Delhi, Delhi',
    description: 'Explore the vibrant spice markets and learn about Indian spices.'
  }
];

const stories = [
  {
    id: 1,
    author: 'Sarah Thompson',
    location: 'Himachal Pradesh, India',
    title: 'A Week in the Mountains',
    content: 'Spent an incredible week in a traditional mountain homestay, learning about local customs and enjoying breathtaking views. The host family treated me like their own daughter, teaching me to cook traditional dishes and sharing stories of their ancestors.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 234,
    comments: 45,
    date: '2 days ago',
    tags: ['Mountains', 'Culture', 'Family']
  },
  {
    id: 2,
    author: 'Marco Rodriguez',
    location: 'Kerala, India',
    title: 'Backwaters and Beyond',
    content: 'Kerala\'s backwaters offered a peaceful retreat from city life. Stayed in a traditional houseboat and experienced the local way of life. The coconut curry cooked by my host was unforgettable!',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 189,
    comments: 32,
    date: '5 days ago',
    tags: ['Kerala', 'Backwaters', 'Food']
  },
  {
    id: 3,
    author: 'Emma Chen',
    location: 'Rajasthan, India',
    title: 'Colors of Rajasthan',
    content: 'From the pink city of Jaipur to the blue city of Jodhpur, Rajasthan is a photographer\'s paradise. Each city has its own unique character and the people are incredibly welcoming.',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6dee2d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 156,
    comments: 28,
    date: '1 week ago',
    tags: ['Rajasthan', 'Photography', 'Architecture']
  }
];

const culturalPosts = [
  {
    id: 1,
    category: 'Language Tips',
    title: 'Essential Hindi Greetings',
    content: 'Learn these basic Hindi greetings to connect with locals: Namaste (Hello/Goodbye), Dhanyawad (Thank you), Kshama karein (Excuse me), Kya haal hai? (How are things?)',
    fullStory: 'Learn these essential Hindi greetings that will help you connect with locals during your travels across India. Hindi is spoken by over 500 million people and knowing these basic phrases will open doors and hearts wherever you go.\n\nNamaste - This is the most universal greeting, meaning both hello and goodbye. It comes from the Sanskrit words "nama" (bow) and "te" (to you), literally meaning "I bow to you."\n\nDhanyawad - Express gratitude with this formal thank you. In casual settings, you might also hear "shukriya."\n\nKshama karein - Use this to politely say excuse me or sorry when you need to pass through a crowd or if you accidentally bump into someone.\n\nKya haal hai? - This casual greeting means "how are things?" and is perfect for conversations with new friends.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 156,
    comments: 23,
    views: 2078,
    author: 'Linguistic Expert Team',
    date: '3 days ago',
    trending: false,
    difficulty: 'Advanced',
    location: {
      city: 'Mumbai',
      state: 'Delhi',
      latitude: 19.0760,
      longitude: 72.8777
    },
    tags: ['culture', 'heritage', 'traditional'],
    audio: 'hindi-greetings.mp3'
  },
  {
    id: 2,
    category: 'Food Stories',
    title: 'The Art of Making Masala Chai',
    content: 'Discover the secrets behind India\'s favorite beverage. Each region has its own variation - from the cardamom-rich Kashmir chai to the ginger-heavy Mumbai cutting.',
    fullStory: 'The art of making masala chai is a sacred ritual that varies from household to household across India. This beloved beverage is much more than just tea - it\'s a cultural institution that brings people together.\n\nThe perfect masala chai starts with quality black tea, usually CTC (Crush, Tear, Curl) tea that can withstand the robust spices. The magic lies in the spice blend - cardamom for warmth, ginger for heat, cinnamon for sweetness, and cloves for depth.\n\nIn Kashmir, the chai is delicate with green cardamom and almonds. Mumbai\'s cutting chai is strong and sweet, served in small glasses. South Indian chai often includes curry leaves and pepper for a unique twist.\n\nThe technique matters too - the tea must be boiled, not just steeped, allowing the milk, spices, and tea to create a harmonious blend that\'s both energizing and comforting.',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 234,
    comments: 45,
    views: 3802,
    author: 'Chef Ramesh',
    date: '1 week ago',
    trending: true,
    difficulty: 'Advanced',
    location: {
      city: 'Bangalore',
      state: 'Karnataka',
      latitude: 12.9716,
      longitude: 77.5946
    },
    tags: ['culture', 'heritage', 'traditional'],
    audio: 'masala-chai-story.mp3'
  },
  {
    id: 3,
    category: 'Regional Folklore',
    title: 'Legends of Rajasthan',
    content: 'Explore the fascinating tales behind Rajasthan\'s majestic forts. From the brave Rana Pratap to the legendary love story of Padmavati, each fort has stories to tell.',
    fullStory: 'Rajasthan\'s majestic forts are not just architectural marvels but repositories of incredible legends that have shaped Indian history and culture.\n\nThe tale of Maharana Pratap, the brave ruler of Mewar, and his legendary horse Chetak is one of courage against impossible odds. Despite facing the mighty Mughal army, Pratap never surrendered his principles, becoming a symbol of Rajput valor.\n\nThe story of Padmavati, the beautiful queen of Chittor, speaks of honor and sacrifice. When faced with the threat of capture by Alauddin Khilji, she and other royal women chose jauhar (self-immolation) over dishonor, a tale that resonates through the centuries.\n\nEach fort - from Jaisalmer\'s golden sandstone walls to Mehrangarh\'s imposing battlements - whispers stories of love, war, sacrifice, and honor that continue to inspire visitors from around the world.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 189,
    comments: 67,
    views: 1567,
    author: 'Heritage Guide Vikram',
    date: '4 days ago',
    trending: false,
    difficulty: 'Beginner',
    location: {
      city: 'Delhi',
      state: 'Tamil Nadu',
      latitude: 28.6139,
      longitude: 77.2090
    },
    tags: ['culture', 'heritage', 'traditional'],
    audio: 'rajasthan-legends.mp3'
  },
  {
    id: 4,
    category: 'Festivals',
    title: 'Celebrating Holi - Festival of Colors',
    content: 'Holi marks the arrival of spring and celebrates the triumph of good over evil. Learn about the traditions, foods, and regional variations of this joyous festival.',
    fullStory: 'Holi, the Festival of Colors, is one of India\'s most vibrant and joyous celebrations, marking the arrival of spring and the triumph of good over evil.\n\nThe festival has deep mythological roots, celebrating the love between Radha and Krishna, and the victory of devotee Prahlad over the demoness Holika. These stories remind us that love and devotion always prevail over hatred and evil.\n\nCelebrations begin with Holika Dahan on the night before, where communities gather around bonfires to burn effigies of Holika, symbolizing the destruction of evil. The next day, people take to the streets with gulal (colored powder) and colored water, smearing each other in a riot of colors.\n\nRegional variations add unique flavors - Mathura and Vrindavan celebrate with elaborate processions, while West Bengal\'s Dol Jatra includes cultural performances. The festival foods like gujiya, thandai, and puran poli add sweetness to the colorful celebrations.',
    image: 'https://images.unsplash.com/photo-1583339793403-3d9b001b6008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    likes: 298,
    comments: 89,
    views: 4521,
    author: 'Cultural Expert Priya',
    date: '2 days ago',
    trending: true,
    difficulty: 'Beginner',
    location: {
      city: 'Mathura',
      state: 'Uttar Pradesh',
      latitude: 27.4924,
      longitude: 77.6737
    },
    tags: ['culture', 'heritage', 'traditional', 'festivals'],
    audio: 'holi-celebration.mp3'
  }
];

const emergencyContacts = [
  { name: 'Police', number: '100', description: 'For any criminal activities or law and order issues' },
  { name: 'Ambulance', number: '102', description: 'Medical emergencies and health services' },
  { name: 'Fire', number: '101', description: 'Fire emergencies and rescue operations' },
  { name: 'Tourist Police', number: '1363', description: 'Tourist-specific issues and assistance' },
  { name: 'Women Helpline', number: '1091', description: 'Women safety and support services' },
  { name: 'Railway Enquiry', number: '139', description: 'Railway-related queries and assistance' },
  { name: 'Road Accident', number: '1073', description: 'Road accident emergency response' }
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', flag: '🇮🇳' }
];

const commonPhrases = [
  {
    id: 1,
    category: 'Greetings',
    phrases: [
      { english: "Hello, how are you?", hindi: "नमस्ते, आप कैसे हैं?", pronunciation: "Namaste, aap kaise hain?" },
      { english: "Good morning", hindi: "सुप्रभात", pronunciation: "Suprabhat" },
      { english: "Good evening", hindi: "शुभ संध्या", pronunciation: "Shubh sandhya" },
      { english: "Nice to meet you", hindi: "आपसे मिलकर खुशी हुई", pronunciation: "Aapse milkar khushi hui" }
    ]
  },
  {
    id: 2,
    category: 'Directions',
    phrases: [
      { english: "Where is the nearest market?", hindi: "निकटतम बाज़ार कहाँ है?", pronunciation: "Niktam bazaar kahan hai?" },
      { english: "How far is the station?", hindi: "स्टेशन कितनी दूर है?", pronunciation: "Station kitni door hai?" },
      { english: "Left", hindi: "बाएं", pronunciation: "Bayen" },
      { english: "Right", hindi: "दाएं", pronunciation: "Dayen" }
    ]
  },
  {
    id: 3,
    category: 'Food & Dining',
    phrases: [
      { english: "I'm vegetarian", hindi: "मैं शाकाहारी हूँ", pronunciation: "Main shakahari hun" },
      { english: "Can I have the menu?", hindi: "क्या मुझे मेनू मिल सकता है?", pronunciation: "Kya mujhe menu mil sakta hai?" },
      { english: "This is delicious", hindi: "यह बहुत स्वादिष्ट है", pronunciation: "Yeh bahut swadisht hai" },
      { english: "Water, please", hindi: "पानी, कृपया", pronunciation: "Paani, kripaya" }
    ]
  }
];

const MountainView = [
  {
    id: 1,
    title: "Jungle Kinare – Sound of nature - Mountain Views",
    location: "Sunderkhal Mukteshwar, Uttarakhand, India",
    images: [
      "https://homeyhuts-prod-assets.s3.ap-south-1.amazonaws.com/1099/image_kewok_9_28_2024_12%3A52%3A46_PM_656_450.webp",
      "https://homeyhuts-prod-assets.s3.ap-south-1.amazonaws.com/1099/image_4p43s_9_28_2024_12%3A55%3A09_PM_396_250.webp",
      "https://homeyhuts-prod-assets.s3.ap-south-1.amazonaws.com/1099/image_86e56_9_28_2024_12%3A58%3A37_PM_396_250.webp"
    ],
    homestay_capacity: {
      guests: 8,
      bedrooms: 3,
      beds: 3,
      bathrooms: 3
    },
    hosted_by: "Anshu",
    uniqueness: [
      "Mountain View", "Family Friendly", "Eco-Friendly", "Yoga/Meditation", "Countryside Views", "Peaceful Retreat"
    ],
    about: "Nestled in the peaceful hills of Mukteshwar, Jungle Kinare is a cozy 3-bedroom cottage surrounded by lush apple orchards. This charming retreat is an ideal escape for couples, families, and solo travelers seeking a break from the daily hustle.",
    offers: ["Wifi", "Free Parking On Premises", "Sound System", "Kitchen", "Fire Extinguisher", "Garden View"],
    actual_price: 8100,
    discounted_price: 5600,
    ratings: 5,
    reviews: ["Beautiful Property", "Cleanliness", "Nature View", "Good Neighbours"],
    total_reviews: 10,
    likes: 200,
    shares: 120,
    cancellation_policy: "Cancellation 14 Days Before Check-In: Guest can cancel within 14 days before check-in for a full refund. Cancellations within 14 days or no show will be non refundable.",
    hot_price: true
  },
  {
    id: 2,
    title: "Private Room in a House hosted by Vishikh",
    location: "Manali, Himachal Pradesh, India",
    images: [
      "https://homeyhuts-prod-assets.s3.ap-south-1.amazonaws.com/2560/image_528x2_8_13_2025_1%3A14%3A45_PM.webp",
      "https://homeyhuts-prod-assets.s3.ap-south-1.amazonaws.com/2560/image_0nvz8k_8_13_2025_1%3A14%3A46_PM.webp",
      "https://homeyhuts-prod-assets.s3.ap-south-1.amazonaws.com/2560/image_lubwi_8_13_2025_1%3A14%3A43_PM.webp",
      "https://homeyhuts-prod-assets.s3.ap-south-1.amazonaws.com/2560/image_y9jbv_8_13_2025_1%3A14%3A43_PM.webp",
      "https://homeyhuts-prod-assets.s3.ap-south-1.amazonaws.com/2560/image_1faqs_8_13_2025_1%3A14%3A45_PM.webp",
      "https://homeyhuts-prod-assets.s3.ap-south-1.amazonaws.com/2560/image_v1xpr_8_13_2025_1%3A14%3A47_PM.webp",
      "https://homeyhuts-prod-assets.s3.ap-south-1.amazonaws.com/2560/image_ac0jb_8_13_2025_1%3A14%3A47_PM.webp",
      "https://homeyhuts-prod-assets.s3.ap-south-1.amazonaws.com/2560/image_h4369f_8_13_2025_1%3A14%3A46_PM.webp"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    hosted_by: "Vishikh",
    uniqueness: [
      "Mountain View", "Family Friendly", "Eco-Friendly", "Yoga/Meditation", "Countryside Views", "Peaceful Retreat", "Surrounded by Nature"
    ],
    about: "Nestled in the peaceful hills of Manali, You'll wake up to mountain views, fresh air, variety of flora and fauna—and the chirping of birds. You'll also get a glimpse of real village life. It's a calm, refreshing experience that can't be explained in words—it has to be felt.",
    offers: ["Wifi", "Sound System", "Fire Extinguisher", "Garden View"],
    actual_price: 1120,
    discounted_price: 1120,
    ratings: 4,
    reviews: ["Beautiful Property", "Cleanliness", "Nature View", "Good Neighbours"],
    total_reviews: 10,
    likes: 150,
    shares: 100,
    cancellation_policy: "Cancellation 30 Days Before Check-In: Guest can cancel within 30 days before check-in for a full refund. Cancellations within 14 days will be non refundable.",
    hot_price: true
  },
  {
    id: 3,
    title: "Olive Grand View",
    location: "Shuru Rd, Olive Grand View, Gadherni, Manali, India, 175143",
    images: [
      "https://pix8.agoda.net/hotelImages/62525403/-1/ed77974851ecf274d42437a0fae00427.jpg?ce=0&s=1024x",
      "https://pix8.agoda.net/hotelImages/62525403/0/5486c742f100c7f802c03392cdcb7681.jpg?ce=0&s=1024x",
      "https://pix8.agoda.net/hotelImages/62525403/1176419841/d3718b8052f127ad636bdc63efd4dfcc.jpg?ce=2&s=1024x",
      "https://pix8.agoda.net/hotelImages/62525403/-1/bf3cb60bd21e720227b385ae37264c8c.jpg?ce=0&s=1024x",
      "https://pix8.agoda.net/hotelImages/62525403/1147717975/6213b222ee053f790ad1761bf1d547c3.jpg?ce=2&s=1024x",
      "https://pix8.agoda.net/hotelImages/62525403/-1/2f33655cbd8d94672d811f52053a61ef.jpg?ce=0&s=1024x"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    uniqueness: [
      "Room size: 240 m²/2583 ft²", "Mountain View", "1 King bed", "Free welcome drink", "Balcony/terrace", "Blackout curtains", "Exterior corridor", "Surrounded by Nature"
    ],
    about: "Get your trip off to a great start with a stay at this property, which offers free Wi-Fi in all rooms. Strategically situated in Gadherni, allowing you access and proximity to local attractions and sights. This 3-star property is packed with in-house facilities to improve the quality and joy of your stay",
    offers: ["Wifi", "Laundry service discount", "Parking", "Food & Beverage Discount 10%"],
    actual_price: 5000,
    discounted_price: 1877,
    ratings: 4.6,
    reviews: ["I had a fantastic stay..the room was spotless the staff were incredibly friendly,and food quality was excellent overall I highly recommend this hotel for your next travel adventure", "Very beautiful place, food quality all good,Staff are very corporative,", "Nature View", "Good place great view Room is very clean and nice balcony viewfood quality is excellent"],
    total_reviews: 205,
    likes: 350,
    shares: 200,
    cancellation_policy: "Non-refundable (Low price!).",
    hot_price: true
  },
  {
    id: 4,
    title: "White Mountain Hotel",
    location: "Kullu - Naggar - Manali Road, Aleo, 175131 Manāli",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/608059670.jpg?k=1fc93fb1c2bcdbbc82b4264200677a8b480054861767420265c23b3cf309c8d9&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/608059738.jpg?k=042cd23fb74828b574dc0e443e613818e9c9daea85d1b49a736042d2c4ffdbcd&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/608059752.jpg?k=81681b32de9ea59b9675b4f4eccb266c6c2f6f83950f7cb594918ea70e055ba7&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/608059661.jpg?k=0fc0e0841e80675e94bd5b1e3ea706bc011d1b27504fe3231686103db81d4789&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/608059680.jpg?k=fa5f006cbb343c611460d81fb2b67bf328b41341ba8ba59d0ff2bc80c4223e9f&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/608059700.jpg?k=7ddc05aa2fd8dbbedec831d5e560d664136b0df6f50b36bf75089d90ac041dc9&o="
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    uniqueness: [
      "Room size: 16 m²", "Mountain View", "1 queen bed", "Bathtub", "Balcony/terrace", "Garden view", "Surrounded by Nature"
    ],
    about: "Relaxed hotel featuring unfussy rooms, some with balconies & mountain views, plus a lounge & dining.",
    offers: ["Wifi", "Breakfast", "Parking"],
    food_and_drink: ["Restaurant", "Buffet dinner", "Room service", "Breakfast"],
    actual_price: 1800,
    discounted_price: 800,
    payments: ["NFC mobile payments", "cash", "No credit cards"],
    ratings: 4.4,
    reviews: ["Excellent Stay at Hotel White Mountain!", "White Mountain Hotels is highly appreciated for its scenic location, warm hospitality, clean rooms, and comfortable stay. A perfect retreat for travelers seeking peace and nature.", "Nature View", "Hotel location is good food is very testy room is old style but amanities is modern style near and clean room all most all are budget friendly highly recomoded hotel white mountain"],
    total_reviews: 829,
    likes: 400,
    shares: 250,
    cancellation_policy: "NO prepayment needed",
    hot_price: true
  },
  {
    id: 5,
    title: "Manali Mountain Regency-best luxury hotels /Family Hotels in manali",
    location: "Sajjanu Villa Rangri, Bus Stand, NH 3, near Volvo, Simsa, Manali, Himachal Pradesh 175131",
    images: [
      "https://maps.app.goo.gl/cYY8SrHcTRUAU5YYA?g_st=ac",
      "https://maps.app.goo.gl/cYY8SrHcTRUAU5YYA?g_st=ac",
      "https://r1imghtlak.mmtcdn.com/a1c17f80747a11ed888c0a58a9feac02.jpg",
      "https://maps.app.goo.gl/3G3Y9i7VNxfQYo7j6?g_st=ac"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    uniqueness: [
      "132 sq.ft (12 sq.mt)", "Mountain View", "1 double bed", "Garden view", "Surrounded by Nature"
    ],
    about: "Executives Rooms are beautifully designed best suited for family and couple. All executive rooms have modernized infrastructure with wooden flooring,basic toiletries, led tv, slippers, hot and cold water, fresh towels, tea and cofee maker, hair dryer, comfortable mattress attached washrooms to ensure that guest should have comfortable stay.",
    offers: ["Wifi", "Free Breakfast", "Free Lunch Or Dinner", "welcome drinks"],
    food_and_drink: ["In-room Dining", "Smoking Room", "Room service", "Mineral Water"],
    actual_price: 2200,
    discounted_price: 1538,
    payments: ["NFC mobile payments", "cash"],
    ratings: 4.4,
    reviews: ["The taste of food was very delicious and they also maintained hygiene system. There service was very quick. The behavior of there staff were very good and respectful toward us. There room was clean. The view from here was giving goosebumps to me as well as to my relatives. The hotel was also giving us as luxurious.", "Good spacious rooms, Cleanliness and hygiene has been maintained in the hotel.Staff and owner is very humble.Reasonable prices, Hotel food is also good.", "Nature View", "Very comfortable and nice rooms. Very hospitable staff, and service is very good. Good experience"],
    total_reviews: 611,
    likes: 200,
    shares: 50,
    cancellation_policy: "NO prepayment needed",
    hot_price: true
  },
  {
    id: 6,
    title: "The Mountain Child Stay",
    location: "Shuru Manali Himachal Pradesh, Dhungiri Village, Manali, India, 175131",
    images: [
      "https://r1imghtlak.mmtcdn.com/aedea1c4-72a9-491d-a780-13cccf16ca02.jpg",
      "https://r1imghtlak.mmtcdn.com/374c2ccb-bd7e-4dbe-909c-8ee9be7e461b.jpg",
      "https://r1imghtlak.mmtcdn.com/e882a7cc-bfd7-4299-b909-005081960539.jpg",
      "https://r1imghtlak.mmtcdn.com/32ffbbe9-59ac-431f-8c91-a48c9af96ece.jpg",
      "https://maps.app.goo.gl/wECWixzRQTQn1A6v6?g_st=ac"
    ],
    homestay_capacity: {
      guests: 3,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1
    },
    hosted_by: "Kavita",
    uniqueness: [
      "132 sq.ft (12 sq.mt)", "Caretaker", "Mountain View", "1 double bed", "1 Single bed", "Kitchenette", "Surrounded by Nature"
    ],
    about: "Escape to the heart of the Himalayas with our unique homestay in Manali, where tradition meets comfort, and sustainability is a way of life. Discover the perfect blend of a traditional mountain house, authentic local cuisine, and thrilling adventure activities amidst the stunning landscapes of Manali.",
    offers: ["Wifi", "Gym", "Outdoor Sports", "Free Breakfast", "Free Lunch Or Dinner", "welcome drinks"],
    food_and_drink: ["Cuisines: North Indian, South Indian, Chinese, Continental & Local", "Only veg meals will be served by the property", "Food Delivery available from Local restaurants", "Room service", "Breakfast, Lunch, Evening Snacks & Dinner"],
    actual_price: 2850,
    discounted_price: 2213,
    payments: ["NFC mobile payments", "cash", "Debit Cards"],
    ratings: 5,
    reviews: ["We had a wonderful stay! The host was incredibly warm and welcoming, and the staff were just as friendly—it truly felt like a home away from home. The food was delicious, the place was spotless, and the comfort level was top-notch. I traveled with my partner and parents, and the host thoughtfully created customized itineraries based on everyone's pace and preferences. She was also very accommodating with last-minute changes. My parents connected so well with the staff, which made the experience even more special. Highly recommended for nature lovers—whether you're looking to relax in peace or go hiking and then unwind, this homestay is the perfect place to return to. Wish I could give it more than five stars!", "My first solo trip after years, and it couldn't have been more magical! Even if I had imagined the perfect getaway, it wouldn't come close to the magic of my stay at Kavita's Mountain Child Homestay.From the warm coordination to the cozy comforts, soul-nourishing food, thoughtful pampering, and breathtaking treks — every moment felt incredibly special. Kavita herself is such a gem — genuinely kind and a wonderful host.", "Nature View"],
    total_reviews: 46,
    likes: 20,
    shares: 5,
    cancellation_policy: "Non-Refundable",
    hot_price: true
  },
  {
    id: 7,
    title: "Afsana Homestay Manali",
    location: "Chhiyal, near Hadimba Mata Temple, Village Dhungri, Manali, Himachal Pradesh 175131",
    images: [
      "https://maps.app.goo.gl/BgMC2fsHM2h4bZSs9",
      "https://maps.app.goo.gl/1sQYN51oPRJh6TqU6",
      "https://maps.app.goo.gl/gcPYknjMzA4QgJJF7",
      "https://maps.app.goo.gl/avvS7W31dcGL7Jme6",
      "https://maps.app.goo.gl/MBud4CFfqGf3XuCF6"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    uniqueness: [
      "Caretaker", "Mountain View", "1 double bed", "Surrounded by Nature"
    ],
    about: "Afsana Homestay is lovely place to stay away from Manali crowd and still you enjoy Manali.It's a great place to stay with Family and Friends with Good Food and Service",
    offers: ["Free Lunch Or Dinner", "welcome drinks"],
    food_and_drink: ["Lovely Food"],
    actual_price: 1500,
    discounted_price: 1000,
    contact: "7876371558",
    payments: ["NFC mobile payments", "cash", "Debit Cards"],
    ratings: 4.8,
    reviews: ["I had such a wonderful stay at Afsana Homestay. The place is tucked away from the noise, offering the kind of peace that's hard to find these days. The environment is serene, the views are beautiful, and the entire space feels like a calm retreat — perfect for unwinding or even working remotely.One of the highlights was definitely the food — simple, home-cooked, and delicious. It felt like comfort on a plate, just what you'd crave in the mountains", "Afsana Homestay in Manali is an absolute gem! From the moment you arrive, you're welcomed with warmth and genuine hospitality. The rooms are cozy, clean, and beautifully maintained, offering stunning views of the surrounding mountains. The hosts go above and beyond to make you feel at home, always ready with a smile and helpful tips about local spots.Whether you're seeking peace, scenic beauty, or a personal touch in your travels, Afsana Homestay is the perfect retreat in Manali. Highly recommended for a memorable experience! Thanks to host heena,, she's beautiful and calm as well as afsana 😍😍", "Nature View"],
    total_reviews: 124,
    likes: 60,
    shares: 55,
    cancellation_policy: "Non-Refundable",
    hot_price: true
  },
  {
    id: 8,
    title: "Getaway Stays Manali | River-view Rooms",
    location: "Club house road,old Manali, Old Manali, Manali, India, 175131",
    images: [
      "https://r1imghtlak.mmtcdn.com/c6f25c3452b011edb7180a58a9feac02.jpg?&output-quality=75&crop=520:350;81,0&output-format=jpg&downsize=540:*",
      "https://r1imghtlak.mmtcdn.com/25250c16a0d811eba8210242ac110002.jpg",
      "https://r1imghtlak.mmtcdn.com/3e9d38a485a111ecab070a58a9feac02.jpg",
      "https://r1imghtlak.mmtcdn.com/bb6cb206a0d711eb9d800242ac110004.jpg",
      "https://r1imghtlak.mmtcdn.com/bb6cb206a0d711eb9d800242ac110004.jpg"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    hosted_by: "Ankita",
    uniqueness: [
      "Shared Kitchen", "Lounge (Private)", "Caretaker", "Seating Area", "Indoor Games (Board Games)", "Fireplace", "Verandah", "Luggage Assistance", "Bonfire (Paid)", "Lawn", "Power Backup", "Dining Area", "Free Wi-Fi"
    ],
    about: "Strategically situated in Old Manali , allowing you access and proximity to local attractions and sights . Don't leave before paying a visit to the famous cafe 1986 .",
    offers: ["Paid Bus Station Transfers", "Paid Railway Transfers", "Indoor Games (Board Games)"],
    food_and_drink: ["Cooking Basics", "Kid's Menu"],
    actual_price: 2400,
    discounted_price: 2198,
    contact: "8894933062",
    payments: ["NFC mobile payments", "cash", "Debit Cards"],
    ratings: 4.5,
    reviews: ["Location- forest and vyas river view from balcony and snow clad mountains from backyard.facilities,view, staff,vibes", "One of the best Rooms we stayed in India, big, very pretty, bathroom is amazing and the balcony to the river, awesome", "Clean, well maintained and comfortable"],
    total_reviews: 169,
    likes: 60,
    shares: 45,
    cancellation_policy: "Free cancellation",
    hot_price: true
  },
  {
    id: 9,
    title: "Kropha HomeStay Manali",
    location: "Bus Stand, near Volvo, Village Siyal, Manali, Himachal Pradesh 175131",
    images: [
      "https://itin-dev.wanderlogstatic.com/freeImage/kZRtRr67iqi5acs8r14BKENSTo3FsZD7",
      "https://itin-dev.wanderlogstatic.com/freeImage/TjFv4M08Y67mzobYW4fV6Ld0KTbV3mw7",
      "https://itin-dev.wanderlogstatic.com/freeImage/gJqq7wceCYsu1NhzqZ1WuXslWJKy7S4x"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    uniqueness: [
      "132 sq.ft (12 sq.mt)", "Mountain View", "1 double bed", "Garden view", "Surrounded by Nature"
    ],
    about: "Kropha HomeStay in Manali is a top choice for travelers, located just 900 meters from Mall Road. Guests can enjoy free access to the vegetable garden and apple trees on the property. Each room comes with its own kitchen and washroom, while small tents are also available outside. The host, Dinesh Kropha, and his family provide warm and genuine hospitality that makes guests feel at home.",
    offers: ["Free Breakfast", "Free Lunch Or Dinner", "welcome drinks"],
    food_and_drink: ["In-room Dining", "Room service", "Mineral Water", "Breakfast", "Dinner"],
    actual_price: 2000,
    discounted_price: 1538,
    payments: ["NFC mobile payments", "cash"],
    ratings: 4.9,
    reviews: ["It was a wonderful stay at Kropha homestay. We enjoyed ourselves a lot in the lush green apple garden. The owner of the property is very helpful in all manners. I highly recommend this homestay.", "The place is very beautiful and calming with serene views. Was a completely different experience to spend time in such wonderful place, while enjoying the trip with my friends, also very affordable. Would definitely recommend it.", "Nature View", "Very comfortable and nice rooms. Very hospitable staff, and service is very good. Good experience", "Good Apple Garden"],
    total_reviews: 322,
    likes: 250,
    shares: 70,
    cancellation_policy: "NO prepayment needed",
    hot_price: true
  },
  {
    id: 10,
    title: "Nature Valley Home Stay",
    location: "754M+57X, near Clubhouse, Old Manali, Manali, Himachal Pradesh 175131",
    images: [
      "https://maps.app.goo.gl/wUr385RpRvYevnWx8",
      "https://maps.app.goo.gl/TVdQVbWmUjP8SbCw5",
      "https://maps.app.goo.gl/ZZYzrsY5hfHPGqsY6",
      "https://maps.app.goo.gl/JZXaWF6WNXYgTfMm6",
      "https://maps.app.goo.gl/M73kT8dfRt56YqmJ7",
      "https://maps.app.goo.gl/78cxREz4rkvLJP7v8",
      "https://maps.app.goo.gl/9wpW56A8H1aB9sXy6"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    uniqueness: [
      "132 sq.ft (12 sq.mt)", "Mountain View", "1 double bed", "Garden view", "Surrounded by Nature"
    ],
    about: "Nature Valley Home Stay located at the Old Manali , India's most famous tourist hill station Manali (H.P.), is the best option for those who want to experience the exotic beauty. If you are planing to visit Manali, book our accommodation to make your trip greatly comfortable, safe and memorable. There are countless tourist resorts in Manali, but our home stay known for its stunning glory.",
    offers: ["Free Breakfast", "Free Lunch Or Dinner", "welcome drinks"],
    food_and_drink: ["In-room Dining", "Room service", "Mineral Water", "Breakfast", "Dinner"],
    actual_price: 2000,
    discounted_price: 1538,
    payments: ["NFC mobile payments", "cash"],
    ratings: 4.8,
    reviews: ["We had a wonderful stay at this peaceful homestay. The serene surroundings and cozy ambiance made it perfect for relaxation. The owner was incredibly kind and welcoming, ensuring every need was met. It truly felt like a home away from home. Highly recommended for a calm and rejuvenating getaway!", "Nature View", "It was quite a walk from the main road but it was compensated by great view of the hills and whole city. It was a very peaceful location and one can easily stay for a long time without any disturbance. There is only one suggestion for the owner to keep room heaters as it gets quite cold at night and during the day as well in winters 🥶."],
    total_reviews: 322,
    likes: 250,
    shares: 70,
    phone: "7807842483",
    cancellation_policy: "NO prepayment needed",
    hot_price: true
  },
  {
    id: 11,
    title: "Mountain Guest House",
    location: "Mountain Guest House, VPO, Old Manali, Manali, Himachal Pradesh 175131",
    images: [
      "https://maps.app.goo.gl/q2ha1L4AcTUytdcQ6",
      "https://maps.app.goo.gl/66zf6Efcrg447LRf8",
      "https://maps.app.goo.gl/dJ6yJjVJZ7PkJ6mS6",
      "https://maps.app.goo.gl/GUnMqp5Cg8kqfyX16",
      "https://maps.app.goo.gl/4gRojEtRnBS8XMru9",
      "https://maps.app.goo.gl/BFCynkwhJR7khMxC7",
      "https://maps.app.goo.gl/mEmt8GrCe7eUW6ob6"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    hosted_by: "Sudheesh",
    uniqueness: [
      "Laundry Service", "Mountain View", "1 double bed", "Garden view", "Surrounded by Nature"
    ],
    about: "Private access to a Bedroom & Bathroom, shared access to Living room, Kitchen & other common spaces with fellow guests",
    offers: ["Free Wi-Fi", "Luggage Assistance", "Room Service", "Laundry Service"],
    food_and_drink: ["Meals offered: Breakfast, Dinner", "You can choose from veg & non-veg meals", "Cuisines available: North Indian"],
    actual_price: 1450,
    discounted_price: 1368,
    payments: ["NFC mobile payments", "cash"],
    ratings: 4.8,
    reviews: ["The secure and safe environment of this hotel will always have my heart. I have recommended that others visit ( Mountain guest house old Manali )once, and I can assure you that they will never regret it.", "Nature View", "Perfect place to stay! Close to the main street, quiet and with great view to the mountains, really close to the river. The rooms are clean, well maintained and in good price. Most importantly, the hosting family is really sweet, they cook really delicious breakfast and dinner and are so nice to talk to! They made our stay in Manali so great and helped us with anything we needed"],
    total_reviews: 54,
    likes: 15,
    shares: 5,
    phone: "9882891295",
    cancellation_policy: "Non-Refundable",
    hot_price: true
  },
  {
    id: 12,
    title: "Sarkars - Manali Homestay",
    location: "Shankh Narayan Temple, near 4Play Media & Communications, Nasogi, Manali, Himachal Pradesh 175131",
    images: [
      "https://maps.app.goo.gl/HHuui4AgKtm5qNGt9",
      "https://maps.app.goo.gl/Mnnru8AY5R2eXySM7",
      "https://maps.app.goo.gl/ayoS8rqY7Y4aySpHA",
      "https://maps.app.goo.gl/xniJaDEQ8Vbmsogv6",
      "https://maps.app.goo.gl/GNZkeodsBzbY5Yrs5",
      "https://maps.app.goo.gl/iVwU1Ku3JMeM4Nx67",
      "https://maps.app.goo.gl/eNi8LGFoZMDPLa4R9"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    uniqueness: [
      "washing machine", "Mountain View", "1 double bed", "Garden view", "Surrounded by Nature"
    ],
    about: "Private access to a Bedroom & Bathroom, shared access to Living room, Kitchen & other common spaces with fellow guests",
    offers: ["Free Wi-Fi", "Kitchen", "Room Service", "Amenities"],
    food_and_drink: ["Meals offered: Breakfast, Dinner", "You can choose from veg & non-veg meals"],
    actual_price: 1450,
    discounted_price: 1368,
    payments: ["NFC mobile payments", "cash"],
    ratings: 4.8,
    reviews: ["Home away from home hence they say Second home ! Absolutely stunning views with hygienic kitchen equipped with all the essentials , perfect for solo or couple stay.", "Nature View", "Location is very calm and peaceful. I had stayed for 2 weeks here. Host is very friendly, if anything will help you out. Rooms are also spacious for cooking working and resting. I loved my stay here. Would recommend highly"],
    total_reviews: 56,
    likes: 25,
    shares: 10,
    phone: "9845587236",
    cancellation_policy: "Non-Refundable",
    hot_price: true
  },
  {
    id: 13,
    title: "Kartik mountain View Cottage - A Hidden Gem - Best Selling Property in Manali",
    location: "vashisht road, manali, himachal pradesh, india, 175131 Manāli",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/623204829.jpg?k=afcc2e8f3ea89261ff8efc53fbaf5877f1c4890ff8eedcb75a701ff9025aaf7a&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/623204805.jpg?k=1d0289fed2be6aab2baeaf84389f0f68cac7750e33109a9ba1b30e89a8f571f4&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/623204834.jpg?k=e7eea1393bbc887c5faba9f7d7f4cba00ba030fd66511d07b797b738b59258aa&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/623204838.jpg?k=15e007c3bf55b076228038b8a790865bcf5117a36c6284b9a03e4bff09ae43d7&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/623204830.jpg?k=9ae44ff1d29dec4eb12e0d21dae4f4a738740824f6a51bb675c1360c4e7aa7c1&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/623204843.jpg?k=7faa93e910a0eaa61b95624a3962be892a9d55dbe370cc3da0e29294143c40c6&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/623204825.jpg?k=88c89e23a194c43b0a4652d6ffd187837268d9f4b3bbe79fb54812a69903a7d3&o="
    ],
    homestay_capacity: {
      guests: 3,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1
    },
    uniqueness: [
      "Queen Room with Balcony", "Mountain View", "1 double bed", "129 m²", "Terrace", "Private bathroom"
    ],
    about: "Kartik Mountain View Cottage in Manali offers a 4-star hotel experience with a garden, terrace, restaurant, and free WiFi. Family rooms and a 24-hour front desk ensure comfort and convenience.",
    offers: ["Free toiletries", "Free Wi-Fi", "Airport shuttle (free)", "Free parking", "Non-smoking rooms", "Family rooms", "Breakfast"],
    food_and_drink: ["Meals offered: Breakfast, Dinner", "You can choose from veg & non-veg meals"],
    actual_price: 2050,
    discounted_price: 1588,
    payments: ["NFC mobile payments", "cash"],
    ratings: 4.8,
    reviews: ["Room 201, with balcony, incredible view. Very clean and comfortable. European level. All staff very friendly and professional. Highly recommended!", "Nature View", "best view from balcony room 205-206 ask property manager to reserve room beside reception office food was costly other wise best hotel in manali", "The View is pretty good from property,food is good and they also have parking facilities."],
    total_reviews: 202,
    likes: 100,
    shares: 54,
    cancellation_policy: "Free cancellation anytime",
    hot_price: true
  },
  {
    id: 14,
    title: "Mountain View Cottage",
    location: "Kanyal Rd, Simsa Village, Manali, Nasogi, Himachal Pradesh 175131",
    images: [
      "https://maps.app.goo.gl/37jh81m54NYm5daU8",
      "https://maps.app.goo.gl/2XsJMX1LUR52pYd88",
      "https://maps.app.goo.gl/g6NffGQ1Mntim7p17",
      "https://maps.app.goo.gl/p7gAYV1XW2M4Cbo49",
      "https://maps.app.goo.gl/AVvc5QkQ8HzmcgKaA"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    hosted_by: "pardeep",
    uniqueness: [
      "Breakfast", "Mountain View", "1 double bed", "Garden view", "Surrounded by Nature"
    ],
    about: "Private access to a Bedroom & Bathroom, shared access to Living room, Kitchen & other common spaces with fellow guests",
    offers: ["Free Wi-Fi", "Kitchen", "Room Service", "Amenities"],
    food_and_drink: ["Meals offered: Breakfast, Dinner", "You can choose from veg & non-veg meals"],
    actual_price: 1550,
    discounted_price: 1250,
    payments: ["NFC mobile payments", "cash"],
    ratings: 4.2,
    reviews: ["Staying at this hotel was an absolute pleasure. The room was immaculate, with modern amenities and a stunning view. The staff were incredibly helpful and attentive.", "Fantastic experience! The rooms were comfortable, and the staff was incredibly welcoming. Great value for money.", "Overall experience was very bad. No power back-up. Electricity cut for 10 hours straight. No inverter / generator even for mobile charging. Lazy staff. Food is just ok. Money-waste. I stayed in this cottage for 2D + 1N. Not even a single person was happy who was staying there."],
    total_reviews: 309,
    likes: 130,
    shares: 25,
    cancellation_policy: "Non-Refundable",
    hot_price: true
  },
  {
    id: 15,
    title: "Paradise Escape Homestay Manali",
    location: "near post office, Prini, Manali, Himachal Pradesh 175143",
    images: [
      "https://maps.app.goo.gl/HYsyXZaM3SXoq1vN9",
      "https://maps.app.goo.gl/9n4gihhQXoHYouGn6",
      "https://maps.app.goo.gl/aGmiaYydBZ55XxkS9",
      "https://maps.app.goo.gl/JrRkfRyuj1qaZfjx7",
      "https://maps.app.goo.gl/NB2hJB6pHJeW4qcP8",
      "https://maps.app.goo.gl/jkJ3fadqPPoVWjzv8",
      "https://maps.app.goo.gl/es3fVZYPkmoz631NA"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    hosted_by: "Abhishek",
    uniqueness: [
      "Free Wi-Fi", "Breakfast", "Kitchen in all rooms", "Room service", "Pet-friendly"
    ],
    about: "Beautiful, neat and clean rooms with exotic views, surrounded by apple orchards. Feel like home while staying with us. We have gated parking, and there is walk for 5min to property from parking. Common sitting area outdoor, High speed Wifi coverage all area, homecooked meals. we also provide for long and short stays, if you want a peaceful environment must visit once and give us oppurtunity to host and feel like home in mountains.",
    offers: ["Kitchenette", "Free Parking (Free - Onsite)", "Housekeeping", "Free Wi-Fi"],
    food_and_drink: ["Meals Offered: Breakfast, Lunch, Evening Snacks & Dinner", "Cuisines: North Indian, Continental & Local", "Cooking Guidelines: You can cook vegetarian meals at the property", "₹150 per person/meal", "Outside food is not allowed"],
    rules: ["Check-in: 12 PM", "Check-out: 12 PM", "Primary Guest should be atleast 18 years of age.", "Passport, Aadhaar, Driving License and Govt. ID are accepted as ID proof(s)", "Outside food is not allowed"],
    actual_price: 1000,
    discounted_price: 908,
    payments: ["NFC mobile payments", "cash", "Debit card"],
    ratings: 4.2,
    reviews: ["Fantastic stay with a homely touch! The rooms were clean and comfortable, and the Aman(Owner) was warm and attentive. Both breakfast and dinner were delicious, offering a delightful home-style taste. Highly recommended for a peaceful and satisfying experience.", "So basically I just want to tell you they are rude, greedy people, please dont visit, there are multiple other options out there with good behaviour and kind people", "I recently stayed here and was blown away by the stunning views, spotless cleanliness, delicious homemade food, and outstanding hospitality. They will treat you like their own family and you will feel that. Highly recommended for a perfect getaway!"],
    total_reviews: 78,
    likes: 20,
    shares: 5,
    phone: "9805155635",
    cancellation_policy: "Non-Refundable",
    hot_price: true
  },
  {
    id: 16,
    title: "Seraj Home Stay Manali",
    location: "Aleo, Manali, Himachal Pradesh 175131",
    images: [
      "https://maps.app.goo.gl/78SnZ4UMjnAHGEoX6",
      "https://maps.app.goo.gl/VXwRMavymhibzjHL8",
      "https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/bgdefault_bg.jpg",
      "https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/bgdefault_bg.jpg",
      "https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/bgdefault_bg.jpg",
      "https://r1imghtlak.mmtcdn.com/176667c4f25f11e4b840daf4768ad8d9.jfif",
      "https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/bgdefault_bg.jpg"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    hosted_by: "Apple Group",
    uniqueness: [
      "Free Wi-Fi", "Barbeque", "Bonfire", "Lawn", "Fireplace"
    ],
    about: "The hotel ensures you are well taken care of during your stay.provides warm hospitality and all the necessary facilities for a relaxed stay. The rooms are decent, well-maintained and offer pleasant atmosphere. It provides a colour TV, cosy bed, attached bathroom and many more comforts. Surrounded by greenery, the cottage is a perfect place to enjoy a relaxing holiday. Room service will be provided whenever required. Relax and unwind amidst peaceful ambience and tranquil atmosphere.",
    offers: ["Caretaker", "Luggage Storage", "Multilingual Staff", "Free Wi-Fi"],
    food_and_drink: ["Barbeque", " Lunch, Evening Snacks & Dinner", "Dining Area"],
    rules: ["Check-in: 2:00 pm", "Check-out: 12 PM", "Primary Guest should be atleast 18 years of age.", "Passport, Aadhar, Driving License and Govt. ID are accepted as ID proof(s)", "Unmarried couples are not allowed", "Pets are not allowed", "Smoking within the premises is not allowed"],
    actual_price: 1000,
    discounted_price: 908,
    payments: ["NFC mobile payments", "cash", "Debit card"],
    ratings: 5,
    reviews: ["Seraj home stay Manali is the best home stay in manali kullu hp north india .", "Seraj home stay manali is most beautiful and wonderful place to stay during holidays in manali .We are really very happy to stay here .", "Excellent home stay in Manali Highly recommended ."],
    total_reviews: 115,
    likes: 40,
    shares: 15,
    phone: "9805155635",
    cancellation_policy: "Non-Refundable",
    hot_price: true
  },
  {
    id: 17,
    title: "Orchards House - The Hidden Tribe",
    location: "Old Manali, Manali, Himachal Pradesh 175131",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/164724950.jpg?k=d5b8bbb87bcc555ad36a5a3d28884c4af7fc18ba0aacc900114ececcbf3be916&o=",
      "https://maps.app.goo.gl/88VoEYaJFZU264rJ6",
      "https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/bgdefault_bg.jpg",
      "https://r1imghtlak.mmtcdn.com/5f095e04d61411e9ad1e0242ac110005.jpg",
      "https://r1imghtlak.mmtcdn.com/5f095e04d61411e9ad1e0242ac110005.jpg",
      "https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/bgdefault_bg.jpg",
      "https://r1imghtlak.mmtcdn.com/5f095e04d61411e9ad1e0242ac110005.jpg"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1
    },
    hosted_by: "Varun",
    host_experience: "Varun is all set to welcome you. He has been hosting since 2016. A people person at heart, Varun enjoys the company of people and exchanging stories with them. Besides hosting, he loves travelling. His outgoing nature and passion for travel spurred the idea of starting a business venture in the hospitality space. Hosting seemed just right! He is an entrepreneur. He successfully runs his family business, besides being a full-time host. Interaction With Guests: Though Varun is physically not present at the property, he is always a phone call away for his guests.",
    uniqueness: [
      "Free Wi-Fi", "Kitchenette", "Bonfire", "Paid Public Parking", "Fireplace", "20 m²"
    ],
    about: "If you have been waiting for a getaway in the mountains and can't decide on a place, this can come as a pleasant surprise.",
    offers: ["Caretaker", "Luggage Storage", "Multilingual Staff", "Free Wi-Fi", "Doctor on Call"],
    food_and_drink: ["Barbeque", " Lunch, Evening Snacks & Dinner", "Cafe (Limited Hours)", "Breakfast ₹ 150"],
    rules: ["Check-in: 1:00 pm", "Check-out: 11 AM", "Primary Guest should be atleast 18 years of age.", "Passport, Aadhar, Driving License and Govt. ID are accepted as ID proof(s)", "Outside food is not allowed", "Pets are allowed", "Extra charges for pets: INR 2000 Per Day", "Smoking Allowed. Early Check-In and Check-Out subject to availability."],
    actual_price: 1500,
    discounted_price: 1452,
    payments: ["NFC mobile payments", "cash", "Debit card"],
    ratings: 4.6,
    reviews: ["It was a pleasant stay located amid-st orchard farms and gardens distancing itself from the hustle bustle of the main manali. The duvet/blanket was suprisingly more than warm enough making me sweat in november. Of course, a very helpful and informative manager and staff.", "Not good stay at all. booked 2 rooms in bed dormitory but got 2 beds in 2 different rooms. Didn't liked the property.", "It was a very pleasant stay at reasonable price with parking space and amble common room space. The location is also easily accessible from old manali road."],
    total_reviews: 741,
    likes: 250,
    shares: 115,
    phone: "9873599432",
    cancellation_policy: "Free cancellation anytime",
    hot_price: true
  },
  {
    id: 18,
    title: "Village House - A Perfect Home Stay",
    location: "near Hotel Mountain Top, Dhungri Village, Manali, Himachal Pradesh 175131",
    images: [
      "https://r1imghtlak.mmtcdn.com/d873a3fee27f11e9819d0242ac110002.jpg",
      "https://r1imghtlak.mmtcdn.com/654e1d31-e406-4795-ae99-f32e6c250376.jpg",
      "https://r1imghtlak.mmtcdn.com/590873cee27f11e9b79f0242ac110002.jpg",
      "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201906271739238552-b556797c9f5d11ebba210242ac110004.jpg",
      "https://r1imghtlak.mmtcdn.com/b73edb9d-ed75-4aac-a8d3-b0904e9c95f9.jpg",
      "https://r1imghtlak.mmtcdn.com/0914291afcec11eb95f40a58a9feac02.jpg",
      "https://r1imghtlak.mmtcdn.com/59ac5200e27f11e98d5a0242ac110003.jpg"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1
    },
    hosted_by: "Swati",
    host_experience: "During your stay, you will be hosted by Swati. She has been hosting since 2018. Swati is lively and friendly by nature. Besides hosting, Swati likes travelling. She has always been passionate about donning an entrepreneur's hat. This led to the beginning of Swati's hosting journey. She also works as a teacher. Now, Swati enjoys hosting full-time and is committed to providing a great stay experience. Interaction With Guests: Although Swati does not stay at the property, she has employed a caretaker to take care of guest needs.",
    uniqueness: [
      "Free Wi-Fi", "Inside city center", "Room service [24-hour]", "Daily housekeeping", "Pets allowed", "20 m²"
    ],
    about: "Village House Manali in Manali offers family rooms with air-conditioning, balconies, and private bathrooms. Each room features mountain views, free toiletries, a shower, TV, and a dining area.",
    offers: ["Caretaker", "Luggage Storage", "Bonfire (Paid)", "Luggage Assistance", "Laundry Service (Paid)"],
    food_and_drink: ["Barbeque", " Restaurant (Kosher)", "Non-smoking rooms", "Breakfast ₹ 199 (optional)"],
    rules: ["Check-in: 12:00 pm", "Check-out: 11 AM", "Unmarried couples/guests with Local IDs are allowed.", "Primary Guest should be atleast 18 years of age.", "Passport, Aadhar, Driving License and Govt. ID are accepted as ID proof(s)", "Outside food is not allowed", "Pets are not allowed"],
    actual_price: 1650,
    discounted_price: 1297,
    payments: ["NFC mobile payments", "cash", "Debit card"],
    ratings: 4.5,
    reviews: ["I really appreciate the service of the hotel and the politeness of the staf I really appreciate the service of the hotel and the politeness of the staff .", "Great Place to stay. Nice Staff .", "property location is not as good as we want Rooms are clean and good receptionist behaviour is also good."],
    total_reviews: 206,
    likes: 70,
    shares: 25,
    phone: "7650888765",
    cancellation_policy: "Free cancellation anytime",
    hot_price: true
  },
  {
    id: 19,
    title: "Homestay Manali",
    location: "65FQ+H36, Kanyal Rd, Simsa Village, Manali, Himachal Pradesh 175131",
    images: [
      "https://maps.app.goo.gl/9DPCZLPspAgKZmDY7",
      "https://maps.app.goo.gl/yPzoa58m2QGGKY8WA",
      "https://maps.app.goo.gl/ZNeJYUjbdngdMqXC8",
      "https://maps.app.goo.gl/DB9ryDQGTcTXGS4k7"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1
    },
    uniqueness: [
      "Free Wi-Fi", "Daily housekeeping", "Pets allowed", "20 m²"
    ],
    about: "Good place for couple",
    offers: ["Bonfire (Paid)", "Luggage Assistance", "Laundry Service (Paid)"],
    food_and_drink: [" Restaurant", "Non-smoking rooms"],
    rules: ["Check-in: 2:00 pm", "Check-out: 11 AM", "Primary Guest should be atleast 18 years of age.", "Passport, Aadhar, Driving License and Govt. ID are accepted as ID proof(s)", "Outside food is not allowed", "Pets are allowed"],
    actual_price: 1650,
    discounted_price: 1297,
    payments: ["NFC mobile payments", "cash", "Debit card"],
    ratings: 3.7,
    reviews: ["Excellent hospitality....homely food...rooms were neat and clean....Enjoyed properly....", "Best place"],
    total_reviews: 23,
    likes: 10,
    shares: 5,
    phone: "8699115551",
    cancellation_policy: "No cancellation",
    hot_price: true
  },
  {
    id: 20,
    title: "Leap Of Nature Homestay, Manali",
    location: "Khasra No. 1019, Mohal, P.O, Bashisht, Manali, Himachal Pradesh 175131",
    images: [
      "https://maps.app.goo.gl/ZRWxU5Gena1bMznx6",
      "https://maps.app.goo.gl/NCYr3tBq4EsnQSdk6",
      "https://maps.app.goo.gl/218kxE5yeAws6Bq77",
      "https://maps.app.goo.gl/S7wswPNRC4QsLvxY9",
      "https://pix8.agoda.net/hotelImages/31060215/0/6be955f01323167a99ad1b2bdf80d3d7.jpg?ca=28&ce=0&s=1024x",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1920x1080/438661776.webp?k=62509f174fa7b436684b3a5fc7d321971c253a46359e5e115cecb7d66800ff74&o="
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    hosted_by: "Sapna Shetty",
    uniqueness: [
      "Free Wi-Fi", "Inside city center", "Smoking area", "300 m²", "Sparkling clean"
    ],
    about: "strategically situated in Vashist , allowing you access and proximity to local attractions and sights . Don't leave before paying a visit to the famous cafe 1986.",
    offers: ["Wi-Fi [portable rental]", "Paid parking available", "Refrigerator", "Dishes and dining utensils"],
    food_and_drink: [" Restaurant", "smoking rooms", "Refrigerator"],
    rules: ["Check-in: 12:00 pm", "Check-out: 10 AM", "Primary Guest should be atleast 18 years of age.", "Passport, Aadhar, Driving License and Govt. ID are accepted as ID proof(s)", " Smoking is only allowed on the balcony while enjoying the view", "No shoes inside the house"],
    actual_price: 1550,
    discounted_price: 1297,
    payments: ["NFC mobile payments", "cash", "Debit card"],
    ratings: 4.9,
    reviews: ["I stayed at a beautiful, brand-new place that exceeded all my expectations. Everything was clean, thoughtfully designed, and truly comfortable.", "The place is so nice, new annd there is a beautiful view from the rooms. and the crew is amazing, Arun and Sumit are very friendly and helping with whatever you need.", "Amazing place and amazing host.View from balcony is breathtaking. Loved the homestay"],
    total_reviews: 96,
    likes: 60,
    shares: 35,
    phone: "7018012531",
    cancellation_policy: "No cancellation",
    hot_price: true
  },
  {
    id: 21,
    title: "Pahadi Manzil Mountain Home",
    location: "Balsari, Manali, Himachal Pradesh 175131",
    images: [
      "https://a.hwstatic.com/image/upload/f_auto,q_auto,w_1024,e_sharpen,e_improve,e_vibrance:60/v1/propertyimages/3/314726/zirh4nj3o0ijqrf3vevw",
      "https://a.hwstatic.com/image/upload/f_auto,q_auto,w_1024,e_sharpen,e_improve,e_vibrance:60/v1/propertyimages/3/314726/wht4icpxy76nan1sbszv",
      "https://a.hwstatic.com/image/upload/f_auto,q_auto,w_1024,e_sharpen,e_improve,e_vibrance:60/v1/propertyimages/3/314726/vqc2suuyoj3lh2w2umoo",
      "https://a.hwstatic.com/image/upload/f_auto,q_auto,w_1024,e_sharpen,e_improve,e_vibrance:60/v1/propertyimages/3/314726/tgtppze003pj7ynvjgzb",
      "https://maps.app.goo.gl/Ze22heSQnWPvrcyL9",
      "https://maps.app.goo.gl/P4kvAZtw7kAeM2N59"
    ],
    homestay_capacity: {
      guests: 4,
      bedrooms: 1,
      beds: 2,
      bathrooms: 1
    },
    uniqueness: [
      "Free Wi-Fi", "Free Internet Access", "Smoking area", "300 m²"
    ],
    about: "Situated within big apple orchards, hardly any buildings nearby, a big open balcony, Pahadi Manzil is Home away from home.",
    offers: ["Luggage Storage", "24 Hour Reception", "Reception (limited hours)", "Tours/Travel Desk", "Housekeeping", "Board Games"],
    food_and_drink: ["Meals Available", "Self-Catering Facilities", "Utensils"],
    rules: ["Check In :09:00 - 17:00", "Check-out: until 11:00 AM", "7 days. You may cancel free of charge until 7 days before arrival. You will be charged 50% of the total price if you cancel in the 7 days before arrival. If you don't show up, you will be charged the total price of the reservation.Check in from 14:00 to 17:00.", "Primary Guest should be atleast 18 years of age.", "Passport, Aadhar, Driving License and Govt. ID are accepted as ID proof(s)", " Smoking is only allowed on the balcony while enjoying the view", "No shoes inside the house"],
    actual_price: 1550,
    discounted_price: 1320,
    payments: ["NFC mobile payments", "cash", "Debit card"],
    ratings: 4.5,
    reviews: ["Pahadi Manzil: A Sanctuary for the Soul 🤍🕊️", "A Perfect Blend of Comfort and Scenic Beauty", "The homestay's location, while offering stunning views, may be slightly further from the main Mall Road, but this is often considered a trade-off for the peace and tranquility it offers."],
    total_reviews: 209,
    likes: 70,
    shares: 34,
    phone: "7980426832",
    cancellation_policy: "cancel free of charge until 7 days before arrival",
    hot_price: true
  },
  {
    id: 22,
    title: "Meherbagh Homestay - Manali",
    location: "Dragon Chowk, opp. Dragon Inn and Cafe, Old Manali, Manali, Himachal Pradesh 175131",
    images: [
      "https://maps.app.goo.gl/sP6Ap3NL24wEv3PK9",
      "https://maps.app.goo.gl/7FcZuLhhSj7z3gZUA",
      "https://maps.app.goo.gl/7uYQ8ozW6RgCs4K66",
      "https://maps.app.goo.gl/g9ZxhgADMcmMRdvr8",
      "https://maps.app.goo.gl/r4bKGS7hPhRPUWb9A",
      "https://maps.app.goo.gl/Cqd8ReMADED8rnT18",
      "https://maps.app.goo.gl/GLEGRNopR9ZXCYyz9",
      "https://maps.app.goo.gl/HzHMjf2MKi8tLbfz8"
    ],
    homestay_capacity: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    hosted_by: "Mala",
    host_experience: "Hello , My Name is Mala and I have been running Meherbagh homestay in Manali Since 2024 September I love talking to travellers and interacting with them Me and me family have shifted to the mountains permanently since last year and have hosted more than 100 bookings since last year Hope we can serve you our family driven warmth and care",
    uniqueness: [
      "Free Wi-Fi", "Room Service (Limited duration)", "Smoking area", "Heater - Additional charges"
    ],
    about: "Welcome to Meherbagh, a serene Himachali homestay in Old Manali, where vintage charm meets modern comfort. Nestled amidst nature, enjoy breathtaking sunrise and moonrise views, a lush garden, and cosy private rooms. Perfect for long stays, Meherbagh offers homely meals, Wi-Fi, and parking (subject to availability). Immerse yourself in a warm, authentic Himachali experience. Treat Meherbagh like your best friend's home—where respect, kindness, and good vibes create unforgettable memories. We are waiting!",
    offers: ["Luggage Storage", "24 Hour Reception", "Reception (limited hours)", "Mineral Water - additional charge", "Housekeeping", "Centre Table", "Barthroom: Hot & Cold Water"],
    food_and_drink: ["Meals Offered: Breakfast, Lunch, Evening Snacks & Dinner", "Cuisines: North Indian, South Indian, Chinese, Continental & Local", "Amenities: Kid's Menu, Refrigerator, Dining Area, Stove/Induction, Toaster", "Breakfast,Lunch & Dinner : ₹150 per person/meal"],
    rules: ["Check In :12 PM", "Check-out:12:00 PM", "Unmarried couples/guests with Local IDs are allowed.", "Primary Guest should be atleast 18 years of age.", "Passport, Aadhar, Driving License and Govt. ID are accepted as ID proof(s)", " Smoking is only allowed on the balcony while enjoying the view", "Pets are not allowed"],
    actual_price: 999,
    discounted_price: 971,
    payments: ["NFC mobile payments", "cash", "Debit card"],
    ratings: 5,
    reviews: ["The best stay in my life! The rooms are so spacious and give you old time feelings!", "Loved my workcation here! The place got the views you need and clean spacious rooms. The owner cooks amazing homely meals. They also have dumbbells. Enjoyed !!", "It was quite wonderful experience at Meherbagh Homestay. I actually liked the garden view concept."],
    total_reviews: 35,
    likes: 20,
    shares: 7,
    phone: "9816641991",
    cancellation_policy: "Cancellations are only allowed before the Check-In Time. All time mentioned above is in Destination Time.",
    hot_price: true
  }
];

export {
  commonPhrases, culturalPosts,
  emergencyContacts, experiences, homeyHutsCategories,
  homeyHutsListings, languages, MountainView, stories
};

