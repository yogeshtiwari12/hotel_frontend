import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Wifi, BedDouble, Wind, Coffee, Tv, Bath, Star, Navigation, ArrowLeft, ArrowRight } from 'lucide-react';
import { frontend_url } from './front';
import toast from 'react-hot-toast';

function Rooms() {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `${frontend_url}/hotelroutes/roomdetails_related_to_hotel/${id}`,
          {withCredentials: true}
        );
        console.log('Room data:', response.data);
        if(response.data) {
          setRoomData(response.data);
          setError(null); 
        }
      } catch (err) {
        console.error('Error fetching room data:', err);
        setError('Failed to load room data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchRoomData();
  }, [id]);

  const images = roomData ? [
    roomData.allroomdata?.photo1?.url || '',
    roomData.allroomdata?.photo2?.url || '',
    roomData.allroomdata?.photo3?.url || '',
  ].filter(Boolean) : [];

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const amenities = [
    { icon: <Wifi className="h-5 w-5" />, name: 'High-Speed WiFi' },
    { icon: <BedDouble className="h-5 w-5" />, name: 'Premium King Bed' },
    { icon: <Wind className="h-5 w-5" />, name: 'Climate Control' },
    { icon: <Coffee className="h-5 w-5" />, name: 'Coffee Machine' },
    { icon: <Tv className="h-5 w-5" />, name: 'Smart TV' },
    { icon: <Bath className="h-5 w-5" />, name: 'Luxury Bathroom' },
    { icon: <Star className="h-5 w-5" />, name: 'Premium Services' },
    { icon: <Navigation className="h-5 w-5" />, name: 'City View' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-[#f0a500]"></div>
          <p className="mt-4 text-white/80 text-sm font-medium">Loading your luxury experience...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="w-full max-w-md p-8 rounded-xl bg-gray-800/80 backdrop-blur-sm shadow-xl border border-gray-700">
          <div className="text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100/10 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Unable to Load Room Details</h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-md bg-[#f0a500] px-6 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#f0a500]/90 focus:outline-none focus:ring-2 focus:ring-[#f0a500]/50"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!roomData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center text-gray-400 p-8 max-w-md rounded-xl bg-gray-800/80 backdrop-blur-sm shadow-xl border border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-500 mx-auto mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
          </svg>
          <h3 className="text-xl font-medium text-white mb-2">No Room Information Available</h3>
          <p>The requested room details could not be found.</p>
          <Link to="/" className="mt-6 inline-block px-6 py-3 rounded-md bg-[#f0a500]/20 text-[#f0a500] hover:bg-[#f0a500]/30 transition-colors">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Room Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">{roomData.allroomdata?.hotelname}</h1>
          <div className="flex items-center justify-center mb-2">
            <span className="inline-flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 text-[#f0a500] fill-[#f0a500]" />
              ))}
            </span>
            <span className="ml-2 text-sm text-gray-400">Premium Resort</span>
          </div>
          <div className="inline-block bg-[#f0a500]/10 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <span className="text-[#f0a500] font-medium">{roomData.allroomdata?.roomType || 'Luxury Suite'}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
              <div className="aspect-w-16 aspect-h-9 relative">
                {images.length > 0 ? (
                  <img
                    src={images[currentImageIndex]}
                    alt={`Room view ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <p className="text-gray-400">No images available</p>
                  </div>
                )}
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                
                {/* Image Indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                          currentImageIndex === index 
                            ? 'bg-white scale-110 ring-2 ring-white/30 ring-offset-1 ring-offset-transparent' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Image Counter */}
              {images.length > 0 && (
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>
            
            {/* Room Description */}
            <div className="mt-6 p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Room Overview</h2>
              <p className="text-gray-300 mb-4">
                {roomData.allroomdata?.description || 
                  `Experience ultimate luxury in our ${roomData.allroomdata?.roomType || 'Premium Suite'} with breathtaking views and lavish amenities. This meticulously designed space offers the perfect blend of elegance and comfort for an unforgettable stay.`}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <BedDouble className="h-4 w-4 text-[#f0a500]" />
                  <span>Sleeps up to 2 people</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#f0a500]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                  <span>45 sq. meters</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#f0a500]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <span>Mountain View</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#f0a500]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L9.75 14.5M15 3.104c.251.023.501.05.75.082M15 3.104c-.251.023-.501.05-.75.082m0 0a23.25 23.25 0 00-7.5 0m7.5 0v5.714a2.25 2.25 0 01-.659 1.591L12 14.5" />
                  </svg>
                  <span>Non-Smoking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing and Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg text-gray-200">
              {/* Price */}
              <div className="mb-6 pb-6 border-b border-gray-700">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-white">₹{roomData.roomprice}</span>
                  <span className="ml-2 text-sm text-gray-400">/ night</span>
                </div>
                <div className="mt-2 flex items-center">
                  <span className="flex items-center text-[#f0a500] mr-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.9</span>
                  </span>
                  <span className="text-xs text-gray-400">(120+ reviews)</span>
                </div>
              </div>

              {/* Booking Button */}
              <div className="mb-6 pb-6 border-b border-gray-700">
                <Link to={`/booking/${id}`}>
                  <button className="w-full bg-[#f0a500] text-white py-3 px-4 rounded-lg font-medium shadow-lg hover:bg-[#f0a500]/90 transition-all transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-[#f0a500]/50 focus:ring-offset-2 focus:ring-offset-gray-800">
                    Book Now
                  </button>
                </Link>
                <p className="mt-3 text-xs text-center text-gray-400">Free cancellation up to 24 hours before check-in</p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Room Amenities</h3>
                <div className="grid grid-cols-1 gap-3">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/50 border border-gray-600/30 transform transition-all hover:bg-gray-700/70"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-[#f0a500]/20 flex items-center justify-center text-[#f0a500]">
                        {amenity.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-200">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-[#f0a500]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              Hotel Policies
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#f0a500] mt-0.5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Check-in: 2:00 PM - 11:00 PM
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#f0a500] mt-0.5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Check-out: Before 12:00 PM
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#f0a500] mt-0.5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Age restriction: Adult only (18+)
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#f0a500] mt-0.5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pets: Not allowed
              </li>
            </ul>
          </div>
          
          <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-[#f0a500]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Featured Services
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#f0a500] mt-0.5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                24/7 Room Service
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#f0a500] mt-0.5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Concierge Services
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#f0a500] mt-0.5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Complimentary Breakfast
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#f0a500] mt-0.5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Access to Fitness Center & Spa
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;