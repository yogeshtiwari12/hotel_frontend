import axios from 'axios';
import Cookie from "js-cookie";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from './context.js/context';
import { FiUser } from 'react-icons/fi'; 

function Navbar() {
  const { profile } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log(profile)

  const isAdmin = profile?.user?.role === 'admin';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/userroutes/logout',
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        Cookie.remove("token");
        window.location.reload();
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="relative w-full bg-[#1a1a2e] shadow-lg">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="text-md font-bold text-white text-2xl">
          <h3>Hotel<span className="text-2xl text-[#f0a500]">Dekho</span></h3>
        </div>

        {/* Desktop Links */} 
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            <li><Link to="/" className="text-sm font-semibold text-white hover:text-[#f0a500] duration-300">Home</Link></li>
            <li><Link to="/rooms" className="text-sm font-semibold text-white hover:text-[#f0a500] duration-300">Rooms</Link></li>
            <li><Link to="/services" className="text-sm font-semibold text-white hover:text-[#f0a500] duration-300">Services</Link></li>
            <li><Link to="/about" className="text-sm font-semibold text-white hover:text-[#f0a500] duration-300">About</Link></li>
            <li><Link to="/contactus" className="text-sm font-semibold text-white hover:text-[#f0a500] duration-300">Contact</Link></li>
          </ul>
        </div>

        {/* User Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {profile ? (
            <>
              {isAdmin && (
                <Link to="/dashboard" className="rounded-md bg-[#f0a500] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#d18f00]">
                  Dashboard
                </Link>
              )}
              <div className="flex items-center space-x-2">
                <button onClick={logout} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                  Logout
                </button>
                <Link to="/userprofile" className="flex items-center bg-[#f0a500] rounded-full h-9 w-9 p-2 hover:bg-[#d18f00] transition duration-300 border-2 border-white">
                  <FiUser className="text-white text-2xl" />
                </Link>
              </div>
            </>
          ) : (
            <Link to="/login" className="rounded-md bg-[#f0a500] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#d18f00]">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none" aria-expanded={isMobileMenuOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#1a1a2e] px-4 pt-2 pb-4">
          <ul className="space-y-2">
            <li><Link to="/" className="block text-white hover:text-[#f0a500] text-center py-2">Home</Link></li>
            <li><Link to="/rooms" className="block text-white hover:text-[#f0a500] text-center py-2">Rooms</Link></li>
            <li><Link to="/services" className="block text-white hover:text-[#f0a500] text-center py-2">Services</Link></li>
            <li><Link to="/about" className="block text-white hover:text-[#f0a500] text-center py-2">About</Link></li>
            <li><Link to="/contactus" className="block text-white hover:text-[#f0a500] text-center py-2">Contact</Link></li>
            <li>
              {profile ? (
                <>
                  {isAdmin && (
                    <Link to="/dashboard" className="block rounded-md bg-[#f0a500] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#d18f00] text-center">
                      Dashboard
                    </Link>
                  )}
                  <button onClick={logout} className="block rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 text-center">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="block rounded-md bg-[#f0a500] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#d18f00] text-center">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
