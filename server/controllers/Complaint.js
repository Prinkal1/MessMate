const Complaint = require("../models/Complaint")

exports.registerComplaint = async (req, res) => {
    let success = false;
    const { student, type, title, description } = req.body;
    try {
        const newComplaint = new Complaint({
            user : student,
            type,
            title,
            description
        });
        await newComplaint.save();
        success = true;
        res.json({ success, msg: 'Complaint registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.fetchComplaint = async (req, res) =>{
    try {
        const complaints = await Complaint.find().populate('user', ['firstName', 'email']);
        
        return res.status(200).json({
			success: true,
			complaints,
			message: "Complaint fetched successfully",
		});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

exports.getbystudent = async (req, res) => {
    let success = false;
    
    const { student } = req.body;
    try {
        const complaints = await Complaint.find({  user : student });
        return res.status(200).json({
			success: true,
			complaints,
			message: "Complaint fetched successfully",
		});
    }
    catch (err) {
        console.error(err.errors);
        res.status(500).send('Server error');
    }
}

exports.resolve = async (req, res) => {
    let success = false;
    
    const { id } = req.body;
    try {
        const complaint = await Complaint.findById(id);
        complaint.status = "solved";
        await complaint.save();
        success = true;
        res.json({ success });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
