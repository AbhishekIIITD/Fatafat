import { executeQuery } from '@/lib/db';
import { getCurrentDate } from '@/utils/date';

export default async function checkout(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { customerId } = req.body;

  try {
    // Fetch all items from the cart for the given customer ID
    const cartItems = await executeQuery(`
      SELECT c.productID, c.quantity, p.Store_id
      FROM cart c
      INNER JOIN products p ON c.productID = p.ProductID
      WHERE c.customerID = '${customerId}'
    `);

    if (!cartItems.length) {
      return res.status(404).json({ error: 'Cart is empty' });
    }

    // Determine the maximum OrderID present in the orders table
    const maxOrderIDQuery = `SELECT MAX(OrderID) AS maxOrderID FROM orders`;
    const maxOrderIDResult = await executeQuery(maxOrderIDQuery);
    var maxOrderID = maxOrderIDResult[0].maxOrderID || 0;
    const deleteCartItemsQuery = `
      DELETE FROM cart
      WHERE customerID = '${customerId}'
    `;
    await executeQuery(deleteCartItemsQuery);

    // Iterate over cart items and insert them into the orders table
    for (const item of cartItems) {
      const { productID, quantity, Store_id } = item;
      const orderDate = getCurrentDate(); // Get the current date
      

      // Insert multiple rows into the orders table if quantity > 1
      for (let i = 0; i < quantity; i++) {
        const orderID = maxOrderID + 1; // Increment the maximum OrderID
        maxOrderID+=1
        const insertOrderQuery = `
          INSERT INTO orders (OrderID, Customer_id, StoreID, ProductID, OrderDate, Order_status)
          VALUES (${orderID}, '${customerId}', '${Store_id}', '${productID}', '${orderDate}', 'pending')
        `;
        await executeQuery(insertOrderQuery);
      }
    }

    // Delete the items from the cart
    

    res.status(200).json({ message: 'Checkout successful' });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
