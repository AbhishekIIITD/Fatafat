import React, { useState, useEffect } from "react";
import { IconButton, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { productImageMapping } from "./productsImageMapping";
import ProductCard from "./ProductCard";

const Groceries = () => {
  const [groceries, setGroceries] = useState(null);
  const [domLoaded, setDomLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCompressClick = () => {
    setExpanded(false);
  };

  return (
    domLoaded && (
      <div className="flex flex-col items-center w-full">
        <Grid container spacing={2} justifyContent="center">
          {groceries &&
            groceries
              .slice(0, expanded ? groceries.length : 4) // Display up to 4 items per row
              .map((grocery) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3} // Adjust md={3} to fit 4 items per row
                  key={grocery.ProductID}
                  container
                  justifyContent="center" // Center content horizontally
                  alignItems="center" // Center content vertically
                >
                  <ProductCard
                    productID={grocery.ProductID}
                    productName={grocery.ProductName}
                    description={grocery.Description}
                    price={grocery.Price}
                    imageUrl={grocery.Product_Image}
                  />
                </Grid>
              ))}
        </Grid>
        {/* Show more icon */}
        {!expanded && (
          <IconButton
            color="primary"
            aria-label="show more"
            className="p-8"
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
        {expanded && (
          <IconButton
            color="primary"
            aria-label="compress"
            className="p-8"
            onClick={handleCompressClick}
          >
            <ExpandMoreIcon style={{ transform: "rotate(180deg)" }} />
          </IconButton>
        )}
      </div>
    )
  );
};

export default Groceries;
