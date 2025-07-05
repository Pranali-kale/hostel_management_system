const mongoose = require("mongoose");

const messSchema = new mongoose.Schema({
    day: { type: String, required: true, unique: true }, // Monday, Tuesday, etc.
    breakfast: { type: String, required: true },
    lunch: { type: String, required: true },
    dinner: { type: String, required: true }
});

const Mess = mongoose.model("Mess", messSchema);
module.exports = Mess;
