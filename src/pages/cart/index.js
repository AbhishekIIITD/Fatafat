import React, { useState, useEffect } from "react";
import { Button, Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";
import { productImageMapping } from "@/components/productsImageMapping";
import { motion, AnimatePresence } from "framer-motion";

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
    } catch (error) {
      console.error("Error getting cart:", error);
    }
  };

  useEffect(() => {
    const handleCart = async () => {
      try {
        const response = await axios.get(`/api/getUser`);
        if (response) {
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
      const userResp = await axios.get(`/api/getUser`);
      const customerID = userResp.data.user[0].Customer_id;
      if (customerID) {
        const response = await fetch("/api/deleteProductFromCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productID, customerID }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        await getCart(customerID);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
  };

  const buyNow = async () => {
    try {
      const userResp = await axios.get(`/api/getUser`);
      const customerId = userResp.data.user[0].Customer_id;
      const response = await fetch("/api/checkOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await getCart(customerId);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="container mx-auto w-4/5 py-8 ">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Typography variant="h4" className="text-center font-bold text-gray-800">
          Your Cart
        </Typography>
      </motion.div>
      <AnimatePresence>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <motion.div
              key={item.productID}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Paper
                className="flex items-center p-4 mb-4 shadow-md hover:shadow-lg transform hover:scale-105 transition-all w-1/2 mx-auto"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={item.Product_Image}
                  alt={item.productName}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div>
                  <Typography variant="h6" className="font-semibold text-gray-700">
                    {item.productName}
                  </Typography>
                  <Typography variant="body1" className="text-gray-500">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body1" className="text-gray-500">
                    Price: ${item.Price}
                  </Typography>
                </div>
                <IconButton
                  onClick={() => removeFromCart(item.productID)}
                  className="text-red-500 ml-auto"
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8"
          >
            <Typography variant="h6" className="text-gray-500">
              Your cart is empty.
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
      <Typography
        variant="h6"
        className="text-right font-semibold text-gray-700 mt-4"
      >
        Total: ${calculateTotalPrice().toFixed(2)}
      </Typography>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center mt-8"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={buyNow}
          className="bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 rounded-lg shadow-lg hover:shadow-xl"
        >
          Buy Now
        </Button>
      </motion.div>
    </div>
  );
};

export default CartPage;
