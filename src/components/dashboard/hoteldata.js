import React, { useEffect, useState } from 'react';
import { 
  MapPin, 
  IndianRupee, 
  Hotel, 
  Loader2, 
  Search,
  Plus,
  Star,
  Trash2,
  Edit2,
  X,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { frontend_url } from '../pages/front';
function Hoteldata() {
  const [hotels, setHotels] = useState([]);
  const [price2, setprice] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
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
        const response = await axios.get(`${frontend_url}/hotelroutes/hoteldetail`,{
          withCredentials: true,
        });
        setprice(response);
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
      const response = await axios.delete(`${frontend_url}/hotelroutes/deleteone/${hotelId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setHotels(hotels.filter((h) => h._id !== hotelId));
        setShowDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
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
        `${frontend_url}/hotelroutes/update/${editHotel._id}`,
        editHotel,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setHotels((prev) =>
          prev.map((hotel) =>
            hotel._id === editHotel._id ? { ...hotel, ...editHotel } : hotel
      )
    );
    setIsEditing(false);
  
      }
    } catch (error) {
      console.error('Error updating hotel:', error);
    }
  };

  const filteredHotels = hotels.filter(hotel => 
    hotel.hotelname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#f0a500] mx-auto" />
          <p className="mt-4 text-gray-400">Loading hotel data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-center mb-8 ">
          <div className='flex flex-col gap-2 justify-center items-center'>
            <h1 className="text-2xl font-bold text-white mb-1">
              Hotel Management Dashboard
            </h1>
      
          </div>
          
        
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700 group"
            >
              <div className="relative h-48">
                <img
                  src={hotel.hotel_image?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3'}
                  alt={hotel.hotelname}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-xl font-bold text-white mb-1">
                    {hotel.hotelname}
                  </h2>
                  <div className="flex items-center text-[#f0a500]">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-[#f0a500]" />
                    <span>{hotel.location}</span>
                  </div>
                  <div className="flex items-center text-green-500 font-semibold">
                    <IndianRupee className="w-4 h-4 mr-2" />
                    <span>{hotel.room_price} / night</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Hotel className="w-4 h-4 mr-2 text-[#f0a500]" />
                    <span>{hotel.total_rooms} Available Rooms</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-700">
                  <button
                    onClick={() => handleUpdate(hotel)}
                    className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(hotel._id)}
                    className="flex-1 bg-red-500/10 text-red-500 py-2 px-4 rounded-lg hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Update Hotel Details</h2>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Hotel Name</label>
                  <input
                    type="text"
                    name="hotelname"
                    value={editHotel.hotelname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#f0a500]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editHotel.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#f0a500]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Room Price</label>
                  <input
                    type="number"
                    name="room_price"
                    value={editHotel.room_price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#f0a500]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Total Rooms</label>
                  <input
                    type="number"
                    name="total_rooms"
                    value={editHotel.total_rooms}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#f0a500]"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-[#f0a500] text-white py-2 px-4 rounded-lg hover:bg-[#f0a500]/90 transition-colors"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full border border-gray-700 shadow-xl">
              <div className="flex items-center gap-4 mb-4 text-red-500">
                <AlertCircle className="w-8 h-8" />
                <h3 className="text-lg font-semibold text-white">Confirm Deletion</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this hotel? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hoteldata;
