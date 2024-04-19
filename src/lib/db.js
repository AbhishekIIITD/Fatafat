import mysql from 'mysql2/promise';

export const executeQuery = async (query, data) => {
  try {
    const pool = await mysql.createPool({
      host: 'localhost',
      port: '3306',
      database: 'fatafat',
      user: 'root',
      password: 'Ashokasha@123',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();
    const [result] = await connection.execute(query, data);
    connection.release();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
