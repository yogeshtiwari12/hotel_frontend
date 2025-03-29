import React, { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  Activity, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const CircularProgressBar = ({ percentage, label }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const progressColor =
    percentage >= 90
      ? 'text-green-700'
      : percentage >= 80
      ? 'text-yellow-500'
      : 'text-green-500';

  return (
    <div className="relative w-40 h-40 flex flex-col items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#E0E7FF"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${progressColor} transition-all duration-700 ease-in-out`}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{percentage}%</span>
        {/* <span className="text-sm text-gray-500">{label}</span> */}
      </div>
    </div>
  );
};

// Revenue Chart Data
const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

function Dash() {
  const [activeTab, setActiveTab] = useState('monthly');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Activity className="mr-3 text-blue-500" />
            Dashboard
          </h1>
          <div className="bg-white shadow-md rounded-lg">
            <button 
              className={`px-4 py-2 rounded-l-lg ${activeTab === 'monthly' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`px-4 py-2 rounded-r-lg ${activeTab === 'yearly' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Revenue and Users Card */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="flex items-center text-green-500">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span>12.5%</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">$45,231.89</h3>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <div className="flex items-center mt-4">
              <Users className="mr-2 text-blue-500" />
              <p className="text-sm text-gray-500">Total Users: 1,235</p>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow w-full">
            <CircularProgressBar 
              percentage={75} 
              label="Goal Completion" 
            />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">Project Progress</h3>
              <p className="text-sm text-gray-500">75% Completed</p>
              <p className="text-xs text-gray-400 mt-2">Criteria: Red  80%, Yellow 80%-89%, Green ≥ 90%</p>
            </div>
          </div>

          {/* Revenue Chart Card */}
          <div className="col-span-full bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Revenue Overview</h3>
              <div className="flex space-x-2">
                <button 
                  className={`px-3 py-1 rounded-lg ${activeTab === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setActiveTab('monthly')}
                >
                  Monthly
                </button>
                <button 
                  className={`px-3 py-1 rounded-lg ${activeTab === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setActiveTab('yearly')}
                >
                  Yearly
                </button>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
