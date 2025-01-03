import React, { useState, useEffect } from "react";
import { IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { productImageMapping } from "./productsImageMapping";
import ClothingCard from "./clothingCard";

const Cloths = () => {
  const [clothes, setClothes] = useState(null);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const handleSetData = (data) => {
    const updatedData = data.map((product) => {
      const imageUrl = productImageMapping[product.ProductName];
      return { ...product, Product_Image: imageUrl };
    });
    setClothes(updatedData);
  };

  useEffect(() => {
    // Fetch clothes data from the API
    fetch("/api/getCloths")
      .then((response) => response.json())
      .then((data) => {
        handleSetData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    domLoaded && (
      <div className="flex flex-col items-center justify-center w-full p-4 ">
        {/* Header */}
        <Typography
          variant="h4"
          className="text-center text-gray-800 font-bold mb-6"
        >
          Our Latest Collection
        </Typography>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl justify-center">
          {clothes &&
            clothes.slice(0, 8).map((clothing) => (
              <div className="flex justify-center">
                <ClothingCard
                  key={clothing.ProductID}
                  id={clothing.ProductID}
                  name={clothing.ProductName}
                  description={clothing.Description}
                  image={clothing.Product_Image}
                  price={clothing.Price}
                />
              </div>
            ))}
        </div>

        {/* Show More Section */}
        <div className="flex flex-col items-center mt-6">
          <IconButton
            color="primary"
            aria-label="show more"
            className="p-4 hover:scale-110 transition-transform"
          >
            <ExpandMoreIcon fontSize="large" />
          </IconButton>
          <Typography variant="body2" className="text-gray-600 mt-2">
            Show More
          </Typography>
        </div>
      </div>
    )
  );
};

export default Cloths;
