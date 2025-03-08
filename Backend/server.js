const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("your_mongo_uri")
.then(() => console.log("MongoDB connected"))
.catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); 
});

app.use("/api", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);


const PORT = 5000; 
app.listen(PORT, () => {
    console.log(`Server running`);
});
