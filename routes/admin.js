const express = require("express");
const router = express.Router();

// Admin Dashboard (Only accessible if logged in)
router.get("/dashboard", (req, res) => {
    if (!req.session.admin) {
        return res.redirect("/login");
    }
    res.render("adminDashboard");
});

module.exports = router;
