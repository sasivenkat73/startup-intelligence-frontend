import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Fetching your dashboard data...",
  "Crunching the latest numbers...",
  "Organizing your metrics...",
  "Warming up the charts...",
  "Just a moment, almost ready..."
];

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Change the message every 2.5 seconds
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => 
        // Stop at the last message rather than looping back to the start,
        // which can make the user feel like the process restarted.
        prevIndex < loadingMessages.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-slate-600">
      {/* Animated Spinner */}
      <svg 
        className="mb-4 h-10 w-10 animate-spin text-blue-500" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      
      {/* Rotating Message with a subtle fade animation */}
      <div 
        key={messageIndex} 
        className="animate-fade-in-up text-xl font-medium"
      >
        {loadingMessages[messageIndex]}
      </div>
    </div>
  );
}