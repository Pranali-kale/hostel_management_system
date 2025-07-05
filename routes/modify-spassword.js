const express = require('express');
const router = express.Router();
const Student = require('../models/student'); // path to your student model

// GET - Show Modify Password Page
router.get('/modify-password', (req, res) => {
  res.render('student/studnt_modifypass');
});

// POST - Handle Password Update
router.post('/modify-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    // Find student by email
    const student = await Student.findOne({ email: email });

    if (!student) {
      return res.send('Student not found.');
    }

    // Check if old password matches
    if (student.password !== oldPassword) {
      return res.send('Incorrect old password.');
    }

    // Update password
    student.password = newPassword;
    await student.save();

    res.send('Password updated successfully!');
  } catch (error) {
    res.status(500).send('Error updating password.');
  }
});

module.exports = router;
