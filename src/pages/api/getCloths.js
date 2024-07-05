import { executeQuery } from "@/lib/db";
export default async function handler(req, res) {
  try {
    // Execute a database query
    const result = await executeQuery("SELECT * FROM Products WHERE Category = 'clothes' and StockQuantity > 0");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
