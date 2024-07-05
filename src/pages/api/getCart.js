// pages/api/getCartItems.js

import { executeQuery } from "@/lib/db"; // Import your database utility function

export default async function handler(req, res) {
  const { customerId } = req.body;

  if (!customerId) {
    return res.status(400).json({ error: "customerId is required" });
  }

  try {
    const query = `
      SELECT *
      FROM cart
      JOIN Products ON cart.productID = Products.ProductID
      WHERE cart.customerID = '${customerId}'
    `;
    const cartItems = await executeQuery(query);

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
