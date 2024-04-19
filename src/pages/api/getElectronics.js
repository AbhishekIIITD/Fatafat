import { executeQuery } from "@/lib/db";

export default async function handler(req, res) {
  try {
    // Execute a database query
    const result = await executeQuery("SELECT * FROM Products WHERE Category = 'Electronics' and stockQuantity>0");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
