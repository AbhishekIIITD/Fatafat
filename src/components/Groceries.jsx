import React, { useState, useEffect } from "react";
import { Paper, Typography, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { productImageMapping } from "./productsImageMapping";

import Image from "next/image";
import ProductCard from "./ProductCard";

const Groceries = () => {
  const [groceries, setGroceries] = useState(null);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  function handleSetData(data) {
    const updatedData = data.map((product) => {
      const imageUrl = productImageMapping[product.ProductName];
      return { ...product, Product_Image: imageUrl };
    });
    setGroceries(updatedData);
  }

  useEffect(() => {
    // Fetch groceries data from the API
    fetch("/api/getGroceries")
      .then((response) => response.json())
      .then((data) => {
        handleSetData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddToCart = (product) => {
    // Implement your add to cart logic here
    console.log("Adding to cart:", product);
  };

  return (
    domLoaded && (
      <div className="flex flex-col align-middle w-full">
        <div className="groceries-list flex flex-row w-full justify-evenly">
          {groceries &&
            groceries.map((grocery) => (
              <ProductCard productID={grocery.ProductID} productName={grocery.ProductName} description = {grocery.Description} price={grocery.Price} imageUrl={grocery.Product_Image}/>
            ))}
        </div>
        {/* Show more icon */}
        <IconButton color="primary" aria-label="show more" className=" p-8">
          <ExpandMoreIcon />
        </IconButton>
      </div>
    )
  );
};

export default Groceries;
