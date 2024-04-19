import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { productImageMapping } from "./productsImageMapping";
import Image from "next/image";
import ProductCard from "./ProductCard";

const Cloths = () => {
  const [clothes, setClothes] = useState(null);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  function handleSetData(data) {
    const updatedData = data.map((product) => {
      const imageUrl = productImageMapping[product.ProductName];
      return { ...product, Product_Image: imageUrl };
    });
    setClothes(updatedData);
  }

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
      <div className="flex flex-col align-middle w-full">
        <div className="clothes-list flex flex-row w-full justify-evenly">
          {clothes &&
            clothes.map((clothing) => (
              <ProductCard
                productID={clothing.ProductID}
                productName={clothing.ProductName}
                description={clothing.Description}
                imageUrl={clothing.Product_Image}
                price={clothing.Price}
              />
            ))}
        </div>
        {/* Show more icon */}
        <IconButton color="primary" aria-label="show more" className="p-8">
          <ExpandMoreIcon />
        </IconButton>
      </div>
    )
  );
};

export default Cloths;
