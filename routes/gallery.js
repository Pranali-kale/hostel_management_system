const express = require("express");
const multer = require("multer");
const path = require("path");
const Image = require("../models/Image");

const router = express.Router();

// Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route to Show Gallery
router.get("/", async (req, res) => {
    try {
        const images = await Image.find();
        res.render("admin/imageGallery", { images });
    } catch (error) {
        res.status(500).send("Error loading gallery");
    }
});

// Route to Upload Image
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const newImage = new Image({
            imageName: req.file.filename,
            imagePath: "/uploads/" + req.file.filename
        });

        await newImage.save();
        res.redirect("/admin/gallery");
    } catch (error) {
        res.status(500).send("Error uploading image");
    }
});

// Route to Delete Image
router.post("/delete/:id", async (req, res) => {
    try {
        await Image.findByIdAndDelete(req.params.id);
        res.redirect("/admin/gallery");
    } catch (error) {
        res.status(500).send("Error deleting image");
    }
});

module.exports = router;
