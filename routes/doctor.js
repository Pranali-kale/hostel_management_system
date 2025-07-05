

const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

router.get("/", async (req,res) => {
    try{
        const doctors= await Doctor.find();
        res.render("admin/doctor", { doctors});
    }
    catch (err) {
      res.status(500).send('error fetching doctors');
    }
});
//  show add doctor form
  router.get('/add', (req, res) => {
       res.render('admin/addDoctor');
 });
// Add doctor (POST)

router.post('/add', async (req, res) => {
         try {
             const { name, address, timings, contact } = req.body;
             const newDoctor = new Doctor({name, address, timings, contact});
             await  newDoctor.save(); 
            //  await Doctor.create({ name, address, timings, contact });
             res.redirect('/admin/doctor');
         } catch (err) {
             res.status(500).send('Error adding doctor');
         }
     });

    //  show edit doctor form
      router.get('/edit/:id', async (req, res) => {
          try {
              const doctor = await Doctor.findById(req.params.id);
              res.render('admin/editDoctor', { doctor });
          } catch (err) {
              res.status(500).send('Error fetching doctor details');
          }
      });
      // POST update doctor details
  router.post('/edit/:id', async (req, res) => {
     try {
         const { name, address, timings, contact } = req.body;
         await Doctor.findByIdAndUpdate(req.params.id, { name, address, timings, contact });
         res.redirect('/admin/doctor');
     } catch (err) {
         res.status(500).send('Error updating doctor');
     }
 });
// GET delete doctor
 router.get('/delete/:id', async (req, res) => {
     try {
         await Doctor.findByIdAndDelete(req.params.id);
         res.redirect('/admin/doctor');
     } catch (err) {
         res.status(500).send('Error deleting doctor');
     }
    });

 module.exports = router;

