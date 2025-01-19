import React, { useState } from 'react';
import { FaHotel, FaUsers, FaEdit, FaTrash, FaClipboardList, FaBookmark, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Earning from '../pages/earning';
import { useAuth } from '../context.js/context';

function DashboardStyle() {  
  const { profile } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const navItems = [
    { to: '/view-hotels', icon: FaHotel, label: 'View Hotels', bgColor: 'bg-[#003366]' },
    { to: '/allusers', icon: FaUsers, label: 'User Details', bgColor: 'bg-[#003366]' },
    { to: '/chekindata', icon: FaEdit, label: 'Check In', bgColor: 'bg-[#003366]' },
    { to: '/view-bookings', icon: FaClipboardList, label: 'View All Bookings', bgColor: 'bg-[#003366]' },
    { to: '/savehotel', icon: FaBookmark, label: 'Add Hotel', bgColor: 'bg-[#003366]' },
    { to: '/delete', icon: FaTrash, label: 'Delete', bgColor: 'bg-red-600' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 p-2 rounded-lg transition-all duration-300 ease-in-out
            hover:bg-gray-100 hover:scale-105 hover:shadow-md"
        >
          {isMobileMenuOpen ? 
            <FaTimes className="text-2xl transform transition-transform hover:rotate-90 duration-300" /> : 
            <FaBars className="text-2xl transform transition-transform hover:rotate-180 duration-300" />
          }
        </button>
      </div>

      {/* Dashboard Container */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:sticky top-0 left-0 h-screen z-40 
            md:translate-x-0 transition-all duration-300 ease-in-out 
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
            ${isSidebarExpanded ? 'w-64' : 'md:w-20'} 
            bg-[#1a1a2e] text-white overflow-y-auto
            hover:shadow-2xl
          `}
          onMouseEnter={() => window.innerWidth >= 768 && setIsSidebarExpanded(true)}
          onMouseLeave={() => window.innerWidth >= 768 && setIsSidebarExpanded(false)}
        >
          <div className="flex flex-col items-center mb-8 px-4 pt-4">
            {(isSidebarExpanded || isMobileMenuOpen) && (
              <div className="p-4 bg-[#003366]/10 rounded-2xl backdrop-blur-sm w-full
                transform transition-all duration-300 hover:scale-102 hover:bg-[#003366]/20">
                <img 
                  src={profile?.user?.photo?.url} 
                  alt="Admin" 
                  className="w-24 h-24 rounded-full border-2 border-[#003366] mx-auto mb-4 
                    transition-all duration-300 hover:scale-105 hover:border-[#00509e] hover:rotate-3
                    shadow-lg hover:shadow-xl" 
                />
                <h2 className="text-center text-2xl font-bold text-yellow-400 
                  transition-all duration-300 hover:text-yellow-300">{profile?.user?.name}</h2>
                <p className="text-center text-gray-300 text-sm mt-1 
                  transition-all duration-300 hover:text-white">{profile?.user?.email}</p>
              </div>
            )}
          </div>

          <nav className="space-y-3 px-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  flex items-center 
                  ${isSidebarExpanded || isMobileMenuOpen ? 'justify-start px-4' : 'justify-center'} 
                  ${item.bgColor} rounded-xl p-3 
                  transform transition-all duration-300 
                  hover:translate-x-2 hover:scale-105 hover:brightness-110 
                  hover:shadow-lg hover:shadow-[#003366]/20
                  active:scale-95
                  ${activeTab === item.to ? 'ring-2 ring-white ring-opacity-20' : ''} 
                  group
                `}
                onClick={() => {
                  setActiveTab(item.to);
                  if (window.innerWidth < 768) setIsMobileMenuOpen(false);
                }}
              >
                <item.icon className={`
                  text-xl text-white 
                  transition-all duration-300 
                  group-hover:scale-110 group-hover:rotate-6
                  ${!isSidebarExpanded && !isMobileMenuOpen && 'mx-auto'}
                `} />
                {(isSidebarExpanded || isMobileMenuOpen) && (
                  <span className="ml-3 text-white font-medium 
                    transition-all duration-300 
                    group-hover:pl-1">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden 
              transition-opacity duration-300 ease-in-out"
            onClick={() => setIsMobileMenuOpen(false)} 
          />
        )}

        {/* Main Content */}
        <main className={`
          flex-1 transition-all duration-300
          ${isMobileMenuOpen ? 'blur-sm' : ''}
          bg-gray-100 
          hover:bg-gray-50
        `}>
          <div className="transition-all duration-300 hover:scale-[1.01]">
            <Earning />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardStyle;