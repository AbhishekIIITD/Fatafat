// pages/api/decreaseQuantity.js

import { executeQuery } from '@/lib/db';

export default async function decreaseQuantity(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { productID, customerID } = req.body;

  try {
    // SQL query to decrease the quantity of the product in the cart
    const decreaseQuery = `
      UPDATE cart 
      SET quantity = quantity - 1 
      WHERE productID = '${productID}' AND customerID = '${customerID}';
    `;

    // Execute the query to decrease the quantity
    await executeQuery(decreaseQuery);

    // Check if the quantity becomes 0 after decreasing
    const checkQuantityQuery = `
      SELECT quantity FROM cart 
      WHERE productID = '${productID}' AND customerID = '${customerID}';
    `;

    const result = await executeQuery(checkQuantityQuery);
    const { quantity } = result[0];

    if (quantity === 0) {
      // If the quantity becomes 0, delete the respective entry from the cart
      const deleteQuery = `
        DELETE FROM cart 
        WHERE productID = '${productID}' AND customerID = '${customerID}';
      `;
      
      await executeQuery(deleteQuery);
    }

    res.status(200).json({ message: 'Quantity decreased successfully' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
