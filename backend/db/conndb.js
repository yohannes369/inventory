import mysql2 from "mysql2/promise"; // Use the promise-based API for easier async handling

// Create a MySQL connection pool
const Db = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "inventory",
    waitForConnections: true,
   
});

// Export the connection pool
export default Db;