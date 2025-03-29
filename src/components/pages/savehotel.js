import React, { useState } from 'react';
import axios from 'axios';
import { frontend_url } from './front';
import toast from 'react-hot-toast';

function SaveHotel() {
  const [hotelname, setHotelName] = useState(''); 
  const [location, setLocation] = useState('');
  const [total_rooms, setTotalRooms] = useState('');
  const [room_price, setRoomPrice] = useState(''); 

  const [hotel_image, setHotelImage] = useState(null); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHotelImage(file); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (total_rooms <= 0 || room_price <= 0) {
   toast.success("No Room left", )
      return;
    }

    try {
      const hotelData = new FormData();
      hotelData.append('hotelname', hotelname); 
      hotelData.append('location', location);
      hotelData.append('total_rooms', total_rooms); 
      hotelData.append('room_price', room_price); 
   
      if (hotel_image) {
        hotelData.append('hotel_image', hotel_image); 
      }
      
      const response = await axios.put(`${frontend_url}/hotelroutes/savehotel`, hotelData, {
     
        withCredentials: true,
      });

      if (response.status) {
        toast.success("Hotel registered successfully!", )
        console.log("hotel registered successfully!");
     
        setHotelName('');
        setLocation('');
        setTotalRooms('');
        setRoomPrice('');
     
        setHotelImage(null);
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a2e] ">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-8 w-96 mb-6">
        <h2 className="text-2xl font-bold text-center text-[#f0a500] mb-6">Register Hotel</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              aria-label="Hotel Name"
              className="w-full p-3 border border-gray-300 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f0a500]"
              placeholder="Hotel Name"
              value={hotelname} 
              onChange={(e) => setHotelName(e.target.value)} 
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              aria-label="Location"
              className="w-full p-3 border border-gray-300 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f0a500]"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              aria-label="Total Rooms"
              className="w-full p-3 border border-gray-300 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f0a500]"
              placeholder="Total Rooms"
              value={total_rooms}
              onChange={(e) => setTotalRooms(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              aria-label="Room Price"
              className="w-full p-3 border border-gray-300 rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f0a500]"
              placeholder="Room Price"
              value={room_price}
              onChange={(e) => setRoomPrice(e.target.value)} 
              required
            />
          </div>
         
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-400"
            />
          </div>
          {hotel_image && (
            <div className="mb-4 flex justify-center">
              <img src={URL.createObjectURL(hotel_image)} alt="Selected" className="w-1/4 h-1/4 rounded" />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#f0a500] text-white rounded py-3 hover:bg-[#d18f00] transition duration-200"
          >
            Register Hotel
          </button>
        </form>
      </div>
    </div>
  );
}

export default SaveHotel;
