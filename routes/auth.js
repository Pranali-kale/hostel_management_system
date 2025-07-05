const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");

// 🔹 Admin Registration Page
router.get("/register-admin", async (req, res) => {
    const adminExists = await Admin.findOne({});
    if (adminExists) {
        return res.send("Admin is already registered! Go to login.");
    }
    res.render("register-admin");
});

// 🔹 Handle Admin Registration
router.post("/register-admin", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const adminExists = await Admin.findOne({});
        if (adminExists) {
            return res.send("Admin already exists! You cannot register another.");
        }

        const newAdmin = new Admin({ username, email, password });
        await newAdmin.save();
        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.send("Error registering admin.");
    }
});

// 🔹 Admin Login Page
router.get("/login", (req, res) => {
    res.render("login");
});

// 🔹 Handle Admin Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.send("Admin not found!");
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.send("Invalid credentials!");
        }

        req.session.admin = admin; // Store admin session
        res.redirect("/admin/dashboard");
    } catch (error) {
        console.error(error);
        res.send("Error logging in.");
    }
});

// 🔹 Logout Route
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;





