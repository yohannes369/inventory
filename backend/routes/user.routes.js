
import { Router } from "express";
import Db from "../db/conndb.js";
import { addUser, loginUser } from "../controllers/user.controller.js"; // Import the controller function
 // Import the database connection
const authRoutes = (Db) => {
    const router = Router();

    // POST endpoint to add a new user
    router.post("/add-user", (req, res) => addUser(req, res));
    router.post("/login-user", (req, res) => loginUser(req, res));

    return router;
};

export default authRoutes; // Export as default