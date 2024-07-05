import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      router.push('/signin');
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { firstName, lastName, username, password } = formData;
  const isFormValid = firstName && lastName && username && password;

  return (
    <div
      style={{
        backgroundImage: "url('/login_fatafat.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          zIndex: 1,
          backdropFilter: 'blur(8px)',
        }}
      ></div>
      <Paper
        elevation={6}
        style={{ padding: '2rem', zIndex: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h2" component="h1" style={{ color: '#388e3c', marginBottom: '1rem' }}>
            Signup
          </Typography>
          <Grid item xs={12} sm={6} md={4}>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                name="firstName"
                label="First Name"
                value={firstName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  style: { color: '#388e3c' },
                }}
                InputProps={{
                  style: { color: '#388e3c' },
                }}
                required
              />
              <TextField
                type="text"
                name="lastName"
                label="Last Name"
                value={lastName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  style: { color: '#388e3c' },
                }}
                InputProps={{
                  style: { color: '#388e3c' },
                }}
                required
              />
              <TextField
                type="text"
                name="username"
                label="Username"
                value={username}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  style: { color: '#388e3c' },
                }}
                InputProps={{
                  style: { color: '#388e3c' },
                }}
                required
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                value={password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  style: { color: '#388e3c' },
                }}
                InputProps={{
                  style: { color: '#388e3c' },
                }}
                required
              />
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: '#388e3c', color: 'white' }}
                disabled={!isFormValid || isLoading}
                fullWidth
              >
                {isLoading ? 'Signing up...' : 'Signup'}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Signup;
