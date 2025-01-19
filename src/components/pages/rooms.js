import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Wifi, BedDouble, Wind, Coffee, Tv, Bath } from 'lucide-react';

function Rooms() {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null); // For error handling
  const { id } = useParams();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/hotelroutes/roomdetails_related_to_hotel/${id}`
        );
        // console.log("rooms",response.data);
        setRoomData(response.data.allroomdata);
        setError(null); 
      } catch (err) {
        console.error('Error fetching room data:', err);
        setError('Failed to load room data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchRoomData();
  }, [id]);

  const images = [
    roomData?.photo1?.url || '',
    roomData?.photo2?.url || '',
    roomData?.photo3?.url || '',
  ].filter(Boolean);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const defaultAmenities = [
    { icon: <Wifi className="h-5 w-5" />, name: 'Free WiFi' },
    { icon: <BedDouble className="h-5 w-5" />, name: 'King Size Bed' },
    { icon: <Wind className="h-5 w-5" />, name: 'Air Conditioning' },
    { icon: <Coffee className="h-5 w-5" />, name: 'Coffee Maker' },
    { icon: <Tv className="h-5 w-5" />, name: 'Smart TV' },
    { icon: <Bath className="h-5 w-5" />, name: 'Private Bathroom' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f0a500]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-gray-600 p-8">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#f0a500] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#f0a500]/80"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!roomData) {
    return (
      <div className="text-center text-gray-600 p-8">
        No room data available
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
      <div className="max-w-4xl p-6 space-y-3 bg-gray-800 rounded-lg shadow-lg mt-6 mb-10">
        {/* Image Slider */}
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-white transform transition-transform hover:scale-[1.02]">
          <div className="relative w-[500px]" style={{ paddingBottom: '56.25%' }}>
            <img
              src={images[currentImageIndex]}
              alt={`Room view ${currentImageIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hotel Details and Amenities */}
        <div className="bg-gray-700 rounded-lg p-4 shadow-lg">
          <h2 className="text-2xl font-bold text-[#f0a500] mb-1 text-center">{roomData.hotelname || 'Hotel Name'}</h2>
          <p className="text-lg text-gray-300 text-center">
            <span className="inline-block bg-[#f0a500] text-white px-3 py-1 rounded-full">
              {roomData.roomType || 'Room Type'}
            </span>
          </p>

          <h2 className="text-xl font-semibold text-[#f0a500] mb-2 mt-4">Room Amenities</h2>
          <div className="grid grid-cols-2 gap-3">
            {defaultAmenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 rounded-lg bg-[#f0a500]/10 transform transition-all hover:translate-y-[-2px] hover:shadow-md"
              >
                <div className="text-[#f0a500]">{amenity.icon}</div>
                <span className="text-[#f0a500] text-sm font-medium">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Section */}
        <div className="rounded-lg p-4 text-white shadow-lg transform transition-all hover:shadow-xl">
          <div className="text-center space-y-2">
            <Link to={`/booking/${id}`}>
              <button className="bg-[#f0a500] text-white px-8 py-2 rounded-full font-semibold hover:bg-[#f0a500]/80 transition-colors">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
