import React, { useEffect, useState } from 'react';
import { Currency, MapPin, Hotel, TrendingUp, Calendar } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context.js/context';
import { useSelector } from 'react-redux';
import { frontend_url } from './front';

const Earning = () => {
  const [data, setData] = useState({
    total_price: 0,
    hotel: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [totalbookings1, setTotalBookings] = useState({ totalbookings: 0 });
  const { profile } =  useSelector((state) => state.auth);
  

  useEffect(() => {
    if(profile && profile.user!==null){
      setTotalBookings({totalbookings:profile.user.totalbookings});
      
    }
  }, [profile]); 


  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`${frontend_url}/hotelroutes/hoteldetail`, {
          withCredentials: true,
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchHotelData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#3c4f7b]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f0a500]"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#3c4f7b]">
      <div className="bg-red-500/10 p-6 rounded-lg backdrop-blur-sm">
        <p className="text-red-500 font-semibold">Error fetching data: {error.message}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#3c4f7b] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Revenue Card */}
          <div className="bg-[#2a2d4e] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#f0a500] font-semibold">Total Revenue</h3>
              <Currency className="text-green-500" />
            </div>
            <p className="text-4xl font-bold text-green-500">₹{data.total_price.toLocaleString()}</p>
          </div>
          
          {/* Total Hotels Card */}
          <div className="bg-[#2a2d4e] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#f0a500] font-semibold">Total Hotels</h3>
              <Hotel className="text-blue-400" />
            </div>
            <p className="text-4xl font-bold text-blue-400">{data.hotel.length}</p>
          </div>

          {/* Animated Stats Cards (Placeholders) */}
          <div className="bg-[#2a2d4e] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#f0a500] font-semibold">Growth</h3>
              <TrendingUp className="text-purple-400" />
            </div>
            <p className="text-4xl font-bold text-purple-400">+24%</p>
          </div>

          <div className="bg-[#2a2d4e] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#f0a500] font-semibold">Bookings</h3>
              <Calendar className="text-rose-400" />
            </div>
            <p className="text-4xl font-bold text-rose-400">{profile.user.totalbookings}</p>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.hotel.map((hotel, index) => (
            <div
              key={index}
              className="group bg-[#2a2d4e] rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedHotel(hotel)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.hotel_image.url}
                  alt={hotel.hotelname}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{hotel.hotelname}</h3>
                  <div className="flex items-center text-gray-200 mt-1">
                    <MapPin size={16} className="mr-1" />
                    <p className="text-sm">{hotel.location}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-green-500">₹{hotel.room_price.toLocaleString()}</p>
                  <span className="text-[#f0a500] text-sm">per night</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hotel Details Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2a2d4e] rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl">
            <img
              src={selectedHotel.hotel_image.url}
              alt={selectedHotel.hotelname}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#f0a500] mb-2">{selectedHotel.hotelname}</h2>
              <div className="flex items-center text-gray-300 mb-4">
                <MapPin size={18} className="mr-2" />
                <p>{selectedHotel.location}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-green-500">₹{selectedHotel.room_price.toLocaleString()}</p>
                <button
                  onClick={() => setSelectedHotel(null)}
                  className="px-4 py-2 bg-[#f0a500] text-[#1a1a2e] rounded-lg hover:bg-[#f0a500]/90 
                    transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Earning;
