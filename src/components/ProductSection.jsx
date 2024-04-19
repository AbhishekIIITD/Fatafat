import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import Image from "next/image";
import { productImageMapping } from "./productsImageMapping";

export const ProductSection = () => {
  const [data, setData] = useState(null);
  const [domLoaded, setDomLoaded] = useState(false);

  function handleSetData(data){
    const updatedData = data.map((product) => {
        const imageUrl = productImageMapping[product.ProductName];
        return { ...product, Product_Image: imageUrl };
    });
    setData(updatedData)
  }

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    // Fetch data from the API route
    fetch("/api/getProducts")
      .then((response) => response.json())
      .then((data) => {
        handleSetData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Dynamically import UIkit and initialize slider
    import('uikit').then((uikit) => {
      if (uikit && uikit.default && typeof uikit.default.use === 'function') {
        uikit.default.use(uikit.default.slider);
        // Initialize the slider with autoplay
        uikit.default.slider('.uk-slider', { autoplay: true, autoplayInterval: 500  });
      }
    }).catch((error) => {
      console.error("Error importing UIkit:", error);
    });
  }, []);

  return (
    domLoaded && (
      <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" data-uk-slider>
        <ul className="uk-slider-items uk-child-width-1-6@s uk-grid">
          {data && data.map((product) => (
            <li key={product.ProductID}>
              <Paper elevation={3} className="p-2">
                <div className="max-w-xl">
                  <div className="mb-2">
                    <Image
                      src={product.Product_Image}
                      alt={product.ProductName}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </div>
                  <Typography variant="h6" className="mb-1">
                    {product.ProductName}
                  </Typography>
                  <Typography variant="body2">{product.Description}</Typography>
                </div>
              </Paper>
            </li>
          ))}
        </ul>

        <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-previous data-uk-slider-item="previous"></a>
        <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-next data-uk-slider-item="next"></a>
      </div>
    )
  );
};
