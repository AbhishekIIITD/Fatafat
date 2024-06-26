// pages/api/addToCart.js

import { executeQuery } from "@/lib/db";
export default async function addToCart(req, res) {
  // Extract productID and customerID from the request body or query parameters
  const { productID, customerID } = req.body;

  try {
    // SQL query to check if the item already exists in the cart
    const checkQuery = `
      SELECT COUNT(*) AS count FROM cart 
      WHERE productID = '${productID}' AND customerID = '${customerID}'
    `;

    // SQL query to add or update item in the cart
    const addToCartQuery = `
      INSERT INTO cart (productID, customerID, quantity)
      VALUES ('${productID}', '${customerID}', 1)
      ON DUPLICATE KEY UPDATE quantity = quantity + 1
    `;

    // Execute the check query
    const checkResult = await executeQuery(checkQuery);

    const { count } = checkResult[0];

    if (count > 0) {
      // If item exists, update quantity
      await executeQuery(addToCartQuery);
      res.status(200).json({ message: 'Item quantity updated in the cart' });
    } else {
      // If item does not exist, insert new item with quantity 1
      await executeQuery(addToCartQuery);
      res.status(200).json({ message: 'Item added to the cart' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
