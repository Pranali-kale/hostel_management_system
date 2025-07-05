const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Employee= require("../models/Employee");
const Mess = require("../models/Mess");
const Doctor= require("../models/Doctor")
// const authMiddleware = require("../middlewares/authMiddleware"); // Ensure Student is logged in


// Middleware to check if the student is logged in
function isStudentLoggedIn(req, res, next) {
    if (!req.session.studentId) {
        return res.redirect("/student/login");
    }
    next();
}

// Student Dashboard Route
  router.get("/", isStudentLoggedIn, async (req, res) => {
    try {
        const student = await Student.findById(req.session.studentId);
        res.render("studentDashboard", { student });
    } catch (error) {
        res.status(500).send("Error loading dashboard");
    }
  });


router.get("/profile", async (req, res) => {
    try {
        // Fetch logged-in student details using session ID
        const student = await Student.findById(req.session.studentId);
        if (!student) {
            return res.redirect("/login");
        }

        // Render Profile Page with Student Data
        res.render("student/profile", { student });
    } catch (error) {
        console.error("Error fetching student profile:", error);
        res.redirect("/dashboard");
    }
});


// Employee Page Route
router.get("/employees", async (req, res) => {
    try {
        // Fetch all employees from the database
        const employees = await Employee.find();

        // Render Employee Page with Employee Data
        res.render("student/employees", { employees });
    } catch (error) {
        console.error("Error fetching employee details:", error);
        res.redirect("/dashboard");
    }
});
router.get("/mess",  async (req, res) => {
    try {
        // Fetch the latest mess details from the database
        const messDetails = await Mess.find();

        // Render Mess Page with Mess Data
        res.render("student/mess", { messDetails });
    } catch (error) {
        console.error("Error fetching mess details:", error);
        res.redirect("/dashboard");
    }
});

router.get("/doctors", async( req, res)=>{
    try{
      const doctors =await Doctor.find();
      res.render("student/studentdoctor",{doctors});
    }catch(error){
        console.error("error fetching doctors information:",error);
        res.redirect("/dashboard");
    }
});



// module.exports = router;

module.exports = router;
  