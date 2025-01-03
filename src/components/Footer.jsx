import React from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-24 w-full">
      <div className="container mx-auto px-6">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="mb-4 font-bold">
              📞 Contact Us
            </Typography>
            <Typography variant="body2" className="mb-2">
              Email:{" "}
              <a href="mailto:abhishek@iiitd.ac.in" className="underline">
                abhishek@iiitd.ac.in
              </a>
            </Typography>
            <Typography variant="body2">Phone: +1234567890</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="mb-4 font-bold">
              🌐 Follow Us
            </Typography>
            <div className="flex space-x-4 justify-center">
              <IconButton className="bg-white text-green-600 hover:bg-green-700">
                <Facebook />
              </IconButton>
              <IconButton className="bg-white text-green-500 hover:bg-green-600">
                <Twitter />
              </IconButton>
              <IconButton className="bg-white text-yellow-500 hover:bg-yellow-600">
                <Instagram />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="mb-4 font-bold">
              🚀 About Us
            </Typography>
            <Typography variant="body2">
              Fatafat is your go-to platform for instant delivery. We bring
              essentials to your doorstep in a flash, ensuring speed, reliability,
              and convenience every time you shop.
            </Typography>
          </Grid>
        </Grid>
        <div className="text-center mt-8">
          <Typography variant="body2" className="text-sm">
            &copy; {new Date().getFullYear()} Fatafat.com | Designed for speed and
            satisfaction 🚴‍♂️.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
