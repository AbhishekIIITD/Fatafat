import React from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 w-full">
      <div className="container mx-auto">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="mb-4">
              Contact Us
            </Typography>
            <Typography variant="body2" className="mb-2">
              Email: abhishek@iiitd.ac.in
            </Typography>
            <Typography variant="body2">Phone: +1234567890</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="mb-4">
              Follow Us
            </Typography>
            <div className="flex space-x-4">
              <IconButton>
                <Facebook />
              </IconButton>
              <IconButton>
                <Twitter />
              </IconButton>
              <IconButton>
                <Instagram />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="mb-4">
              About Us
            </Typography>
            <Typography variant="body2">
              Welcome to Fatafat, your ultimate destination for quick and
              convenient online shopping! At Fatafat, we strive to provide you
              with a seamless shopping experience, offering a vast array of
              products at your fingertips.
            </Typography>
          </Grid>
        </Grid>
        <div className="text-center mt-8">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Fatafat.com. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
