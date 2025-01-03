import React from "react";
import Image from "next/image";

const ProductHero = ({ product, color, offer, imageUrl }) => {
  return (
    <div
      className="flex flex-col sm:flex-row items-center p-12 rounded-lg shadow-lg my-4"
      style={{ backgroundColor: color }}
    >
      {/* Left Side: Product Name and Offer */}
      <div className="flex-1 text-center sm:text-left mb-4 mr-4 sm:mb-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{product}</h2>
        <p className="mt-2 text-base sm:text-lg text-gray-600">{offer}</p>
      </div>

      {/* Right Side: Product Image */}
      <div className="flex-shrink-0">
        <Image
          src={imageUrl}
          alt={product}
          height={100}
          width={100}
                      objectFit="contain"
                      objectPosition="center"
        />
      </div>
    </div>
  );
};

export default ProductHero;
