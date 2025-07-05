const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema({
    year: { type: String , required: true },
    amount: { type: Number, required: true }
});

module.exports = mongoose.model("Fee", FeeSchema);
