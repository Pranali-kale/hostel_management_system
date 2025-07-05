const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

// View All Notices
router.get("/", async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 }); // Sort by latest notice
        res.render("admin/notices", { notices });
    } catch (err) {
        res.status(500).send("Error fetching notices");
    }
});

// Add Notice
router.post("/add", async (req, res) => {
    try {
        const { title, description } = req.body;
        const newNotice = new Notice({ title, description, date: new Date() });
        await newNotice.save();
        res.redirect("/admin/notices");
    } catch (err) {
        res.status(500).send("Error adding notice");
    }
});

// Show Edit Notice Form
router.get("/edit/:id", async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        res.render("admin/editNotice", { notice });
    } catch (err) {
        res.status(500).send("Error fetching notice");
    }
});

// Update Notice
router.post("/edit/:id", async (req, res) => {
    try {
        await Notice.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/admin/notices");
    } catch (err) {
        res.status(500).send("Error updating notice");
    }
});

// Delete Notice
router.post("/delete/:id", async (req, res) => {
    try {
        await Notice.findByIdAndDelete(req.params.id);
        res.redirect("/admin/notices");
    } catch (err) {
        res.status(500).send("Error deleting notice");
    }
});

module.exports = router;
