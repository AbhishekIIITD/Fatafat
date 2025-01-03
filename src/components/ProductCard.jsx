import React, { useState, useEffect } from "react";
import { Paper, Typography, Button, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProductCard = ({ productID, productName, description, price, imageUrl }) => {
  const [quantitySelected, changeQuantitySelected] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchInitialQuantity = async () => {
      try {
        const quantity = await countProductsInCart(productID);
        changeQuantitySelected(quantity);
      } catch (error) {
        console.error("Error fetching initial quantity:", error);
      }
    };
    fetchInitialQuantity();
  }, [productID]);

  const countProductsInCart = async (productID) => {
    try {
      const { data } = await axios.get(`/api/getUser`);
      const customerID = data.user[0].Customer_id;
      if (customerID) {
        const response = await fetch("/api/getProductQuantity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productID, customerID }),
        });

        if (!response.ok) throw new Error("Failed to fetch product quantity.");

        const quantity = await response.json();
        return quantity[0].quantity || 0;
      }
    } catch (error) {
      console.error("Error counting products in cart:", error);
      return 0;
    }
  };

  const handleAddToCart = async () => {
    try {
      const { data } = await axios.get(`/api/getUser`);
      const customerID = data.user[0].Customer_id;

      if (customerID) {
        await addToCart(customerID, productID);
        const newQuantity = await countProductsInCart(productID);
        changeQuantitySelected(newQuantity);
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      router.push("/signin");
    }
  };

  const addToCart = async (customerID, productID) => {
    try {
      const response = await fetch("/api/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerID, productID }),
      });

      if (!response.ok) throw new Error("Failed to add product to cart.");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const removeFromCart = async () => {
    try {
      const { data } = await axios.get(`/api/getUser`);
      const customerID = data.user[0].Customer_id;

      if (customerID) {
        await fetch("/api/deleteProductFromCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productID, customerID }),
        });

        const newQuantity = await countProductsInCart(productID);
        changeQuantitySelected(newQuantity);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <Paper elevation={3} className="flex flex-col justify-between w-full max-w-xs p-4">
      <div className="mb-4">
        <div className="relative h-40 w-full mb-2">
          <Image
            src={imageUrl}
            alt={productName}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <Typography variant="h6" className="mb-2">
          {productName}
        </Typography>
        <Typography variant="body1" className="text-gray-500 mb-2">
          {description}
        </Typography>
        <Typography variant="body2" className="text-green-600 font-semibold">
          Price: ${price}
        </Typography>
      </div>
      <div className="flex justify-between items-center">
        {quantitySelected === 0 ? (
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <IconButton size="small" color="secondary" onClick={removeFromCart}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" className="font-semibold">
              {quantitySelected}
            </Typography>
            <IconButton size="small" color="primary" onClick={handleAddToCart}>
              <AddIcon />
            </IconButton>
          </div>
        )}
        <IconButton color="primary" aria-label="more info" onClick={() => router.push(`/product/${productID}`)}>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default ProductCard;
