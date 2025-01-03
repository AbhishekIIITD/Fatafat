import React from "react";
import Navbar from "./NavBar";
import { useMediaQuery } from '@mui/material';

export const Header = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  return (
    <>{isSmallScreen ? (
  
    <header className="hero w-full h-screen relative flex flex-col">
      <Navbar />
      {/* Hero Content */}
      <div className="flex flex-col md:flex-row w-full h-full items-center md:items-start justify-center md:justify-between p-6 md:p-20">
        {/* Left Section: Text */}
        <div className="flex flex-col w-full md:w-1/2 space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600">
            Fatafat
          </h1>
          <p className="text-2xl md:text-4xl font-semibold text-gray-800">
            One Stop Shop For
          </p>
          <ul className="space-y-2">
            <li className="text-2xl md:text-4xl font-semibold text-gray-900">
              Groceries
            </li>
            <li className="text-2xl md:text-4xl font-semibold text-gray-900">
              Clothes
            </li>
            <li className="text-2xl md:text-4xl font-semibold text-gray-900">
              Electronics
            </li>
          </ul>
          <button className="mt-6 py-2 px-6 bg-blue-600 text-white text-lg md:text-xl rounded-full shadow-lg hover:bg-blue-700 transition">
            Shop Now
          </button>
        </div>

        {/* Right Section: Image */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <img
            src="/heroSec.png"
            alt="Your Image"
            className="w-full md:w-4/5 h-auto object-contain pointer-events-none"
          />
        </div>
      </div>
    </header>
    ) : (
      <><header className="hero w-full h-screen relative">
      <Navbar />
      <img
        src="/heroSec.png"
        alt="Your Image"
        className="absolute pointer-events-none inset-0 w-4/5 h-full object-contain translate-x-96 translate-y-8"
      />
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col w-1/2 h-full pt-20 pl-28 ">
        <div className="text-6xl font-extrabold text-left text-blue-600 translate-y-[-3rem]">Fatafat</div>
          <div className="text-6xl font-bold mb-4 shadow-lg text-black">One Stop Shop</div>
          <div className="text-6xl font-bold mb-4 shadow-lg text-black">For</div>
          <div className="text-6xl font-bold mb-4 shadow-lg text-black">Groceries</div>
          <div className="text-6xl font-bold mb-4 shadow-lg text-black">Clothes</div>
          <div className="text-6xl font-bold shadow-lg text-black">Electronics</div>
          
        </div>
      </div>
    </header></>
    )}</>
    
  );
};
