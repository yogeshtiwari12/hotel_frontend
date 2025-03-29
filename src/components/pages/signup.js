import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { frontend_url } from './front';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState(null); // For the file itself
  const [photoPreview, setPhotoPreview] = useState(''); // For the photo preview URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Using FormData to handle file upload
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('role', role);
    if (photo) formData.append('photo', photo);

    try {
      const response = await axios.put(
       ` ${frontend_url}/userroutes/signup`,
        formData,
        { withCredentials: true,}
      );
      console.log(response.data)

      if (response.status === 201) {
        toast.success('Signup successful');
        alert("Signup successful")
        navigate('/login');
      }
    } catch (error) {
        alert(error.response?.data?.message || 'Signup failed');
        console.error(error.response?.data?.message || 'Signup failed');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a2e]">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-[#f0a500] mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded placeholder-gray-500 focus:outline-none"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded placeholder-gray-500 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded placeholder-gray-500 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded placeholder-gray-500 focus:outline-none"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <select
              className="w-full p-2 border border-gray-300 rounded placeholder-gray-500 focus:outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4 bg-blue">
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded placeholder-gray-500 focus:outline-none"
              onChange={handlePhotoChange}
            />
          </div>
          {photoPreview && (
            <div className="mb-4 text-center">
              <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-md object-cover" />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#f0a500] text-white rounded py-2 hover:bg-[#d18f00] transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-white mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[#f0a500] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
