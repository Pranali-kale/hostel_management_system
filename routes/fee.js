const express = require("express");
const Fee = require("../models/Fee"); // Fee Model
const router = express.Router();

// Route to show fee structure (Admin Panel)
router.get("/", async (req, res) => {
    try {
        const fees = await Fee.find().sort({ year: -1 }); // Sorting by latest year first
        res.render("admin/feeStructure", { fees });
    } catch (error) {
        res.status(500).send("Error loading fee structure");
    }
});

// Route to show fee structure on the homepage
router.get("/fee_structure", async (req, res) => {
    try {
        const fees = await Fee.find().sort({ year: -1 });
        res.render("homepageFee", { fees });
    } catch (error) {
        res.status(500).send("Error loading fee structure on homepage");
    }
});

// Route to add a new fee structure
router.post("/add", async (req, res) => {
    try {
        const { year, amount } = req.body;
        const newFee = new Fee({ year, amount });
        await newFee.save();
        res.redirect("/admin/fee_structure");
    } catch (error) {
        res.status(500).send("Error adding fee structure");
    }
});

// Route to edit/update fee structure
router.post("/edit/:id", async (req, res) => {
    try {
        const { year, amount } = req.body;
        await Fee.findByIdAndUpdate(req.params.id, { year, amount });
        res.redirect("/admin/fee_structure");
    } catch (error) {
        res.status(500).send("Error updating fee structure");
    }
});

// Route to delete a fee structure
router.post("/delete/:id", async (req, res) => {
    try {
        await Fee.findByIdAndDelete(req.params.id);
        res.redirect("/admin/fee_structure");
    } catch (error) {
        res.status(500).send("Error deleting fee structure");
    }
});

module.exports = router;
