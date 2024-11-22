const Bill = require("../models/Bill");
const User = require("../models/User");
const Attendance = require("../models/Attendance");

// Calculate total monthly expenses and divide by students for per-student cost
exports.addBill = async (req, res) => {
    try {
        const { month, year, expenses } = req.body;
        const { grocery, milk, vegetables, otherItems = 0 } = expenses;

        if (!month || !year || !grocery || !milk || !vegetables) {
            return res.status(400).json({
                success: false,
                message: "Fields month, year, grocery, milk, and vegetables are required",
            });
        }

        // Calculate total expense
        const totalExpense = grocery + milk + vegetables + otherItems;

        // Get all active students
        const students = await User.find({ accountType: "Student", active: true });
        const totalStudents = students.length;

        if (totalStudents === 0) {
            return res.status(400).json({
                success: false,
                message: "No active students available for billing",
            });
        }

        // Calculate cost per student (for present days)
        const perStudentCost = totalExpense / totalStudents;

        // Save Bill Record
        const bill = new Bill({
            month,
            year,
            totalExpense,
            perStudentCost,
            totalStudents,
            expenses: {
                grocery,
                milk,
                vegetables,
                otherItems,
            },
        });

        await bill.save();
        return res.status(201).json({
            success: true,
            message: "Bill added successfully",
            bill,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding the bill",
            error: error.message,
        });
    }
};

// Calculate individual student bills based on attendance
exports.calculateStudentBills = async (req, res) => {
    try {
        const { month, year } = req.params;

        // Retrieve the bill for the specified month and year
        const bill = await Bill.findOne({ month, year });
        if (!bill) {
            return res.status(404).json({
                success: false,
                message: `Bill record not found for ${month}/${year}`,
            });
        }

        const perStudentCost = bill.perStudentCost;
        const studentBills = [];

        // Fetch attendance and calculate cost for each student
        const students = await User.find({ accountType: "Student", active: true });
        for (const student of students) {
            // Get attendance for the student in the specific month and year
            const attendanceRecords = await Attendance.find({
                user: student._id,
                date: {
                    $gte: new Date(`${year}-${month}-01`),
                    $lt: new Date(`${year}-${month}-31`),
                },
                status: "present",
            });

            const presentDays = attendanceRecords.length;
            const totalBillForStudent = presentDays * perStudentCost;

            studentBills.push({
                studentId: student._id,
                name: `${student.firstName} ${student.lastName}`,
                presentDays,
                totalBill: totalBillForStudent,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student bills calculated successfully",
            studentBills,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while calculating student bills",
            error: error.message,
        });
    }
};

// Fetch the bill details for a specific month and year
exports.fetchBill = async (req, res) => {
    try {
        const { month, year } = req.params;
        const bill = await Bill.findOne({ month, year });
        if (!bill) {
            return res.status(404).json({
                success: false,
                message: `No bill found for ${month}/${year}`,
            });
        }
        res.status(200).json({
            success: true,
            bill,
            message: "Bill fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
