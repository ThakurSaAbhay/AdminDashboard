const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Role = require("../models/Role");
const router = express.Router();

const JWT_SECRET = "your_secret_key";

router.post("/verify-token", (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ valid: false, message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); 
        return res.status(200).json({ valid: true, user: decoded }); 
    } catch (err) {
        return res.status(401).json({ valid: false, message: "Invalid or expired token" });
    }
});


router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }


        //password Hashing using bcrypt
        const roleExists = await Role.findOne({ name: role });
        if (!roleExists) {
            return res.status(400).json({ message: "Role does not exist" });
        }

        const newUser = new User({
            name,
            email,
            password: password ,
            role: roleExists._id,
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate a JWT token with the user ID and role
        const token = jwt.sign(
            { userId: user._id, role: user.role.name }, // Use role name
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ token, role: user.role.name }); // Send role in response
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
