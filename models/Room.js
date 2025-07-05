
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
 roomNumber: { type: String, required: true },
    
    type: String,
    capacity: String,
    occupied: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Available'
    }
     
});

module.exports = mongoose.model('Room', roomSchema);
