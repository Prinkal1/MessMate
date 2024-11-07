const  MessOff = require('../models/MessOff');
const  User = require('../models/User');


exports.requestMessOff = async (req, res) => {
    let success = false;
    const { user, leaving_date, return_date } = req.body;
    const today = new Date();
    if (new Date(leaving_date) > new Date(return_date)) {
        return res.status(400).json({success, "message": "Leaving date cannot be greater than return date"});
    }
    else if (new Date(leaving_date) < today) {
        return res.status(400).json({success, "message": "Request cannot be made for past Mess off"});
    }
    try {
        const messOff = new MessOff({
            user,
            leaving_date,
            return_date
        });
        await messOff.save();
        success = true;
        return res.status(200).json({success, "message": "Mess off request sent successfully"});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({success, "message": "Server Error"});
    }
}

exports.countMessOff = async (req, res) => {
    let success = false;
    
    const { user } = req.body;
    try {
        let date = new Date();
        const list = await MessOff.find({ user , leaving_date: { $gte: new Date(date.getFullYear(), date.getMonth(), 1), $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0) } });
        let approved = await MessOff.find({user , status: "Approved", leaving_date: {$gte: new Date(date.getFullYear(), date.getMonth(), 1), $lte: new Date(date.getFullYear(), date.getMonth()+1, 0)}});
        
        let days = 0;
        for (let i = 0; i < approved.length; i++) {
            days += (new Date(approved[i].return_date) - new Date(approved[i].leaving_date))/(1000*60*60*24);
        }

        approved = days;

        success = true;
        return res.status(200).json({success, list, approved});
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({success, "message": "Server Error"});
    }
}


exports.listMessOff = async (req, res) => {
    let success = false;

    try {
        // Get all students from the User collection
        const users = await User.find({ accountType: 'Student' });

        // Extract user IDs for querying
        const userIds = users.map(user => user._id);

        // Find all pending mess off requests for those students
        const list = await MessOff.find({
            user: { $in: userIds }, 
            status: "pending"
        }).populate('user', ['_id', 'firstName', 'lastName', 'email', 'messacc']);
        
        // Get the first and last date of the current month
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        // Count approved mess off requests within the current month
        const approved = await MessOff.countDocuments({
            user: { $in: userIds }, 
            status: "approved", 
            leaving_date: { $gte: startOfMonth, $lte: endOfMonth }
        });

        // Count rejected mess off requests within the current month
        const rejected = await MessOff.countDocuments({
            user: { $in: userIds }, 
            status: "rejected", 
            leaving_date: { $gte: startOfMonth, $lte: endOfMonth }
        });

        // Mark operation as successful
        success = true;

        // Return the response
        return res.status(200).json({ success, list, approved, rejected });
    }
    catch (err) {
        // Log the error for debugging
        console.error(err.message);
        return res.status(500).json({ success, errors: [{ msg: "Server Error" }] });
    }
}




exports.updateMessOff = async (req, res) => {
    let success = false;
    const { id, status } = req.body;
    try {
        const messOff = await MessOff.findByIdAndUpdate(id, { status });
        success = true;
        return res.status(200).json({success, messOff});
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({success, errors: [{msg: "Server Error"}]});
    }
}