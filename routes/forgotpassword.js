const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");

router.get("/forgotpassword", (req, res) => {
    res.render("forgotpassword");
});


router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await Admin.findOne({ email }); // or Student model
  
    if (!user) return res.send('User not found');
  
    res.redirect(`/forgotpassword/${user._id}`);
  });
  router.get('/forgotpassword/:id', async (req, res) => {
    const user = await Admin.findById(req.params.id);
    if (!user) return res.send('Invalid link');
    res.render('reset-password', { user });
  });
// 
router.post('/reset-password/:id', async (req, res) => {
  const { password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  await Admin.findByIdAndUpdate(req.params.id, { password: hashed });

  res.send('Password updated successfully!');
});

  
module.exports = router