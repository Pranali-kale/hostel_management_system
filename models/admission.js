const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
   
    email: { type: String, required: true, unique: true },
    marks: { type: String, required: true },
    phone: { type: String, required: true },
    roomPreference: { type: String, required: true },
    status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Admission", admissionSchema);
