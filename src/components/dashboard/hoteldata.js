import React, { useEffect, useState } from 'react';
import { MapPin, IndianRupee, Hotel, Loader2 } from 'lucide-react';
import axios from 'axios';

function Hoteldata() {
  const [hotels, setHotels] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editHotel, setEditHotel] = useState({
    _id: '',
    hotelname: '',
    location: '',
    room_price: '',
    total_rooms: '',
  });

  useEffect(() => {
    async function fetchHotels() {
      try {
        const response = await axios.get('http://localhost:4000/hotelroutes/hoteldetail');
        setHotels(response.data.hotel);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  const handleDelete = async (hotelId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/hotelroutes/deleteone/${hotelId}`,{
        withCredentials: true,
      });
      if (response.status === 200) {
        setHotels(hotels.filter((h) => h._id !== hotelId));
        alert('Hotel deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
      alert('Error deleting hotel');
    }
  };

  const handleUpdate = (hotel) => {
    setIsEditing(true);
    setEditHotel({
      _id: hotel._id,
      hotelname: hotel.hotelname,
      location: hotel.location,
      room_price: hotel.room_price,
      total_rooms: hotel.total_rooms,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditHotel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/hotelroutes/update/${editHotel._id}`, 
        editHotel,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setHotels((prev) =>
          prev.map((hotel) =>
            hotel._id === editHotel._id ? { ...hotel, ...editHotel } : hotel
          )
        );
        setIsEditing(false);
        alert('Hotel updated successfully');
      }
    } catch (error) {
      console.error('Error updating hotel:', error);
      alert('Error updating hotel');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-500">
          Hotel Dashboard
        </h1>

        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
              <h2 className="text-xl text-center   font-bold mb-4 text-blue-500">Update Hotel Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                  <input
                    type="text"
                    name="hotelname"
                    value={editHotel.hotelname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editHotel.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Price</label>
                  <input
                    type="number"
                    name="room_price"
                    value={editHotel.room_price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Rooms</label>
                  <input
                    type="number"
                    name="total_rooms"
                    value={editHotel.total_rooms}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button 
                    type="submit" 
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition  outline-none"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-[#f0a500]"
            >
              <div className="relative h-36">
                <img
                  src={hotel.hotel_image?.url || '/api/placeholder/400/300'}
                  alt={hotel.hotelname}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h2 className="absolute bottom-2 left-3 text-lg font-semibold text-white">
                  {hotel.hotelname}
                </h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-1">
                  <div className="flex items-center text-md text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{hotel.location}</span>
                  </div>
                  <div className="flex items-center text-md text-green-500 font-semibold">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    <span>{hotel.room_price}</span>
                  </div>
                  <div className="flex items-center text-md text-gray-600">
                    <Hotel className="w-4 h-4 mr-1" />
                    <span>{hotel.total_rooms} Rooms</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleUpdate(hotel)}
                    className="flex-1 bg-blue-500 text-white py-1.5 px-3 rounded-md text-sm hover:bg-blue-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    className="flex-1 bg-red-400 text-white py-1.5 px-3 rounded-md text-sm hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hoteldata;