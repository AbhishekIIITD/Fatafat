import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";

import {
  Container,
  Typography,
  Grid,
  Avatar,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";
import Order from "@/components/OrderDetail";
import Navbar from "@/components/NavBar";

const UserDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async (customerId) => {
    try {
      const response = await fetch("/api/getOrdersByACustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerId }), // Pass customerId as an object
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      setOrders(data.orders); // Set the fetched orders
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/Logout");
      toast.success("Logout successful");
      router.push("/");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/getUser?id=${id}`);
        setUser(res.data.user[0]);
        // Check if user exists and has a Customer_id before fetching orders
        if (res.data.user.length > 0 && res.data.user[0].Customer_id) {
          fetchOrders(res.data.user[0].Customer_id); // Pass the Customer_id to fetchOrders
        } else {
          setLoading(false); // Set loading to false if no user or Customer_id found
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <CircularProgress />
        </Grid>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Typography variant="h4">User not found</Typography>
      </Container>
    );
  }

  return (
    <Box className="w-full">
      <Navbar />
      <Container maxWidth="md">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Avatar
              sx={{ width: 120, height: 120, mx: "auto" }}
              src={user.avatar}
              alt={user.First_Name}
            />
            <Typography variant="h4" mt={2} align="center">
              {user.First_Name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" align="center">
              {user.Email}
            </Typography>
            <IconButton color="primary" aria-label="edit profile">
              <EditIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={logout}
              className="mt-4"
              fullWidth
            >
              Logout
            </Button>
          </Grid>
          {/* Display additional user details here */}
        </Grid>

        {/* Display orders */}
        {orders.length > 0 && (
          <Box mt={4}>
            <Typography variant="h5" align="center" mb={2}>
              Orders
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {orders.map((order) => (
                <Grid item key={order.OrderID}>
                  <Order order={order} productId={order.ProductID} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default UserDetailsPage;
