import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { frontend_url } from './front';
import toast from 'react-hot-toast';

function Saveroomdata() {
    const { id } = useParams(); 
    const [hotelname, setHotelname] = useState('');
    const [roomType, setRoomType] = useState('');
    const [description, setDescription] = useState('');
    const [photo1, setPhoto1] = useState(null);
    const [photo2, setPhoto2] = useState(null);
    const [photo3, setPhoto3] = useState(null);

 
    const handleSubmit = async (e) => {
        e.preventDefault();
       

        const formData = new FormData();
        formData.append('hotelname', hotelname);
        formData.append('roomType', roomType);
        formData.append('description', description);
        if (photo1) formData.append('photo1', photo1);
        if (photo2) formData.append('photo2', photo2);
        if (photo3) formData.append('photo3', photo3);

        try {
            const response = await axios.put(`${frontend_url}/hotelroutes/saveroomdetails/${id}`, formData, {
            
                withCredentials: true,
            });
            console.log(response.data);
          
            toast.success("Room details saved successfully!");
            setHotelname('');
            setRoomType('');
            setDescription('');
            setPhoto1(null);
            setPhoto2(null);
            setPhoto3(null);
        } catch (error) {
            console.error('Error saving room details:', error.message);
            toast.error("Error saving room details: " + (error.response?.data?.message || error.message));

        }
    };

    const handleImageChange = (index, file) => {
        if (index === 1) setPhoto1(file);
        else if (index === 2) setPhoto2(file);
        else if (index === 3) setPhoto3(file);
    };

    return (
        <div className="container mx-auto p-6 h-screen flex items-center justify-center">
            <div className="w-full max-w-lg p-8 bg-white border border-gray-200 shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#f0a500]">Save Room Details</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            value={hotelname}
                            onChange={(e) => setHotelname(e.target.value)}
                            placeholder="Hotel Name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0a500] transition"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            placeholder="Room Type"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0a500] transition"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0a500] transition"
                            required
                        />
                    </div>

                    {/* Photo 1 with Preview */}
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(1, e.target.files[0])}
                            className="w-full p-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0a500] transition"
                        />
                        {photo1 && (
                            <img
                                src={URL.createObjectURL(photo1)}
                                alt="Preview 1"
                                className="mt-2 h-20 w-20 object-cover rounded-lg"
                            />
                        )}
                    </div>

                    {/* Photo 2 with Preview */}
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(2, e.target.files[0])}
                            className="w-full p-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0a500] transition"
                        />
                        {photo2 && (
                            <img
                                src={URL.createObjectURL(photo2)}
                                alt="Preview 2"
                                className="mt-2 h-20 w-20 object-cover rounded-lg"
                            />
                        )}
                    </div>

                    {/* Photo 3 with Preview */}
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(3, e.target.files[0])}
                            className="w-full p-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0a500] transition"
                        />
                        {photo3 && (
                            <img
                                src={URL.createObjectURL(photo3)}
                                alt="Preview 3"
                                className="mt-2 h-20 w-20 object-cover rounded-lg"
                            />
                        )}
                    </div>

                                   <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#f0a500] text-white font-semibold rounded-lg hover:bg-opacity-90 transition"
                        >
                            Save Room Details
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Saveroomdata;
