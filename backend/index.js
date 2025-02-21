import express from "express";
import cors from "cors";
import Db from "./db/conndb.js"; // Import the database connection
import authRoutes from "./routes/user.routes.js"; // Import the authRoutes function

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

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

// Routes
app.use("/api/auth", authRoutes(Db)); // Pass the Db instance to authRoutes

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});