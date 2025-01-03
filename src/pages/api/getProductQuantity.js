import { executeQuery } from '@/lib/db'; // Import your database utility function

export default async function handler(req, res) {
  
  const { customerID,productID } = req.body;

  try {
    const query = `SELECT * FROM cart natural join products WHERE customerID = '${customerID}' and ProductId='${productID}'`;
    const cartItems = await executeQuery(query);

    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}