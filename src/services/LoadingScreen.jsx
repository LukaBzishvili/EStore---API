import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin w-16 h-16"></div>
    </div>
  );
};

export default LoadingScreen;
