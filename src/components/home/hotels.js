import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context.js/context';
 // Assuming you have this hook for user authentication context

const Hotels = () => {  
  const { profile } = useAuth();
  const isAdmin = profile?.user?.role === 'admin';
  const [hotelData, setHotelData] = useState([]);

  const fetchHotelData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/hotelroutes/gethoteldata', {
        withCredentials: true,
      });
      setHotelData(response.data.hotel); 
    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  return (
    <div className="bg-gray-100 py-2 flex flex-col justify-center sm:py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6 text-blue-600 text-center mt-4 mb-12">Available Hotels</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotelData.map((hotel) => (
            <Link 
              key={hotel._id} 
              to={isAdmin ? `/saveroomdetails/${hotel._id}` : `/roomdetails_related_to_hotel/${hotel._id}`} // Redirect based on user role
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              {/* Hotel Image */}
              <img
                src={hotel.hotel_image.url}
                alt={hotel.hotelname}
                className="h-48 w-full object-cover"
              />

              {/* Hotel Info */}
              <div className="p-4">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">{hotel.hotelname}</h3>
                <p className="text-gray-700">Location: <span className="font-semibold text-gray-900">{hotel.location}</span></p>
                <p className="text-gray-700">Total Rooms: <span className="font-semibold text-gray-900">{hotel.total_rooms}</span></p>
                <p className="text-gray-700 font-semibold">Price per Room: <span className="text-green-600">₹{hotel.room_price}</span></p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
