const express = require("express");
const User = require("../models/User");
const Role = require("../models/Role");
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const users = await User.find().populate("role"); // Populates role details in users
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params; 
    try {
        const result = await User.deleteOne({ _id: id }); 
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put("/:id/status-role", async (req, res) => {
    const { id } = req.params;
    const { status, role } = req.body;

    if (!status || !role) {
        return res.status(400).json({ message: "Status and role are required" });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.status = status;
        user.role = role;
        await user.save();

        res.status(200).json({ message: "User status and role updated successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;