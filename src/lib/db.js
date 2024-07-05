import sql from "msnodesqlv8";

const connectionString = "Driver={ODBC Driver 18 for SQL Server};Server=tcp:fatafat12.database.windows.net,1433;Database=fatafatDB;Uid=abhishek;Pwd=fatafat@10;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;";

export const executeQuery = async (query, data = []) => {
  return new Promise((resolve, reject) => {
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        console.error('Database query error:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
