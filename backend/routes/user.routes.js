
import { Router } from "express";
import { addUser } from "../controllers/user.controller.js"; // Import the controller function

const authRoutes = (Db) => {
    const router = Router();

    // POST endpoint to add a new user
    router.post("/add-user", (req, res) => addUser(req, res, Db));

    return router;
};

export default authRoutes; // Export as default