import React from "react";
import Image from "next/image";
import { Typography, Button } from "@mui/material";

const ElectronicsGrid = () => {
  const electronics =  [
    {
      id: 1,
      name: "Laptop",
      description: "High-performance laptop for professionals.",
      image: "/product/Laptop.jpg",
      link: "/product/Laptop",
    },
    {
      id: 2,
      name: "Smartphone",
      description: "Latest smartphone with cutting-edge features.",
      image: "/product/smartphone.jpg",
      link: "/products/smartphone",
    },
    {
      id: 3,
      name: "Tablet",
      description: "Lightweight tablet perfect for work and play.",
      image: "/product/Tablet.jpg",
      link: "/products/tablet",
    },
    {
      id: 4,
      name: "Smartwatch",
      description: "Track your fitness and stay connected.",
      image: "/product/SmartWatch.jpg",
      link: "/products/smartwatch",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full p-6 bg-gray-50">
      {/* Header */}
      <Typography
        variant="h4"
        className="text-center text-gray-800 font-bold mb-8"
      >
        Explore Our Electronics
      </Typography>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
        {electronics.map((item, index) => (
          <div
            key={item.id}
            className={`relative flex flex-col items-center bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg ${
              index % 2 === 0 ? "row-span-2" : "row-span-1"
            }`}
          >
            <div className={`w-full ${index % 2 === 0 ? "h-60" : "h-40"} relative mb-4`}>
              <Image
                src={item.image}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <Typography variant="h6" className="text-gray-800 font-semibold">
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-600 text-center mt-2 mb-4"
            >
              {item.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.href = item.link}
              className="mt-auto"
            >
              Explore
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectronicsGrid;