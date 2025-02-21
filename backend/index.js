import express from "express";
import Db from "./db/conndb.js"; // Import the database connection

const app = express();

// Test the database connection when the server starts
(async () => {
    try {
        await Db.execute("SELECT 1"); // Simple query to test the connection
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Failed to connect to the database:", err.message);
        process.exit(1); // Exit the application if the database connection fails
    }
})();

// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});