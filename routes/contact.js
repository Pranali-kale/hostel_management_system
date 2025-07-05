const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');


// Admin - View all messages
router.get('/', async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.render('adminContactview', { messages });
});

// Admin - Delete message
router.post('/delete/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  
  res.redirect('/messages');
});

module.exports = router;
