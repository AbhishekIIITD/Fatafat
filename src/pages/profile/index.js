import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/Logout");
      toast.success("Logout successful");
      router.push("/signin");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/getUser");
      console.log(res.data.user[0].First_Name);
      setData(res.data.user[0].Email);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Container maxWidth="sm" className="flex flex-col items-center justify-center min-h-screen py-2">
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <hr />
      <Typography variant="body1">Profile page</Typography>
      <Typography variant="h5" className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </Typography>
      <hr />
      <Button
        variant="contained"
        color="primary"
        onClick={logout}
        className="mt-4"
      >
        Logout
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={getUserDetails}
        className="mt-4"
      >
        Get User Details
      </Button>
    </Container>
  );
}
