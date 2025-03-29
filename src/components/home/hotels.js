import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { frontend_url } from '../pages/front';
import { motion } from 'framer-motion';
import { MapPin, Bed, DollarSign, Star } from 'lucide-react';

const Hotels = () => {
  const { profile } = useSelector((state) => state.auth);
  const isAdmin = profile?.user?.role === 'admin';
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHotelData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${frontend_url}/hotelroutes/gethoteldata`, {
        withCredentials: true,
      });
      setHotelData(response.data.hotel);
    } catch (error) {
      console.error('Error fetching hotel data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  // Loading skeletons
  const LoadingSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
          <div className="h-48 bg-gray-300 w-full"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Browse Available Hotels
          </h1>
          <div className="w-20 h-1 bg-blue-600 mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            hotelData.map((hotel) => (
              <motion.div
                key={hotel._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={isAdmin ? `/saveroomdetails/${hotel._id}` : `/roomdetails_related_to_hotel/${hotel._id}`}
                  className="block h-full"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      <img
                        src={hotel.hotel_image.url}
                        alt={hotel.hotelname}
                        className="h-48 w-full object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-medium">
                        ₹{hotel.room_price}/night
                      </div>
                    </div>
                    
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{hotel.hotelname}</h3>
                      
                      <div className="mb-2 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={`${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">4.0</span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-700">
                          <MapPin size={16} className="mr-2 text-blue-600" />
                          <span>{hotel.location}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Bed size={16} className="mr-2 text-blue-600" />
                          <span>{hotel.total_rooms} Rooms</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <DollarSign size={16} className="mr-2 text-blue-600" />
                          <span>₹{hotel.room_price} per night</span>
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition-colors">
                          {isAdmin ? "Manage Rooms" : "View Details"}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
        
        {!loading && hotelData.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No hotels available</h3>
            <p className="text-gray-600">Please check back later for new listings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;