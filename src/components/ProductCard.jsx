import React, { useState } from "react";
import { Paper, Typography, Button, IconButton, Snackbar } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import { useRouter } from "next/router"; // corrected import
import axios from "axios";

const ProductCard = ({ productID, productName, description, price, imageUrl }) => {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

  const goToProduct = () => {
    router.push("/product/" + productID);
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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      // Show Snackbar on success
      setSnackbarOpen(true);
      
    } catch (error) {
      console.error("Error adding orders to the cart:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.get(`/api/getUser`);
      
      if (response) {
        const cartResponse = await addToCart(response.data.user[0].Customer_id, productID);
        console.log(cartResponse);
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
      router.push("/signin");
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
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddShoppingCartIcon />}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <IconButton color="primary" aria-label="more info" onClick={goToProduct}>
          <ChevronRightIcon />
        </IconButton>
      </div>

      {/* Snackbar for success message */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={4000} // Adjust duration as needed
        onClose={() => setSnackbarOpen(false)}
        message="Added to cart successfully!"
        ContentProps={{
          style: {
            backgroundColor: "#43a047", // Green color
            color: "white",
          },
        }}
      />
    </Paper>
  );
};

export default ProductCard;
