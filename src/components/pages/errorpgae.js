import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-2">Oops! The page you are looking for does not exist.</p>
      <Link 
        to="/" 
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default ErrorPage;
