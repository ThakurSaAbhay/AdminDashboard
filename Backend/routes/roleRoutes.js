const express = require("express");
const Role = require("../models/Role");
const User = require("../models/User");
const router = express.Router();


router.post("/", async (req, res) => {
    const { name, permissions } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Role name is required" });
    }

    if (!permissions || permissions.length === 0) {
        return res.status(400).json({ message: "At least one permission is required" });
    }

    // Validate permissions
    const validPermissions = ['Read', 'Write', 'Delete'];
    const invalidPermissions = permissions.filter(perm => !validPermissions.includes(perm));
    
    if (invalidPermissions.length > 0) {
        return res.status(400).json({ message: `Invalid permissions: ${invalidPermissions.join(", ")}` });
    }

    try {
        // Check if the role already exists
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: "Role already exists" });
        }

        // Create a new role with permissions
        const newRole = new Role({ name, permissions });
        await newRole.save();

        return res.status(201).json({ message: "Role created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params; 
    try {
        const role= await Role.findOne({_id:id});
        if(role.name ==="Admin"){
            return res.status(400).json({ message: "Can't delete admin" });
        }
        const result = await Role.deleteOne({ _id: id }); 
        const userr= await User.deleteMany({role:id})
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json({ message: "Role deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/", async (req, res) => {
    try {
        const roles = await Role.find(); // Fetch all roles from the database
        res.status(200).json(roles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put("/:id/permissions", async (req, res) => {
    const { id } = req.params;
    const { permissions } = req.body;

    if (!permissions || permissions.length === 0) {
        return res.status(400).json({ message: "Permissions are required" });
    }

    try {
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        role.permissions = permissions;
        await role.save();

        res.status(200).json({ message: "Permissions updated successfully", role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;