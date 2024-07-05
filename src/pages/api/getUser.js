import { executeQuery } from "@/lib/db";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
  try {
    // Get the token from the cookies
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Extract user id from the token
    const email = decodedToken.email;

    // Fetch user from the database based on user id
    const user = await executeQuery(`SELECT * FROM Customers WHERE email='${email}'`);

    // Check if the user exists
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data
    res.status(200).json({ user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
