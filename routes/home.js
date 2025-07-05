const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");
const Image = require("../models/Image");
const Fee = require("../models/Fee");
const Contact = require('../models/Contact');

// Render Home Page
router.get("/", (req, res) => {
    res.render("index");
});
router.get("/contact", (req, res) => {
    res.render("contact");
});



router.post('/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      const newContact = new Contact({
        name,
        email,
        message
      });
  
      await newContact.save();
      res.send('Message sent successfully');
    } catch (error) {
      console.error(error);
      res.status(400).send('Error: ' + error.message);
    }
  });

// Render Home Page
router.get("/about_us", (req, res) => {
    // res.send("hi about page here")
     res.render("about_us");
});

      
//  router.get("/fee_structure", async (req, res) => {
//     try {
//         const fees = await Fee.find();
//         console.log("Fetched Fees Data:", fees); // Fetch fee structure from DB
//         res.render("homepageFee", { fees }); // Pass 'fees' to EJS
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Server Error");
//     }
//  });

router.get("/fee_structure", async (req, res) => {
    try {
        const fees = await Fee.find();//.sort({ year: -1 });
        res.render("homepageFee", { fees });
    } catch (error) {
        console.error("Error fetching fees:", error);
        res.status(500).send("Error loading fee structure on homepage");
    }
});


router.get("/notice", async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 }); // Fetch notices, latest first
        res.render("homepageNotice", { notices }); // Pass 'notices' to EJS file
    } catch (err) {
        console.error("Error fetching notices:", err);
        res.status(500).send("Internal Server Error");
    }
});

// router.get("/admission", (req, res) => {
//     res.send("hi  addmission  page here")
//     // res.render("about_us");
// });

router.get("/photo_gallary", async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 }); // Fetch photos, latest first
        res.render("homepagePhoto", { images });
    } catch (error) {
        console.error("Error fetching photos:", error);
        res.status(500).send("Error fetching photos");
    }
});
    // res.send("hi photoes  and memories page here")
    // res.render("about_us");
// });
router.get("/login", (req, res) => {
    // res.send("hi login  page here")
     res.render("login");
});
// // router.get("/student_log", (req, res) => {
//     // res.send("hi login  page here")
//     res.render("student_log");
//  });
// //  router.post("/register-admin", (req, res) => {
//     /////// res.send("hi login  page here")
//       res.render("register-admin");
//  });




module.exports = router;
