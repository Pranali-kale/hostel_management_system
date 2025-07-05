const express = require("express");
const router = express.Router();
const Admission = require("../models/admission");

// Render Admission Form
router.get("/", (req, res) => {
    res.render("admission");
});

// Handle Form Submission
router.post("/", async (req, res) => {
    try {
        const { name, email, marks, phone, roomPreference } = req.body;

        // Save student details to MongoDB
        const newAdmission = new Admission({ name, email, marks, phone, roomPreference });
        await newAdmission.save();

        res.send("Admission Form Submitted Successfully!");
    } catch (error) {
        console.error(error);
        res.send("Error submitting form. Try again.");
    }
});

// View All Admissions (For Admin)
router.get("/admin", async (req, res) => {
    try {
        const admissions = await Admission.find(); // Fetch all admissions from the database
        res.render("admin/viewadmission", { admissions });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving admission data.");
    }
});
router.post('/admin/delete/:id', async (req, res) => {
  await Admission.findByIdAndDelete(req.params.id);
  
  res.redirect('/admission/admin');
});




module.exports = router;
