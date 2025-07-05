
const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.get("/login", (req, res) => {
    res.render("student_log", { error: null }); // Always pass error
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email });

        if (!student) {
            return res.render("student_log", { error: "Invalid Email or Password" });
        }

        // Check Password
        const isMatch = password === student.password;
        if (!isMatch) {
            return res.render("student_log", { error: "Invalid Email or Password" });
        }

        // Store student session
        req.session.studentId = student._id;
        res.redirect("/dashboard");
        // res.render("studentDashboard");

    } catch (error) {
        res.render("student_log", { error: "Server Error. Please try again." });
    }
});

// Logout Route
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/student/login"); // Redirect to login
    });
});

module.exports = router;

