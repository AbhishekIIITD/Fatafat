import React from "react";
import { Paper, Typography, Button, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProductCard = ({ productID,productName, description, price, imageUrl }) => {
  
  const router=useRouter()
  const goToProduct=()=>{
    console.log(productID)
    router.push("/product/"+productID)
  }

  
  const addToCart = async (customerID,productID) => {
    try {
      const response = await fetch("/api/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerID,productID }), // Pass customerId as an object
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      
    } catch (error) {
      console.error("Error adding orders to the cart:", error);
    } 
  };

  const handleAddToCart = async() => {
    // Implement your add to cart logic here
    try {
      // Call the getUser API to check if the user is logged in
      const response = await axios.get(`/api/getUser`);
      
      console.log()
      if (response) {
        console.log(response.data.user[0])
        const cartResponse=addToCart(response.data.user[0].Customer_id,productID)
        console.log(cartResponse)
        

      } else {
        // If user is not logged in, redirect to the login page
        router.push("/sigin"); // Replace "/login" with your actual login page URL
      }
    } catch (error) {
      console.log(error)
      router.push("/signin");
    }

    console.log("Adding to cart:", productName);
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
    </Paper>
  );
};

export default ProductCard;

