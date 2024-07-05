// pages/api/getOrders.js

import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
  

  const  {customerId}  = req.body;


  try {
    // Fetch orders associated with the customer ID
    //console.log(`SELECT * FROM orders WHERE Customer_id=${customerId}`)
    const orders = await executeQuery(`SELECT * FROM orders WHERE Customer_id=${customerId}`);
    //console.log(orders)

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
