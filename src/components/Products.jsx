import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

const ProductGrid = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {product.description}
              </Typography>
              <Typography variant="h6" color="primary">
                ${product.price}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                In Stock: {product.stock}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Rating: {product.rating}
              </Typography>
              <ShoppingCartIcon color="primary" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
