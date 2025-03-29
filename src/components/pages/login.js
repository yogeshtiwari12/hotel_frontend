import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { frontend_url } from './front';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${frontend_url}/userroutes/login`, {

        email, password
      }, {
        withCredentials: true
      }
      )
      if (response.status === 200) {
  
        toast.success("Login successful!", {
  
        });
  

          navigate('/');
        window.location.reload();

      }
    }
    catch (error) {
      toast.error("Invalid credentials")
      alert("Invalid credentials")
    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-[#1a1a2e]">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-[#f0a500] mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
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
          {/* <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded placeholder-gray-500 focus:outline-none"
              placeholder="Enter your role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-[#f0a500] text-white rounded py-2 hover:bg-[#d18f00] transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-white mt-4">
          Don't have an account?
          <Link to="/signup" className="text-[#f0a500] hover:underline"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
