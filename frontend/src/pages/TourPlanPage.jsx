import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    FaCalendarAlt,
    FaCloudSun,
    FaDirections,
    FaHeart,
    FaLocationArrow,
    FaMapMarkerAlt,
    FaMapPin,
    FaMoon,
    FaRoute,
    FaSearch,
    FaShareAlt,
    FaSpinner,
    FaStar,
    FaSun
} from 'react-icons/fa';

const TourPlanPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [manualLocation, setManualLocation] = useState('');
  const [searchRadius, setSearchRadius] = useState(25);
  const [favoriteePlaces, setFavoritePlaces] = useState([]);
  const [locationName, setLocationName] = useState('');

  // Sample data (replace with Google Places API in production)
  const getPlacesForLocation = (lat, lng) => {
    // Kolkata area (22.4-23.2, 88.0-88.6)
    if (lat >= 22.4 && lat <= 23.2 && lng >= 88.0 && lng <= 88.6) {
      return [
        {
          place_id: 'kol1',
          name: 'Victoria Memorial',
          geometry: { location: { lat: 22.5448, lng: 88.3426 } },
          rating: 4.5,
          user_ratings_total: 28000,
          photos: [{ photo_reference: 'kolkata1' }],
          vicinity: 'Maidan, Kolkata',
          types: ['tourist_attraction', 'museum'],
          opening_hours: { open_now: true }
        },
        {
          place_id: 'kol2',
          name: 'Howrah Bridge',
          geometry: { location: { lat: 22.5851, lng: 88.3467 } },
          rating: 4.3,
          user_ratings_total: 22000,
          photos: [{ photo_reference: 'kolkata2' }],
          vicinity: 'Howrah, Kolkata',
          types: ['tourist_attraction', 'bridge'],
          opening_hours: { open_now: true }
        },
        {
          place_id: 'kol3',
          name: 'Dakshineswar Kali Temple',
          geometry: { location: { lat: 22.6555, lng: 88.3568 } },
          rating: 4.6,
          user_ratings_total: 35000,
          photos: [{ photo_reference: 'kolkata3' }],
          vicinity: 'Dakshineswar, Kolkata',
          types: ['tourist_attraction', 'place_of_worship'],
          opening_hours: { open_now: true }
        },
        {
          place_id: 'kol4',
          name: 'Indian Museum',
          geometry: { location: { lat: 22.5587, lng: 88.3509 } },
          rating: 4.2,
          user_ratings_total: 15000,
          photos: [{ photo_reference: 'kolkata4' }],
          vicinity: 'Park Street, Kolkata',
          types: ['tourist_attraction', 'museum'],
          opening_hours: { open_now: true }
        },
        {
          place_id: 'kol5',
          name: 'Kalighat Kali Temple',
          geometry: { location: { lat: 22.5186, lng: 88.3432 } },
          rating: 4.4,
          user_ratings_total: 18000,
          photos: [{ photo_reference: 'kolkata5' }],
          vicinity: 'Kalighat, Kolkata',
          types: ['tourist_attraction', 'place_of_worship'],
          opening_hours: { open_now: true }
        },
        {
          place_id: 'kol6',
          name: 'Eden Gardens',
          geometry: { location: { lat: 22.5645, lng: 88.3433 } },
          rating: 4.3,
          user_ratings_total: 12000,
          photos: [{ photo_reference: 'kolkata6' }],
          vicinity: 'BBD Bagh, Kolkata',
          types: ['tourist_attraction', 'stadium'],
          opening_hours: { open_now: true }
        }
      ];
    }
    // Delhi area (28.4-28.8, 77.0-77.4)
    else if (lat >= 28.4 && lat <= 28.8 && lng >= 77.0 && lng <= 77.4) {
      return [
        {
          place_id: '1',
          name: 'Red Fort',
          geometry: { location: { lat: 28.6562, lng: 77.2410 } },
          rating: 4.5,
          user_ratings_total: 25000,
          photos: [{ photo_reference: 'sample1' }],
          vicinity: 'Chandni Chowk, New Delhi',
          types: ['tourist_attraction', 'historical'],
          opening_hours: { open_now: true }
        },
        {
          place_id: '2',
          name: 'India Gate',
          geometry: { location: { lat: 28.6129, lng: 77.2295 } },
          rating: 4.3,
          user_ratings_total: 18000,
          photos: [{ photo_reference: 'sample2' }],
          vicinity: 'Rajpath, New Delhi',
          types: ['tourist_attraction', 'monument'],
          opening_hours: { open_now: true }
        },
        {
          place_id: '3',
          name: 'Lotus Temple',
          geometry: { location: { lat: 28.5535, lng: 77.2588 } },
          rating: 4.6,
          user_ratings_total: 30000,
          photos: [{ photo_reference: 'sample3' }],
          vicinity: 'Kalkaji, New Delhi',
          types: ['tourist_attraction', 'place_of_worship'],
          opening_hours: { open_now: true }
        },
        {
          place_id: '4',
          name: 'Qutub Minar',
          geometry: { location: { lat: 28.5245, lng: 77.1855 } },
          rating: 4.4,
          user_ratings_total: 22000,
          photos: [{ photo_reference: 'sample4' }],
          vicinity: 'Mehrauli, New Delhi',
          types: ['tourist_attraction', 'historical'],
          opening_hours: { open_now: true }
        },
        {
          place_id: '5',
          name: 'Humayun\'s Tomb',
          geometry: { location: { lat: 28.5933, lng: 77.2507 } },
          rating: 4.4,
          user_ratings_total: 15000,
          photos: [{ photo_reference: 'sample5' }],
          vicinity: 'Nizamuddin, New Delhi',
          types: ['tourist_attraction', 'historical'],
          opening_hours: { open_now: true }
        }
      ];
    }
    // Mumbai area (18.8-19.3, 72.7-73.0)
    else if (lat >= 18.8 && lat <= 19.3 && lng >= 72.7 && lng <= 73.0) {
      return [
        {
          place_id: 'm1',
          name: 'Gateway of India',
          geometry: { location: { lat: 18.9220, lng: 72.8347 } },
          rating: 4.4,
          user_ratings_total: 35000,
          photos: [{ photo_reference: 'mumbai1' }],
          vicinity: 'Colaba, Mumbai',
          types: ['tourist_attraction', 'monument'],
          opening_hours: { open_now: true }
        },
        {
          place_id: 'm2',
          name: 'Marine Drive',
          geometry: { location: { lat: 18.9435, lng: 72.8235 } },
          rating: 4.5,
          user_ratings_total: 28000,
          photos: [{ photo_reference: 'mumbai2' }],
          vicinity: 'Marine Lines, Mumbai',
          types: ['tourist_attraction', 'promenade'],
          opening_hours: { open_now: true }
        },
        {
          place_id: 'm3',
          name: 'Chhatrapati Shivaji Terminus',
          geometry: { location: { lat: 18.9401, lng: 72.8350 } },
          rating: 4.3,
          user_ratings_total: 22000,
          photos: [{ photo_reference: 'mumbai3' }],
          vicinity: 'Fort, Mumbai',
          types: ['tourist_attraction', 'historical'],
          opening_hours: { open_now: true }
        }
      ];
    }
    // Bangalore area (12.8-13.2, 77.4-77.8)
    else if (lat >= 12.8 && lat <= 13.2 && lng >= 77.4 && lng <= 77.8) {
      return [
        {
          place_id: 'b1',
          name: 'Lalbagh Botanical Garden',
          geometry: { location: { lat: 12.9507, lng: 77.5848 } },
          rating: 4.4,
          user_ratings_total: 18000,
          photos: [{ photo_reference: 'bangalore1' }],
          vicinity: 'Basavanagudi, Bangalore',
          types: ['tourist_attraction', 'park'],
          opening_hours: { open_now: true }
        },
        {
          place_id: 'b2',
          name: 'Bangalore Palace',
          geometry: { location: { lat: 12.9981, lng: 77.5926 } },
          rating: 4.2,
          user_ratings_total: 12000,
          photos: [{ photo_reference: 'bangalore2' }],
          vicinity: 'Vasanth Nagar, Bangalore',
          types: ['tourist_attraction', 'historical'],
          opening_hours: { open_now: true }
        }
      ];
    }
    // Default places for other locations
    else {
      return [
        {
          place_id: 'default1',
          name: 'Local Landmark',
          geometry: { location: { lat: lat + 0.01, lng: lng + 0.01 } },
          rating: 4.2,
          user_ratings_total: 5000,
          photos: [{ photo_reference: 'default1' }],
          vicinity: 'Near your location',
          types: ['tourist_attraction'],
          opening_hours: { open_now: true }
        },
        {
          place_id: 'default2',
          name: 'Popular Spot',
          geometry: { location: { lat: lat - 0.01, lng: lng + 0.02 } },
          rating: 4.0,
          user_ratings_total: 3000,
          photos: [{ photo_reference: 'default2' }],
          vicinity: 'Near your location',
          types: ['tourist_attraction'],
          opening_hours: { open_now: true }
        }
      ];
    }
  };

  // Calculate distance using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Reverse geocoding to get location name from coordinates
  const getLocationName = async (lat, lng) => {
    try {
      // In production, use Google Geocoding API or similar service
      // For now, we'll use a simple coordinate-to-location mapping
      
      const locationMap = [
        { bounds: { minLat: 22.8, maxLat: 23.2, minLng: 88.2, maxLng: 88.6 }, name: 'Kolkata, West Bengal, India' },
        { bounds: { minLat: 28.4, maxLat: 28.8, minLng: 77.0, maxLng: 77.4 }, name: 'New Delhi, India' },
        { bounds: { minLat: 18.8, maxLat: 19.3, minLng: 72.7, maxLng: 73.0 }, name: 'Mumbai, Maharashtra, India' },
        { bounds: { minLat: 12.8, maxLat: 13.2, minLng: 77.4, maxLng: 77.8 }, name: 'Bangalore, Karnataka, India' },
        { bounds: { minLat: 13.0, maxLat: 13.2, minLng: 80.1, maxLng: 80.4 }, name: 'Chennai, Tamil Nadu, India' },
        { bounds: { minLat: 17.2, maxLat: 17.6, minLng: 78.2, maxLng: 78.7 }, name: 'Hyderabad, Telangana, India' },
        { bounds: { minLat: 18.4, maxLat: 18.7, minLng: 73.7, maxLng: 74.0 }, name: 'Pune, Maharashtra, India' },
        { bounds: { minLat: 26.8, maxLat: 27.0, minLng: 75.7, maxLng: 75.9 }, name: 'Jaipur, Rajasthan, India' },
        { bounds: { minLat: 23.0, maxLat: 23.3, minLng: 72.4, maxLng: 72.7 }, name: 'Ahmedabad, Gujarat, India' },
        { bounds: { minLat: 40.6, maxLat: 40.9, minLng: -74.1, maxLng: -73.9 }, name: 'New York, NY, USA' },
        { bounds: { minLat: 51.4, maxLat: 51.6, minLng: -0.2, maxLng: 0.0 }, name: 'London, UK' },
        { bounds: { minLat: 48.8, maxLat: 48.9, minLng: 2.2, maxLng: 2.5 }, name: 'Paris, France' },
        { bounds: { minLat: 35.6, maxLat: 35.8, minLng: 139.6, maxLng: 139.8 }, name: 'Tokyo, Japan' }
      ];

      // Find matching location
      for (const location of locationMap) {
        const { bounds, name } = location;
        if (lat >= bounds.minLat && lat <= bounds.maxLat && 
            lng >= bounds.minLng && lng <= bounds.maxLng) {
          return name;
        }
      }

      // If no specific location found, try to determine country/region
      if (lat >= 6 && lat <= 37 && lng >= 68 && lng <= 97) {
        return 'India';
      } else if (lat >= 24 && lat <= 49 && lng >= -125 && lng <= -66) {
        return 'United States';
      } else if (lat >= 49 && lat <= 61 && lng >= -8 && lng <= 2) {
        return 'United Kingdom';
      } else {
        return `Location ${lat.toFixed(2)}, ${lng.toFixed(2)}`;
      }
    } catch (error) {
      console.error('Error getting location name:', error);
      return `Location ${lat.toFixed(2)}, ${lng.toFixed(2)}`;
    }
  };

  // Step 1: Fetch user location
  const fetchUserLocation = async () => {
    setLoadingLocation(true);
    setUserLocation(null); // Reset location
    setLocationName(''); // Reset location name
    setNearbyPlaces([]); // Clear previous places
    
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser. Please enter location manually.");
      setLoadingLocation(false);
      return;
    }

    // Check if HTTPS is being used (required for geolocation)
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      alert("Geolocation requires HTTPS. Please enter location manually.");
      setLoadingLocation(false);
      return;
    }

    try {
      console.log("Requesting geolocation permission...");
      
      // Request permission first
      const permission = await navigator.permissions.query({name: 'geolocation'});
      console.log("Geolocation permission status:", permission.state);
      
      if (permission.state === 'denied') {
        alert("Location permission denied. Please enable location access in your browser settings and refresh the page, or enter location manually.");
        setLoadingLocation(false);
        return;
      }

      // Create a promise for geolocation with better options
      const getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
          const options = {
            enableHighAccuracy: true,
            timeout: 20000, // 20 seconds
            maximumAge: 0 // Don't use cached location
          };

          console.log("Getting current position with options:", options);
          
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log("Geolocation success:", position);
              resolve(position);
            },
            (error) => {
              console.error("Geolocation error:", error);
              reject(error);
            },
            options
          );
        });
      };

      const position = await getCurrentPosition();
      const { latitude, longitude, accuracy } = position.coords;
      
      console.log("Location detected:", { latitude, longitude, accuracy });
      
      // Validate coordinates
      if (latitude === 0 && longitude === 0) {
        throw new Error("Invalid coordinates received");
      }
      
      setUserLocation({ lat: latitude, lng: longitude });
      
      // Get location name
      console.log("Getting location name...");
      const name = await getLocationName(latitude, longitude);
      setLocationName(name);
      console.log("Location name:", name);
      
      await fetchNearbyPlaces(latitude, longitude);
      
    } catch (error) {
      console.error("Geolocation failed:", error);
      
      let errorMessage = "Unable to detect location. ";
      
      if (error.code === 1) { // PERMISSION_DENIED
        errorMessage += "Please enable location access in your browser and try again, or enter location manually.";
      } else if (error.code === 2) { // POSITION_UNAVAILABLE
        errorMessage += "Location information is unavailable. Please enter location manually.";
      } else if (error.code === 3) { // TIMEOUT
        errorMessage += "Location request timed out. Please try again or enter location manually.";
      } else {
        errorMessage += "Please enter location manually.";
      }
      
      alert(errorMessage);
      setUserLocation(null);
      setNearbyPlaces([]);
    } finally {
      setLoadingLocation(false);
    }
  };

  // Step 2: Fetch nearby places (Google Places API simulation)
  const fetchNearbyPlaces = async (lat, lng) => {
    setLoadingPlaces(true);
    setNearbyPlaces([]); // Clear previous places
    
    try {
      console.log("Fetching places for location:", lat, lng);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get places based on actual location
      const placesForLocation = getPlacesForLocation(lat, lng);
      
      // In production, replace this with actual Google Places API call
      // const response = await fetch(`/api/places/nearby?lat=${lat}&lng=${lng}&radius=${searchRadius * 1000}`);
      // const data = await response.json();
      
      // Step 3: Calculate distances and sort by nearest first
      const placesWithDistance = placesForLocation.map(place => ({
        ...place,
        distance: calculateDistance(
          lat, 
          lng, 
          place.geometry.location.lat, 
          place.geometry.location.lng
        )
      })).filter(place => place.distance <= searchRadius) // Filter by radius
        .sort((a, b) => a.distance - b.distance); // Sort by distance
      
      console.log("Places found:", placesWithDistance.length);
      setNearbyPlaces(placesWithDistance);
      
      if (placesWithDistance.length === 0) {
        alert(`No tourist attractions found within ${searchRadius}km of your location. Try increasing the search radius.`);
      }
      
    } catch (error) {
      console.error("Error fetching places:", error);
      alert("Error fetching nearby places. Please try again.");
      setNearbyPlaces([]);
    } finally {
      setLoadingPlaces(false);
    }
  };

  // Step 4: Generate optimized tour plan
  const generateTourPlan = () => {
    if (selectedPlaces.length === 0) {
      alert("Please select at least one place to generate a tour plan.");
      return;
    }

    // Sort selected places by distance for optimal route
    const sortedPlaces = [...selectedPlaces].sort((a, b) => a.distance - b.distance);
    
    // Create time slots
    const timeSlots = {
      morning: { start: "09:00", end: "12:00", icon: FaSun, color: "from-yellow-400 to-orange-500" },
      afternoon: { start: "13:00", end: "17:00", icon: FaCloudSun, color: "from-orange-400 to-red-500" },
      evening: { start: "18:00", end: "21:00", icon: FaMoon, color: "from-purple-400 to-indigo-600" }
    };

    // Distribute places across time slots
    const plan = {
      morning: sortedPlaces.slice(0, 2),
      afternoon: sortedPlaces.slice(2, 4),
      evening: sortedPlaces.slice(4, 5)
    };

    // Calculate total distance and time
    const totalDistance = sortedPlaces.reduce((sum, place) => sum + place.distance, 0);
    const estimatedTime = sortedPlaces.length * 1.5; // 1.5 hours per place

    setGeneratedPlan({
      ...plan,
      timeSlots,
      totalDistance,
      estimatedTime,
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    });
  };

  const togglePlaceSelection = (place) => {
    setSelectedPlaces(prev => {
      const isSelected = prev.find(p => p.place_id === place.place_id);
      if (isSelected) {
        return prev.filter(p => p.place_id !== place.place_id);
      } else {
        return [...prev, place];
      }
    });
  };

  const getPlaceImage = (place) => {
    // In production, use Google Places Photo API
    const imageMap = {
      'Red Fort': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400',
      'India Gate': 'https://images.unsplash.com/photo-1597149434031-9d2997f96ba4?w=400',
      'Lotus Temple': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      'Qutub Minar': 'https://images.unsplash.com/photo-1587474817858-8b4d2fad5b49?w=400',
      'Humayun\'s Tomb': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      'Akshardham Temple': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400',
      'Chandni Chowk': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      'Connaught Place': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    };
    return imageMap[place.name] || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400';
  };

  // Auto-fetch location on component mount
  useEffect(() => {
    console.log("Component mounted, fetching location...");
    // Add a small delay to ensure the page is fully loaded
    const timer = setTimeout(() => {
      fetchUserLocation();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Refetch places when radius changes
  useEffect(() => {
    if (userLocation) {
      console.log("Radius changed to:", searchRadius, "km - refetching places...");
      fetchNearbyPlaces(userLocation.lat, userLocation.lng);
    }
  }, [searchRadius]);

  // Manual location search
  const searchManualLocation = async () => {
    if (!manualLocation.trim()) {
      alert("Please enter a location to search.");
      return;
    }
    
    setLoadingLocation(true);
    setLocationName(''); // Reset location name
    setNearbyPlaces([]);
    
    try {
      console.log("Searching for location:", manualLocation);
      
      // Simulate geocoding API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple location mapping for demo (replace with Google Geocoding API)
      const locationMap = {
        'mumbai': { lat: 19.0760, lng: 72.8777, name: 'Mumbai, India' },
        'bangalore': { lat: 12.9716, lng: 77.5946, name: 'Bangalore, India' },
        'chennai': { lat: 13.0827, lng: 80.2707, name: 'Chennai, India' },
        'kolkata': { lat: 22.5726, lng: 88.3639, name: 'Kolkata, India' },
        'pune': { lat: 18.5204, lng: 73.8567, name: 'Pune, India' },
        'hyderabad': { lat: 17.3850, lng: 78.4867, name: 'Hyderabad, India' },
        'new york': { lat: 40.7128, lng: -74.0060, name: 'New York, USA' },
        'london': { lat: 51.5074, lng: -0.1278, name: 'London, UK' },
        'paris': { lat: 48.8566, lng: 2.3522, name: 'Paris, France' },
        'tokyo': { lat: 35.6762, lng: 139.6503, name: 'Tokyo, Japan' },
        'delhi': { lat: 28.6139, lng: 77.2090, name: 'Delhi, India' },
      };
      
      const searchKey = manualLocation.toLowerCase().trim();
      let coordinates = null;
      
      // Try exact match first
      if (locationMap[searchKey]) {
        coordinates = locationMap[searchKey];
      } else {
        // Try partial match
        const partialMatch = Object.keys(locationMap).find(key => 
          key.includes(searchKey) || searchKey.includes(key)
        );
        if (partialMatch) {
          coordinates = locationMap[partialMatch];
        }
      }
      
      if (coordinates) {
        console.log("Location found:", coordinates);
        setUserLocation({ lat: coordinates.lat, lng: coordinates.lng });
        setLocationName(coordinates.name);
        await fetchNearbyPlaces(coordinates.lat, coordinates.lng);
        alert(`Location set to ${coordinates.name}`);
      } else {
        // Default to a random location for demo
        const randomLat = 28.6139 + (Math.random() - 0.5) * 0.1;
        const randomLng = 77.2090 + (Math.random() - 0.5) * 0.1;
        setUserLocation({ lat: randomLat, lng: randomLng });
        const name = await getLocationName(randomLat, randomLng);
        setLocationName(name);
        await fetchNearbyPlaces(randomLat, randomLng);
        alert(`Location "${manualLocation}" not found. Using approximate coordinates in ${name}.`);
      }
      
    } catch (error) {
      console.error("Location search error:", error);
      alert("Failed to search location. Please try again.");
    } finally {
      setLoadingLocation(false);
      setManualLocation('');
    }
  };

  // Share tour plan
  const shareTourPlan = () => {
    if (!generatedPlan) {
      alert("Please generate a tour plan first.");
      return;
    }
    
    const planText = `Check out my AI-generated tour plan for ${generatedPlan.date}!\n\nPlaces to visit:\n${
      [...generatedPlan.morning, ...generatedPlan.afternoon, ...generatedPlan.evening]
        .map(place => `• ${place.name} (${place.distance.toFixed(1)}km away)`)
        .join('\n')
    }\n\nTotal Distance: ${generatedPlan.totalDistance.toFixed(1)}km\nEstimated Time: ${generatedPlan.estimatedTime}h\n\nPowered by TourMate AI`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My AI Tour Plan',
        text: planText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(planText).then(() => {
        alert("Tour plan copied to clipboard!");
      }).catch(() => {
        alert("Unable to copy. Please manually copy the tour plan.");
      });
    }
  };

  // Get directions to first place
  const getDirections = () => {
    if (!generatedPlan || !userLocation) {
      alert("Please generate a tour plan first.");
      return;
    }
    
    const firstPlace = [...generatedPlan.morning, ...generatedPlan.afternoon, ...generatedPlan.evening][0];
    if (firstPlace) {
      const googleMapsUrl = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${firstPlace.geometry.location.lat},${firstPlace.geometry.location.lng}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  // Toggle favorite place
  const toggleFavorite = (place, event) => {
    event.stopPropagation(); // Prevent triggering place selection
    setFavoritePlaces(prev => {
      const isFavorite = prev.find(p => p.place_id === place.place_id);
      if (isFavorite) {
        return prev.filter(p => p.place_id !== place.place_id);
      } else {
        return [...prev, place];
      }
    });
  };

  // Share individual place
  const sharePlace = (place, event) => {
    event.stopPropagation(); // Prevent triggering place selection
    
    const placeText = `Check out ${place.name}!\n\nRating: ${place.rating} ⭐\nLocation: ${place.vicinity}\nDistance: ${place.distance.toFixed(1)}km away\n\nDiscovered with TourMate AI`;
    
    if (navigator.share) {
      navigator.share({
        title: place.name,
        text: placeText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(placeText).then(() => {
        alert(`${place.name} details copied to clipboard!`);
      }).catch(() => {
        alert("Unable to copy. Please manually share the place details.");
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AI Tour Planner
            </h1>
            <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🗺️</div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Discover amazing places near you and get an AI-optimized tour plan in seconds
          </p>
          {!userLocation && !loadingLocation && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 max-w-2xl mx-auto">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>📍 Enable Location Access:</strong> Click "Get Location" and allow location access to find the best attractions near you!
              </p>
            </div>
          )}
        </motion.div>

        {/* Location Status & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20"
        >
          {/* Location Display */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full ${loadingLocation ? 'animate-pulse' : ''}`}>
              <FaMapPin className="text-white text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {loadingLocation ? "Detecting your location..." : userLocation ? "Your Location" : "Location not detected"}
              </h3>
              <div className="text-gray-600 dark:text-gray-300">
                {loadingLocation ? (
                  <p>Please allow location access when prompted</p>
                ) : userLocation ? (
                  <>
                    <p className="font-medium text-blue-600 dark:text-blue-400">
                      {locationName || "Getting location name..."}
                    </p>
                    <p className="text-sm">
                      {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                    </p>
                  </>
                ) : (
                  <p>Click 'Get Location' or enter manually below</p>
                )}
              </div>
            </div>
            <button
              onClick={fetchUserLocation}
              disabled={loadingLocation}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loadingLocation ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaLocationArrow />
              )}
              {loadingLocation ? "Locating..." : "Get Location"}
            </button>
          </div>

          {/* Manual Location Input */}
          <div className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                placeholder="Or enter a city/location manually..."
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && searchManualLocation()}
              />
              <button
                onClick={searchManualLocation}
                disabled={loadingLocation || !manualLocation.trim()}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <FaSearch />
                Search
              </button>
            </div>
          </div>

          {/* Search Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Search Radius:
                </label>
                <select
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(Number(e.target.value))}
                  disabled={loadingPlaces}
                  className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value={10}>10 km</option>
                  <option value={25}>25 km</option>
                  <option value={50}>50 km</option>
                  <option value={100}>100 km</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span>Places found:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{nearbyPlaces.length}</span>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {loadingPlaces ? (
                <span className="flex items-center gap-2">
                  <FaSpinner className="animate-spin" />
                  Searching places...
                </span>
              ) : userLocation ? (
                `Last updated: ${new Date().toLocaleTimeString()}`
              ) : (
                "Please enable location access"
              )}
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Nearby Places */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <FaSearch className="text-blue-600" />
                  Nearby Attractions
                </h2>
                <div className="text-sm bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full">
                  {selectedPlaces.length} selected
                </div>
              </div>

              {loadingPlaces ? (
                <div className="text-center py-16">
                  <FaSpinner className="animate-spin text-6xl text-blue-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Finding Amazing Places...
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Searching for the best tourist attractions near you
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatePresence>
                    {nearbyPlaces.map((place, index) => {
                      const isSelected = selectedPlaces.find(p => p.place_id === place.place_id);
                      
                      return (
                        <motion.div
                          key={place.place_id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`relative group cursor-pointer transition-all duration-300 ${
                            isSelected 
                              ? 'transform scale-105' 
                              : 'hover:transform hover:scale-105'
                          }`}
                          onClick={() => togglePlaceSelection(place)}
                        >
                          <div className={`rounded-2xl overflow-hidden shadow-xl border-2 transition-all duration-300 ${
                            isSelected 
                              ? 'border-blue-500 shadow-blue-500/25' 
                              : 'border-transparent hover:border-blue-300'
                          }`}>
                            
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={getPlaceImage(place)}
                                alt={place.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              
                              {/* Selection Indicator */}
                              <div className={`absolute top-4 right-4 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                isSelected 
                                  ? 'bg-blue-600 border-blue-600' 
                                  : 'bg-white/20 border-white/40 backdrop-blur-sm'
                              }`}>
                                {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                              </div>

                              {/* Distance Badge */}
                              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                                {place.distance.toFixed(1)} km
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 bg-white dark:bg-gray-800">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                                {place.name}
                              </h3>
                              
                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center gap-1">
                                  <FaStar className="text-yellow-500" />
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {place.rating}
                                  </span>
                                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                                    ({place.user_ratings_total?.toLocaleString()})
                                  </span>
                                </div>
                              </div>

                              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                {place.vicinity}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  place.opening_hours?.open_now 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                }`}>
                                  {place.opening_hours?.open_now ? 'Open Now' : 'Closed'}
                                </div>
                                
                                <div className="flex gap-2">
                                  <button 
                                    onClick={(e) => toggleFavorite(place, e)}
                                    className={`p-2 transition-colors ${
                                      favoriteePlaces.find(p => p.place_id === place.place_id)
                                        ? 'text-red-500' 
                                        : 'text-gray-400 hover:text-red-500'
                                    }`}
                                  >
                                    <FaHeart />
                                  </button>
                                  <button 
                                    onClick={(e) => sharePlace(place, e)}
                                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                  >
                                    <FaShareAlt />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>

          {/* Generated Tour Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            
            {/* Generate Plan Button */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
              <button
                onClick={generateTourPlan}
                disabled={selectedPlaces.length === 0}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform shadow-lg flex items-center justify-center gap-3 ${
                  selectedPlaces.length === 0
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105'
                }`}
              >
                <FaRoute />
                {selectedPlaces.length === 0 ? 'Select Places First' : 'Generate Tour Plan'}
              </button>
              
              <div className="mt-4 text-center">
                {selectedPlaces.length > 0 ? (
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedPlaces.length} place{selectedPlaces.length > 1 ? 's' : ''} selected
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Select tourist attractions above to create your personalized tour plan
                  </div>
                )}
              </div>

              {favoriteePlaces.length > 0 && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <FaHeart />
                    <span className="text-sm font-medium">
                      {favoriteePlaces.length} favorite place{favoriteePlaces.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Tour Plan Display */}
            {generatedPlan && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FaCalendarAlt className="text-purple-600 text-xl" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Your Tour Plan
                  </h3>
                </div>

                <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl">
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                    {generatedPlan.date}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Total Distance:</span>
                      <span className="font-bold text-gray-900 dark:text-white ml-2">
                        {generatedPlan.totalDistance.toFixed(1)} km
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Est. Time:</span>
                      <span className="font-bold text-gray-900 dark:text-white ml-2">
                        {generatedPlan.estimatedTime}h
                      </span>
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-4">
                  {Object.entries(generatedPlan.timeSlots).map(([period, slot]) => {
                    const IconComponent = slot.icon;
                    const places = generatedPlan[period];
                    
                    if (places.length === 0) return null;
                    
                    return (
                      <motion.div
                        key={period}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                      >
                        <div className={`bg-gradient-to-r ${slot.color} p-4 rounded-2xl text-white mb-3`}>
                          <div className="flex items-center gap-3">
                            <IconComponent className="text-2xl" />
                            <div>
                              <h4 className="font-bold text-lg capitalize">{period}</h4>
                              <p className="text-sm opacity-90">
                                {slot.start} - {slot.end}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3 ml-4">
                          {places.map((place, index) => (
                            <motion.div
                              key={place.place_id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border-l-4 border-blue-500"
                            >
                              <h5 className="font-semibold text-gray-900 dark:text-white">
                                {place.name}
                              </h5>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                                <span className="flex items-center gap-1">
                                  <FaMapMarkerAlt />
                                  {place.distance.toFixed(1)} km
                                </span>
                                <span className="flex items-center gap-1">
                                  <FaStar className="text-yellow-500" />
                                  {place.rating}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button 
                    onClick={getDirections}
                    className="bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <FaDirections />
                    Get Directions
                  </button>
                  <button 
                    onClick={shareTourPlan}
                    className="bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <FaShareAlt />
                    Share Plan
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TourPlanPage;
