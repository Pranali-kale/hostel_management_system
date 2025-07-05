const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    rollNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
 roomNumber: { type: String, default: null },

    password: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;