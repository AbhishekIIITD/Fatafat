import React, { useState, useEffect } from 'react';
import { Button,Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/NavBar';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const router=useRouter()
  
  

  const getCart = async (customerId) => {
    try {
      const response = await fetch("/api/getCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId }), // Pass customerId as an object
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCartItems(data)
      console.log("Success:", data);
      
    } catch (error) {
      console.error("Error getting cart:", error);
    } 
  };

  useEffect(() => {

    const handleCart=async()=>{
        try {
            // Call the getUser API to check if the user is logged in
            const response = await axios.get(`/api/getUser`);
            
            if (response) {
              console.log(response.data.user[0].Customer_id)
              const cartResponse=await getCart(response.data.user[0].Customer_id)
              
              
      
            } else {
              // If user is not logged in, redirect to the login page
              router.push("/sigin"); // Replace "/login" with your actual login page URL
            }
          } catch (error) {
            console.log(error)
            router.push("/signin");
          }// Fetch cart items when component mounts
    }
    handleCart()
    
  }, []);

  

  // Function to remove an item from the cart
  const removeFromCart = async (productID) => {
    var customerID=null
    try {
        const userResp = await axios.get(`/api/getUser`);
        customerID=userResp.data.user[0].Customer_id
        if(customerID){
            const response = await fetch("/api/deleteProductFromCart", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ productID,customerID }), // Pass customerId as an object
              });
        
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
        
              const data = await response.json();
              console.log("Success:", data);
              getCart(customerID)
        }
        
      } catch (error) {
        console.error("Error getting cart:", error);
      } 
  };

  // Function to calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
  };

  const buyNow = async () => {
    var customerId=null
    try {
        const userResp = await axios.get(`/api/getUser`);
        customerId=userResp.data.user[0].Customer_id
        const response = await fetch("/api/checkOut", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerId }), // Pass customerId as an object
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        getCart(customerId)
        console.log("Success:", data);
        
      } catch (error) {
        console.error("Error getting cart:", error);
      } 
  };

  return (
    <div className="container mx-auto py-8">
      <Navbar />
      <Typography variant="h4" className="mb-4">Your Cart</Typography>
      {cartItems.length > 0 && cartItems.map((item) => (
        <Paper key={item.productID} className="flex items-center justify-between p-4 mb-4">
          <div>
            <Typography variant="h6">{item.productName}</Typography>
            <Typography variant="body1">Description: {item.Description}</Typography>
            <Typography variant="body1">Quantity: {item.quantity}</Typography>
            <Typography variant="body1">Price: ${item.Price}</Typography>
          </div>
          <IconButton onClick={() => removeFromCart(item.productID)}>
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}
      <Typography variant="h6" className="text-right">Total: ${calculateTotalPrice()}</Typography>
      <div className="flex justify-center mt-8">
        <Button variant="contained" color="primary" onClick={buyNow}>Buy Now</Button>
      </div>
    </div>
  );
};

export default CartPage;
