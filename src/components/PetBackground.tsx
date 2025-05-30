import React from 'react';

const PetBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#a0e7e5] via-[#fef9ef] to-[#ffd6a5]">
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="dots" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
};

export default PetBackground;