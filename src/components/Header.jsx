import React from "react";
import Navbar from "./NavBar";

export const Header = () => {
  return (
    <header className="hero w-full h-screen relative">
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
    </header>
  );
};
