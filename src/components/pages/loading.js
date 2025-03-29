import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#1a1a2e]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-[#4CAF50] rounded-full animate-spin"></div>
        <p className="text-white mt-4 text-lg">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
