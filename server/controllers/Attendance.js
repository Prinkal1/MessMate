const  User = require('../models/User');
const  Attendance = require('../models/Attendance');

const markAttendance = async (req, res) => {
    let success = false;

    const { user, status } = req.body;
    const date = new Date();

    try {
        // Check if attendance has already been marked for the user today
        const alreadyAttendance = await Attendance.findOne({
            user, 
            date: { 
                $gte: date.setHours(0, 0, 0, 0), 
                $lt: date.setHours(23, 59, 59, 999) 
            }
        });

        if (alreadyAttendance) {
            return res.status(409).json({ success, error: 'Attendance already marked' });
        }

        // Create a new attendance record
        const attendance = new Attendance({
            user,
            status
        });

        const result = await attendance.save();
        success = true;

        // Return the response properly as an object
        res.status(201).json({ success, result });
    } catch (err) {
        // Handle any errors that occur
        res.status(500).json({ success, error: err.message });
    }
};


const getAttendance = async (req, res) => {
    let success = false;

    const { user } = req.body;
    
    if (!user) {
        return res.status(400).json({ success, error: "User is required" });
    }

    try {
        // Fetch attendance for the provided user
        const attendance = await Attendance.find({ user });

        if (attendance.length === 0) {
            return res.status(404).json({ success, error: "No attendance records found" });
        }

        success = true;
        res.status(200).json({ success, attendance });
    }
    catch (err) {
        console.error(err);
        // Handle errors and return appropriate response
        res.status(500).json({ success, error: err.message });
    }
};


const updateAttendance = async (req, res) => {
    const { user, status } = req.body;

    if (!user || !status) {
        return res.status(400).json({ success: false, error: "User and status are required" });
    }

    try {
        const date = new Date();
        
        // Set the date range to match attendance records for the current day
        const attendance = await Attendance.findOneAndUpdate(
            { user, date: { $gte: date.setHours(0, 0, 0, 0), $lt: date.setHours(23, 59, 59, 999) } },
            { status },
            { new: true } // Return the updated document
        );

        if (!attendance) {
            return res.status(404).json({ success: false, error: "Attendance record not found for today" });
        }

        res.status(200).json({ success: true, attendance });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const getAllAttendance = async (req, res) => {
    let success = false;
    try {
        // Get the current date
        const now = new Date();
        
        // Use UTC to ensure timezone consistency
        const startOfDay = new Date(now.setUTCHours(0, 0, 0, 0));
        const endOfDay = new Date(now.setUTCHours(23, 59, 59, 999));

        // Find attendance records for the current day and students
        const users = await User.find({ accountType: 'Student' });
        const attendance = await Attendance.find({
            user: { $in: users },
            date: { $gte: startOfDay.toISOString(), $lt: endOfDay.toISOString() }
        }).populate('user', ['_id', 'firstName', 'lastName', 'email','messacc']);

        if (attendance.length === 0) {
            return res.status(404).json({ success: false, message: "No attendance records found for today." });
        }

        success = true;
        res.status(200).json({ success, attendance });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}




module.exports = {
    markAttendance,
    getAttendance,
    updateAttendance,
    getAllAttendance
}

