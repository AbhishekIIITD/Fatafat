import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Grid, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const router = useRouter();
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
      const response = await fetch('/api/Signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      toast.success('Login success');

      router.push('/profile/' + data.user[0].Email);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error signing in');
    } finally {
      setIsLoading(false);
    }
  };

  const { username, password } = formData;
  const isFormValid = username.length > 0 && password.length > 0;

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
          zIndex: 1,
        }}
      ></div>
      <Paper
        elevation={6}
        style={{
          padding: '2rem',
          zIndex: 2,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
        className="rounded-lg"
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="h2"
            component="h1"
            style={{
              fontFamily: 'Roboto, sans-serif', // Apply Roboto font
              color: '#388e3c',
              marginBottom: '1rem',
            }}
          >
            Fatafat
          </Typography>
          <Grid item xs={12} sm={6} md={4}>
            <form onSubmit={handleSubmit}>
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
              />
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: '#388e3c', color: 'white' }}
                disabled={!isFormValid || isLoading}
                fullWidth
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            <Link
              className="text-green-800 justify-center text-center flex mt-8"
              href="/signup"
            >
              Not a user? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default SignIn;
