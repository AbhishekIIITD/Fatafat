import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductCard from "./ProductCard";
import { productImageMapping } from "./productsImageMapping";

const Electronics = () => {
  const [electronicsData, setElectronicsData] = useState(null);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  function handleSetData(data) {
    const updatedData = data.map((product) => {
      const imageUrl = productImageMapping[product.ProductName];
      return { ...product, Product_Image: imageUrl };
    });
    setElectronicsData(updatedData);
  }

  useEffect(() => {
    // Fetch Electronics data from the API
    fetch("/api/getElectronics")
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
        <div className="electronics-list flex flex-row w-full justify-evenly">
          {electronicsData &&
            electronicsData.map((electronicsItem) => (
              <ProductCard
                productID={electronicsItem.ProductID}
                productName={electronicsItem.ProductName}
                description={electronicsItem.Description}
                price={electronicsItem.Price}
                imageUrl={electronicsItem.Product_Image}
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

export default Electronics;
