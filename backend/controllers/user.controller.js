import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import Db from "../db/conndb.js"; // Import the database connection
export const addUser = async (req, res) => {
    const { emp_id, account_type, password, fname, lname, email, phone_no, block_no, office_no, reg_date, status } = req.body;

    // Validate required fields
    if (!emp_id || !account_type || !password || !fname || !lname || !email || !phone_no || !block_no || !office_no || !reg_date || !status) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate password length
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Hash the password
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
        console.error("Failed to hash password:", err);
        return res.status(500).json({ message: "Failed to hash password" });
    }

    // Insert the user into the database
    try {
        const [rows] = await Db.execute(
            "INSERT INTO users (emp_id, account_type, password, fname, lname, email, phone_no, block_no, office_no, reg_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [emp_id, account_type, hashedPassword, fname, lname, email, phone_no, block_no, office_no, reg_date, status]
        );

        if (rows.affectedRows === 1) {
            return res.status(200).json({ message: "User added successfully" });
        } else {
            return res.status(500).json({ message: "Failed to add user" });
        }
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Failed to add user" });
    }
};
export const loginUser = async (req, res) => {
    const { emp_id, password } = req.body;

    // Validate required fields
    if (!emp_id || !password) {
        return res.status(400).json({ message: "Missing required fields" });    
    }

    // Validate password length
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Check if the user exists in the database
    try {
        const [rows] = await Db.execute(
            "SELECT * FROM users WHERE emp_id = ?",
            [emp_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }    

        // Compare the provided password with the hashed password in the database
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // User authentication successful
        return res.status(200).json({ message: "Login successful" });
    } catch (err) {    
        console.error("Database error:", err);
        return res.status(500).json({ message: "Failed to login user" });
    }
};