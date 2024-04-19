import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Signup = () => {
  const router=useRouter()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const userData = { firstName, lastName, username, password };
      const response = await fetch("/api/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Pass customerId as an object
      });
      const data = await response.json();
      console.log("Success:", data);
      router.push('/signin');
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    }catch(error){
      console.log(error)
    }

    
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Typography variant="h2" className="text-3xl font-semibold mb-4">Signup Form</Typography>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-md w-96 flex flex-col align-middle justify-center">
        <div className="mb-4">
          <TextField label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth required />
        </div>
        <div className="mb-4">
          <TextField label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth required />
        </div>
        <div className="mb-4">
          <TextField label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth required />
        </div>
        <div className="mb-6">
          <TextField label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
        </div>
        <Button type="submit" variant="contained" color="primary" className="rounded-md hover:bg-blue-600 transition duration-300">Signup</Button>
      </form>
    </div>
  );
};

export default Signup;
