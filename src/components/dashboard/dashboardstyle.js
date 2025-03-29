import React, { useEffect, useState } from 'react';
import { FaHotel, FaUsers, FaEdit, FaTrash, FaClipboardList, FaBookmark, FaBars, FaTimes, FaChartLine, FaMoneyBillWave, FaCalendarAlt, FaUserCheck, FaStar, FaBed, FaClock, FaArrowUp, FaArrowDown, FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { motion } from 'framer-motion';
import { fetchhoteldata } from '../redux/authslice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function DashboardStyle() {  
  const { profile } = useSelector((state) => state.auth);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');


  const dispatch = useDispatch();
  const hoteldata = useSelector((state) => state.auth.hoteldata);

  useEffect(() => {
    dispatch(fetchhoteldata());
  }, [dispatch]); 

  console.log("dd", hoteldata);



  const navItems = [
    { to: '/view-hotels', icon: FaChartLine, label: 'Analytics', bgColor: 'bg-[#003366]' },
    { to: '/allusers', icon: FaUsers, label: 'User Details', bgColor: 'bg-[#003366]' },
    { to: '/chekindata', icon: FaEdit, label: 'Check In', bgColor: 'bg-[#003366]' },
    { to: '/view-bookings', icon: FaClipboardList, label: 'View All Bookings', bgColor: 'bg-[#003366]' },
    { to: '/savehotel', icon: FaBookmark, label: 'Add Hotel', bgColor: 'bg-[#003366]' },
    { to: '/delete', icon: FaTrash, label: 'Delete', bgColor: 'bg-red-600' }
  ];

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Revenue',
      data: [30000, 45000, 38000, 52000, 48000, 60000],
      fill: true,
      backgroundColor: 'rgba(0, 51, 102, 0.1)',
      borderColor: '#003366',
      tension: 0.4
    }]
  };

  const bookingsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Weekly Bookings',
      data: [25, 32, 28, 35, 42, 38, 45],
      backgroundColor: '#f0a500',
      borderColor: '#f0a500',
      borderWidth: 1
    }]
  };

  const occupancyData = {
    labels: ['Occupied', 'Available', 'Maintenance'],
    datasets: [{
      data: [65, 25, 10],
      backgroundColor: ['#003366', '#f0a500', '#dc2626'],
      borderWidth: 0
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#4b5563',
          font: {
            size: 12
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#4b5563',
          font: {
            size: 12
          }
        }
      }
    },
    cutout: '70%'
  };

  // Enhanced chart options
  const enhancedChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        ...chartOptions.plugins.legend,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '600'
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            weight: '500'
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
          
       

        
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[#003366]/10 p-3 rounded-xl">
                    <FaMoneyBillWave className="text-[#003366] text-2xl" />
                  </div>
                  <div className="flex items-center space-x-1 text-green-500">
                    <FaArrowUp className="text-xs" />
                    <span className="text-sm font-medium">12.5%</span>
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-2">Total Revenue</h3>
                <div className="flex items-end space-x-1">
                  <span className="text-2xl font-bold text-[#003366]">₹{hoteldata}</span>
                  <span className="text-gray-400 text-sm mb-1">this month</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[#f0a500]/10 p-3 rounded-xl">
                    <FaCalendarAlt className="text-[#f0a500] text-2xl" />
                  </div>
                  <div className="flex items-center space-x-1 text-green-500">
                    <FaArrowUp className="text-xs" />
                    <span className="text-sm font-medium">8.2%</span>
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-2">Total Bookings</h3>
                <div className="flex items-end space-x-1">
                  <span className="text-2xl font-bold text-[#f0a500]">1,234</span>
                  <span className="text-gray-400 text-sm mb-1">bookings</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[#003366]/10 p-3 rounded-xl">
                    <FaUsers className="text-[#003366] text-2xl" />
                  </div>
                  <div className="flex items-center space-x-1 text-green-500">
                    <FaArrowUp className="text-xs" />
                    <span className="text-sm font-medium">15.3%</span>
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-2">Total Users</h3>
                <div className="flex items-end space-x-1">
                  <span className="text-2xl font-bold text-[#003366]">5,678</span>
                  <span className="text-gray-400 text-sm mb-1">users</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[#f0a500]/10 p-3 rounded-xl">
                    <FaUserCheck className="text-[#f0a500] text-2xl" />
                  </div>
                  <div className="flex items-center space-x-1 text-green-500">
                    <FaArrowUp className="text-xs" />
                    <span className="text-sm font-medium">5.7%</span>
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-2">Occupancy Rate</h3>
                <div className="flex items-end space-x-1">
                  <span className="text-2xl font-bold text-[#f0a500]">85%</span>
                  <span className="text-gray-400 text-sm mb-1">occupied</span>
                </div>
              </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Revenue Overview</h3>
                    <p className="text-gray-500 text-sm">Monthly revenue performance</p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaEllipsisH className="text-gray-400" />
                  </button>
                </div>
                <div className="h-80">
                  <Line data={revenueData} options={enhancedChartOptions} />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Booking Analytics</h3>
                    <p className="text-gray-500 text-sm">Weekly booking statistics</p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaEllipsisH className="text-gray-400" />
                  </button>
                </div>
                <div className="h-80">
                  <Bar data={bookingsData} options={enhancedChartOptions} />
                </div>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Room Status</h3>
                    <p className="text-gray-500 text-sm">Current occupancy overview</p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaEllipsisH className="text-gray-400" />
                  </button>
                </div>
                <div className="h-64">
                  <Doughnut data={occupancyData} options={doughnutOptions} />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {occupancyData.labels.map((label, index) => (
                    <div key={label} className="text-center">
                      <div className="text-2xl font-bold" style={{ color: occupancyData.datasets[0].backgroundColor[index] }}>
                        {occupancyData.datasets[0].data[index]}%
                      </div>
                      <div className="text-gray-500 text-sm">{label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Recent Bookings</h3>
                    <p className="text-gray-500 text-sm">Latest guest reservations</p>
                  </div>
                  <button className="text-[#003366] hover:text-[#004b8f] font-medium text-sm transition-colors">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                        <th className="pb-3 font-medium">Guest</th>
                        <th className="pb-3 font-medium">Room</th>
                        <th className="pb-3 font-medium">Check In</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-gray-100">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-[#003366]/10 flex items-center justify-center">
                              <span className="text-[#003366] font-medium">JD</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">John Doe</div>
                              <div className="text-gray-500 text-xs">john@example.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <FaBed className="text-[#f0a500]" />
                            <span>Room 101</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <FaClock className="text-gray-400" />
                            <span>Aug 15, 2023</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Confirmed
                          </span>
                        </td>
                        <td className="py-4">
                          <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <FaEllipsisH />
                          </button>
                        </td>
                      </tr>
                      {/* Similar styling for other rows */}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardStyle; 