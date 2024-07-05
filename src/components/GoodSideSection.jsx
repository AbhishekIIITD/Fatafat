import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SpeedIcon from "@mui/icons-material/Speed";

const GoodSidesSection = () => {
  return (
    <Box my={4} sx={{ backgroundColor: '#E6F7E2' }} className=" w-full py-8 text-black">
      <Container>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {/* Quality */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center" gutterBottom>
              Quality
            </Typography>
            <Box textAlign="center">
              <CheckCircleIcon fontSize="large" color="primary" />
            </Box>
            <Typography variant="body1" align="center">
              We offer top-notch quality products.
            </Typography>
          </Grid>
          {/* Pure */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center" gutterBottom>
              Pure
            </Typography>
            <Box textAlign="center">
              <LocalShippingIcon fontSize="large" color="primary" />
            </Box>
            <Typography variant="body1" align="center">
              Our products are pure and authentic.
            </Typography>
          </Grid>
          {/* Superfast Delivery */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" align="center" gutterBottom>
              Superfast Delivery
            </Typography>
            <Box textAlign="center">
              <SpeedIcon fontSize="large" color="primary" />
            </Box>
            <Typography variant="body1" align="center">
              Enjoy superfast delivery services.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default GoodSidesSection;
