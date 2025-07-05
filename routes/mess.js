const express = require("express");
const Mess = require("../models/Mess");

const router = express.Router();

// 📌 GET: Show Mess Menu in Admin Dashboard
router.get("/admin/mess", async (req, res) => {
    try {
        const menu = await Mess.find();
        res.render("admin/mess", { menu });
    } catch (error) {
        res.status(500).send("Error loading mess menu");
    }
});

// 📌 POST: Add New Mess Menu
router.post("/admin/mess/add", async (req, res) => {
    try {
        const { day, breakfast, lunch, dinner } = req.body;
        const newMenu = new Mess({ day, breakfast, lunch, dinner });
        await newMenu.save();
        res.redirect("/admin/mess");
    } catch (error) {
        res.status(500).send("Error adding menu");
    }
});

// 📌 GET: Edit Mess Menu
router.get("/admin/mess/edit/:id", async (req, res) => {
    try {
        const menu = await Mess.findById(req.params.id);
        res.render("admin/editMess", { menu });
    } catch (error) {
        res.status(500).send("Error loading menu");
    }
});

// 📌 POST: Update Mess Menu
router.post("/admin/mess/update/:id", async (req, res) => {
    try {
        const { breakfast, lunch, dinner } = req.body;
        await Mess.findByIdAndUpdate(req.params.id, { breakfast, lunch, dinner });
        res.redirect("/admin/mess");
    } catch (error) {
        res.status(500).send("Error updating menu");
    }
});

// 📌 GET: Delete Mess Menu
router.get("/admin/mess/delete/:id", async (req, res) => {
    try {
        await Mess.findByIdAndDelete(req.params.id);
        res.redirect("/admin/mess");
    } catch (error) {
        res.status(500).send("Error deleting menu");
    }
});

module.exports = router;
