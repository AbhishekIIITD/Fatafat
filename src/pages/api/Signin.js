import { executeQuery } from "@/lib/db";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
  try {
    // Get user credentials from request
    const { username, password  } = req.body;
    console.log(req.body)
    // Fetch user from the database based on email
    const user = await executeQuery(`SELECT * FROM Customers WHERE email='${username}'`);
    console.log(JSON.stringify(user))

    if (user.length === 0) {
      // If user with given email does not exist, return 404
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password matches
    if (user[0].Password !== password) {
      // If password doesn't match, return 401 Unauthorized
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // If email and password match, create a token
    const tokenData = {
        id: user[0].Customer_id,
        email: user[0].Email
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    // Set the token in a cookie
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day in seconds
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production' // Set to true in production
    }));

    // Return the user data and token
    res.status(200).json({ user, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
