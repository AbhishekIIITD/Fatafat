import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from "react-hot-toast";
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
      console.log('Success:',data);
      toast.success('Login success');
      
      router.push('/profile/'+data.user[0].Email);
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
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      style={{ minHeight: '100vh' }}
      
    >
        <div className="text-6xl font-extrabold text-left text-blue-600 translate-y-[-3rem]">Fatafat</div>
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
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid || isLoading}
            fullWidth
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <Link className=' text-blue-600 justify-center text-center flex mt-8' href="/signup">Not a user ? Sign Up</Link>
      </Grid>
    </Grid>
  );
};

export default SignIn;
