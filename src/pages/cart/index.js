import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '@/components/NavBar';
import Image from 'next/image';
import { productImageMapping } from '@/components/productsImageMapping';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  function handleSetData(data) {
    const updatedData = data.map((product) => {
      const imageUrl = productImageMapping[product.ProductName];
      return { ...product, Product_Image: imageUrl };
    });
    setCartItems(updatedData);
  }

  const getCart = async (customerId) => {
    try {
      const response = await fetch("/api/getCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      handleSetData(data);
      console.log("Success:", data);
    } catch (error) {
      console.error("Error getting cart:", error);
    }
  };

  useEffect(() => {
    const handleCart = async () => {
      try {
        const response = await axios.get(`/api/getUser`);
        if (response.data.user.length > 0) {
          const customerId = response.data.user[0].Customer_id;
          await getCart(customerId);
        } else {
          router.push("/signin");
        }
      } catch (error) {
        console.log(error);
        router.push("/signin");
      }
    };
    handleCart();
  }, []);

  const removeFromCart = async (productID) => {
    try {
      const response = await axios.get(`/api/getUser`);
      const customerId = response.data.user[0].Customer_id;

      const deleteResponse = await fetch("/api/deleteProductFromCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productID, customerId }),
      });

      if (!deleteResponse.ok) {
        throw new Error("Network response was not ok");
      }

      await getCart(customerId);
      console.log("Success: Product removed from cart");
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
  };

  const buyNow = async () => {
    try {
      const response = await axios.get(`/api/getUser`);
      const customerId = response.data.user[0].Customer_id;

      const checkoutResponse = await fetch("/api/checkOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId }),
      });

      if (!checkoutResponse.ok) {
        throw new Error("Network response was not ok");
      }

      await getCart(customerId);
      console.log("Success: Checkout completed");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Navbar />
      <Typography variant="h4" className="mb-4">Your Cart</Typography>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <Paper key={item.productID} elevation={3} className="flex items-center justify-between p-4 mb-4">
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <div style={{ position: 'relative', width: 100, height: 100 }}>
                  <Image src={item.Product_Image} alt={item.productName} layout="fill" objectFit="cover" className="rounded-lg" />
                </div>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6">{item.productName}</Typography>
                <Typography variant="body1">Description: {item.Description}</Typography>
                <Typography variant="body1">Quantity: {item.quantity}</Typography>
                <Typography variant="body1">Price: ${item.Price}</Typography>
              </Grid>
              <Grid item xs={3} className="flex justify-end">
                <IconButton onClick={() => removeFromCart(item.productID)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        ))
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
      <Typography variant="h6" className="text-right">Total: ${calculateTotalPrice()}</Typography>
      <div className="flex justify-center mt-8">
        <Button variant="contained" color="primary" onClick={buyNow}>Buy Now</Button>
      </div>
    </div>
  );
};

export default CartPage;
