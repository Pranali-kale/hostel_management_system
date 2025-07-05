const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Show Employee List
router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render("admin/employees", { employees });
    } catch (err) {
        res.status(500).send("Error fetching employees");
    }
});

// Show Add Employee Form
router.get("/add", (req, res) => {
    res.render("admin/addEmployee");
});

// Add Employee
router.post("/add", async (req, res) => {
    try {
        const { name, email, phone, position, dutyTime } = req.body;
        const newEmployee = new Employee({ name, email, phone, position, dutyTime });
        await newEmployee.save();
        res.redirect("/admin/employees");
    } catch (err) {
        res.status(500).send("Error adding employee");
    }
});

// Show Edit Employee Form
router.get("/edit/:id", async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.render("admin/editEmployee", { employee });
    } catch (err) {
        res.status(500).send("Error fetching employee");
    }
});

// Update Employee
router.post("/edit/:id", async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/admin/employees");
    } catch (err) {
        res.status(500).send("Error updating employee");
    }
});

// Delete Employee
router.get("/delete/:id", async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.redirect("/admin/employees");
    } catch (err) {
        res.status(500).send("Error deleting employee");
    }
});

module.exports = router;
