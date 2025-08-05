'use client'

import React, { useState, useEffect } from "react"

const BlockAnnouncement = () => {
  // return null

  // The following is an example that can be used for future banner alert
  // Comment Out The Above Line ( return null ; ) and uncomment the below

  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Track when component mounts to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle banner dismissal
  const handleDismiss = () => {
    setIsVisible(false);
    // Wait for fade out animation to complete before removing from DOM
    setTimeout(() => {
      setIsDismissed(true);
    }, 700);
  };

  // Don't render if dismissed
  if (isDismissed) {
    return null;
  }

  return (
    <div className={`from-[#0E002A] via-[#240b50] to-[#9a227a] py-5 w-full shadow-lg transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center relative">
          {/* Close button - only show after mount to prevent hydration issues */}
          {/* {isMounted && (
            <button
              onClick={handleDismiss}
              className="absolute top-0 right-0 md:top-[-8px] md:right-[-8px] p-2 text-gray-300 hover:text-white transition-colors duration-200 group"
              aria-label="Dismiss banner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )} */}

          <div className={`flex items-center gap-4 mb-3 md:mb-0 ${isMounted ? 'pr-8' : ''}`}>{/* Only add padding after mount */}
            <div className="transform hover:scale-110 transition-transform duration-300">
              {/* <PinkIcon /> */}
            </div>
            <div>
              <h2 className="text-[16px] md:text-[18px] font-extrabold text-white leading-tight">
                <span className="text-primary">Become a sustainer!</span> 
              </h2>
              <p className="text-[14px] text-gray-200 mt-1 max-w-2xl">
                Join the Eclipse Temurin Sustainer Program to support Eclipse Temurin, the fastest-growing open source JDK. Your support fuels stronger security, faster releases, ready-to-deploy builds, quality testing and community development. <a href="/sustainers/" target="_blank" rel="noopener noreferrer" className="text-primary">Learn more!</a>
              </p>
            </div>
          </div>
          {/* <div className="mt-2 md:mt-0">
            <a
              href="https://github.com/adoptium/temurin/issues/89"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-full tr"
            >
              View Progress by Platform
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default BlockAnnouncement
