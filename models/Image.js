const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    imageName: { type: String, required: true },
    imagePath: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Image", imageSchema);
