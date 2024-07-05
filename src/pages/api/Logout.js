import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
    try {
      // Clear the token cookie
      res.setHeader('Set-Cookie', cookie.serialize('token', '', {
        httpOnly: true,
        expires: new Date(0), // Set the expiration date to a past date
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production' // Set to true in production
      }));
  
      // Return a success message
      res.status(200).json({ message: 'Logged out successfully' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  