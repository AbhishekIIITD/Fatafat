import { executeQuery } from "@/lib/db";

export default async function handler(req, res) {
  try {
    // Getting user data from request
    const user = req.body;
    console.log(user)
    // Find the maximum Customer_id in the Customers table
    const maxCustomerIdResult = await executeQuery('SELECT MAX(Customer_id) AS maxId FROM Customers');
    const maxCustomerId = maxCustomerIdResult[0].maxId || 0;
    
    // Increment the maximum Customer_id by one to generate the new Customer_id
    const newCustomerId = maxCustomerId + 1;

    // Checking if the user already exists
    const existingUser = await executeQuery(`SELECT * FROM Customers WHERE email='${user.username}'`);

    if (existingUser.length === 0) {
      // If the user doesn't exist, insert the user into the database
      await executeQuery(`
      INSERT INTO Customers (Customer_id, First_Name, Last_Name, Email, Password)
        VALUES ('${newCustomerId}','${user.firstName}', '${user.lastName}', '${user.username}', '${user.password}')
      `);
      res.status(201).json({ message: 'User created successfully' });
    } else {
      // If the user already exists, return an error
      res.status(400).json({ message: 'User already exists' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
