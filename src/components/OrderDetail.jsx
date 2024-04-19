import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Tooltip } from '@mui/material';
import { ShoppingBasket as ShoppingBasketIcon } from '@mui/icons-material';
import { productImageMapping } from './productsImageMapping';

const Order = ({ productId, order }) => {
    console.log("running")
  
  const { OrderID, OrderDate, Order_status } = order;
  const [product,setProduct]=useState(null)

  useEffect(()=>{
    const fetchProduct=async(ProductId)=>{
        try {
            const response = await fetch("/api/getProductById", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ProductId }), // Pass customerId as an object
            });
      
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
      
            const data = await response.json();
            console.log("Success:", data);
            setProduct(data[0]); // Set the fetched orders
          } catch (error) {
            console.error("Error fetching product:", error);
          } 
      }
      if(productId){
        fetchProduct(productId)
      }
  },[productId])
  
  return (
    product&&<Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Product Details
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <img src={productImageMapping[product.ProductName]} alt={product.ProductName} style={{ width: '100%', borderRadius: 8 }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1">Product Name: {product.ProductName}</Typography>
            <Typography variant="body2">Description: {product.Description}</Typography>
            <Typography variant="body2">Price: ${product.Price}</Typography>
            <Typography variant="body2">Stock Quantity: {product.StockQuantity}</Typography>
          </Grid>
        </Grid>
        <Typography variant="h6" component="div" sx={{ mt: 2 }}>
          Order Details
        </Typography>
        <Typography variant="body2">Order ID: {OrderID}</Typography>
        <Typography variant="body2">Order Date: {OrderDate}</Typography>
        <Typography variant="body2">Order Status: {Order_status}</Typography>
        <Tooltip title="Add to Cart">
          <IconButton aria-label="add to cart">
            <ShoppingBasketIcon />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default Order;
