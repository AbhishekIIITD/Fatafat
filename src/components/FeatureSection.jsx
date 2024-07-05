import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

const FeatureSection = () => {
  return (
    <div style={{ backgroundColor: '#E6F7E2', padding: '40px 0', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Unique Selling Points
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="paper">
            <StarIcon fontSize="large" className="icon" />
            <Typography variant="h6" gutterBottom>
              Innovative Designs
            </Typography>
            <Typography variant="body1">
              Discover our collection of products featuring innovative and trendy designs.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="paper">
            <StarIcon fontSize="large" className="icon" />
            <Typography variant="h6" gutterBottom>
              Eco-Friendly Materials
            </Typography>
            <Typography variant="body1">
              We prioritize sustainability by using eco-friendly materials in our products.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="paper">
            <StarIcon fontSize="large" className="icon" />
            <Typography variant="h6" gutterBottom>
              Personalized Experience
            </Typography>
            <Typography variant="body1">
              Enjoy a personalized shopping experience tailored to your preferences.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default FeatureSection;
