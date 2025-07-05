const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    studentRollNo: { type: String, required: true },
    complaintText: { type: String, required: true },
    
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Complaint", complaintSchema);
