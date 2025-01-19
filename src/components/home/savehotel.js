// import React, { useState } from 'react';
// import axios from 'axios';

// function Savehotel() {
//   const [formData, setFormData] = useState({
//     hotel_image: '',
//     hotelname: '',
//     location: '',
//     total_rooms: '',
//     room_price: '',
//     room_no: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put('http://localhost:4000/hotelroutes/savehotel', formData,{
//         withCredentials:true
//       });
//       alert('Hotel details submitted successfully!');
//       console.log(response.data);
//     } catch (error) {
//       alert('Error submitting hotel details.');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-5">Enter Hotel Details</h1>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-sm font-medium mb-1" htmlFor="hotel_image">Hotel Image URL</label>
//           <input
//             type="text"
//             id="hotel_image"
//             name="hotel_image"
//             value={formData.hotel_image}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1" htmlFor="hotelname">Hotel Name</label>
//           <input
//             type="text"
//             id="hotelname"
//             name="hotelname"
//             value={formData.hotelname}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
//           <input
//             type="text"
//             id="location"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1" htmlFor="total_rooms">Total Rooms</label>
//           <input
//             type="number"
//             id="total_rooms"
//             name="total_rooms"
//             value={formData.total_rooms}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1" htmlFor="room_price">Room Price</label>
//           <input
//             type="number"
//             id="room_price"
//             name="room_price"
//             value={formData.room_price}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1" htmlFor="room_no">Room Number</label>
//           <input
//             type="text"
//             id="room_no"
//             name="room_no"
//             value={formData.room_no}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Savehotel;
