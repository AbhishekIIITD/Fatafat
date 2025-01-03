import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

const SmallClothingCard = (product) => {
  const { id, name, price, image } = product;
  const router = useRouter();

  const addToCart = async (customerID, productID) => {
    try {
      const response = await fetch("/api/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerID, productID }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Added to cart successfully:", data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      // Call the getUser API to check if the user is logged in
      const response = await axios.get(`/api/getUser`);

      if (response) {
        console.log(response.data.user[0]);
        const cartResponse = addToCart(response.data.user[0].Customer_id, id);
        console.log(cartResponse);
      } else {
        // If user is not logged in, redirect to the login page
        router.push("/signin");
      }
    } catch (error) {
      console.error("Error during add to cart:", error);
      router.push("/signin");
    }
  };

  const goToProduct = () => {
    console.log("Navigating to product:", id);
    router.push(`/product/${id}`);
  };

  return (
    <div className="md:w-48 w-72 p-3 bg-white shadow rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg">
      {/* Image Section */}
      <div className="h-40 w-full overflow-hidden rounded-md relative">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Details Section */}
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-800 truncate">{name}</h3>
        <p className="text-sm font-semibold text-green-600 mt-1">₹{price}</p>
      </div>

      {/* Actions */}
      <div className="mt-2 flex justify-between">
        <button
          className="text-xs px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          onClick={handleAddToCart}
        >
          Add
        </button>
        <button
          className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all"
          onClick={goToProduct}
        >
          ❤️
        </button>
      </div>
    </div>
  );
};

export default SmallClothingCard;
