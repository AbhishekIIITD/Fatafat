import React, { useState, useEffect } from "react";
import { IconButton, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductCard from "./ProductCard";
import { productImageMapping } from "./productsImageMapping";

const Electronics = () => {
  const [electronicsData, setElectronicsData] = useState(null);
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
          {electronicsData &&
            electronicsData
              .slice(0, expanded ? electronicsData.length : 4) // Display up to 3 items by default
              .map((electronicsItem) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={electronicsItem.ProductID}
                  container
                  justifyContent="center" // Center content horizontally
                  alignItems="center" // Center content vertically
                >
                  <ProductCard
                    productID={electronicsItem.ProductID}
                    productName={electronicsItem.ProductName}
                    description={electronicsItem.Description}
                    price={electronicsItem.Price}
                    imageUrl={electronicsItem.Product_Image}
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

export default Electronics;
