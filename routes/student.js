

const express = require("express");
const router = express.Router();
const Student = require("../models/student"); // Import Student Model

// Show Student List
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();  // Fetch all students
        res.render("admin/students", { students });  // Pass students to view
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching students");
    }
});

// Show Add Student Form
router.get("/add", (req, res) => {
    res.render("admin/addStudent"); // Render Add Student Page
});

// Add Student (POST)
router.post("/add", async (req, res) => {
    try {
        const { rollNumber, name, email, phone, password } = req.body;
        const newStudent = new Student({ rollNumber, name, email, phone,  password });
        await newStudent.save();
        res.redirect("/admin/students");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding student");
    }
});

// Show Edit Student Form
router.get("/edit/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.render("admin/editStudent", { student });
    } catch (err) {
        res.status(500).send("Error fetching student");
    }
});

// Update Student (POST)
router.post("/edit/:id", async (req, res) => {
    try {
        await Student.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/admin/students");
    } catch (err) {
        res.status(500).send("Error updating student");
    }
});

// Delete Student
router.get("/delete/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect("/admin/students");
    } catch (err) {
        res.status(500).send("Error deleting student");
    }
});

module.exports = router;
