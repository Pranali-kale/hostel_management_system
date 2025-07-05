const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");



// Show complaint form
 router.get("/", (req, res) => {
    res.render("student/addComplaint", { student: req.session.student });
});

// // Handle complaint submission
  router.post("/submit", async (req, res) => {
      try {
          const { studentName, studentRollNo,complaintText}= req.body;
                  const newComplaint = new Complaint({
              studentName,
              studentRollNo,
             complaintText})
        await newComplaint.save();
        res.redirect("/complaints"); // Redirect to student dashboard
    }catch (error) {
        console.error(error);
        res.status(500).send("Error submitting complaint");
    }
  });
  router.get('/admin', async (req, res) => {
    try {
        const complaints = await Complaint.find(); // Fetch all complaints from MongoDB
        res.render('student/studentComplaint', { complaints }); // Pass complaints to EJS
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching complaints");
    }
  });
   
router.post('/admin/delete/:id', async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.redirect('/complaints/admin');
});



module.exports = router;


