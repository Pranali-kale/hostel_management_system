
const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Student = require('../models/student');
const mongoose = require('mongoose'); 

// View All Rooms
router.get('/', async (req, res) => {
    const rooms = await Room.find();
    res.render('admin/viewRooms', { rooms });
});

// Add Room Form
router.get('/add', (req, res) => {
    res.render('admin/addRoom');
});

// Add Room (POST)
router.post('/add', async (req, res) => {
    const { roomNumber, type, capacity } = req.body;
    try {
        const room = new Room({ roomNumber, type, capacity });
        await room.save();
        res.redirect('/admin/rooms');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding room');
    }
});

// Edit Room Form
router.get('/edit/:id', async (req, res) => {
    const room = await Room.findById(req.params.id);
    res.render('admin/editRoom', { room });
});

// Update Room (POST)
router.post('/update/:id', async (req, res) => {
    const { roomNumber, type, capacity, occupied } = req.body;
    const status = occupied >= capacity ? 'Full' : 'Available';
    await Room.findByIdAndUpdate(req.params.id, { roomNumber, type, capacity, occupied, status });
    res.redirect('/admin/rooms');
});

// Delete Room
router.get('/delete/:id', async (req, res) => {
    await Room.findByIdAndDelete(req.params.id);
    res.redirect('/admin/rooms');
});


    


 router.get("/allocate", async (req, res) => {
    try {
        const students = await Student.find({ roomId: { $exists: false } }); // Fetch students without assigned rooms
        const rooms = await Room.find({ $expr: { $lt: ["$occupied", "$capacity"] } }); // Fetch available rooms
    
        res.render("admin/allocateRoom", { students, rooms });
        // res.render("allocate-room", { students, rooms });  
        // const rooms = await Room.find({ occupied: { $lt: mongoose.Types.Number(capacity) } });

    } catch (error) {
        console.error("Error fetching data:", error);
        // res.status(500).send("Error loading allocation page.");
    }
});


router.post('/allocate', async (req, res) => {
    try {
        let { studentId, roomId } = req.body;

        // Optional validation
        if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(roomId)) {
            return res.status(400).send('Invalid student or room ID.');
        }

        const room = await Room.findById(roomId);
        if (!room) return res.status(404).send('Room not found.');

        if (room.occupied < parseInt(room.capacity)) {
            // 🔧 Save the actual room number string in student's roomNumber field
            await Student.findByIdAndUpdate(studentId, {
                roomNumber: room.roomNumber
            });

            // Update room stats
            room.occupied += 1;
            room.status = room.occupied >= parseInt(room.capacity) ? 'Full' : 'Available';
            await room.save();

            res.redirect('/admin/rooms');
        } else {
            res.send('Room is already full.');
        }
    } catch (err) {
        console.error('Room allocation error:', err);
        res.status(500).send('Room allocation failed.');
    }
});


router.get('/deallocate', async (req, res) => {
    try {
        const students = await Student.find({ roomNumber: { $exists: true, $ne: null } });
        res.render('admin/deallocateRoom', { students });
    } catch (error) {
        console.error('Error loading deallocation page:', error);
        res.status(500).send('Error loading deallocation page.');
    }
});


router.post('/deallocate', async (req, res) => {
    try {
        const { studentId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).send('Invalid student ID.');
        }

        const student = await Student.findById(studentId);
        if (!student || !student.roomNumber) {
            return res.status(404).send('Student not found or no room assigned.');
        }

        const room = await Room.findOne({ roomNumber: student.roomNumber });
        if (!room) {
            return res.status(404).send('Assigned room not found.');
        }

        // Deallocate room
        student.roomNumber = undefined;
        await student.save();

        // Update room stats
        room.occupied = Math.max(0, room.occupied - 1);  // prevent negative values
        room.status = room.occupied >= parseInt(room.capacity) ? 'Full' : 'Available';
        await room.save();

        res.redirect('/admin/rooms');
    } catch (err) {
        console.error('Room deallocation error:', err);
        res.status(500).send('Room deallocation failed.');
    }
});


module.exports = router;


