require("dotenv").config();
const Notification = require("../models/Notification")

exports.addNotification = async (req, res) =>{
    let success = false;
    const { user, title, description } = req.body;
    try {
        const newNotification = new Notification({
            user,
            title,
            description
        });
        await newNotification.save();
        success = true;
        res.json({ success, msg: 'Notification registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.fetchNotification = async (req, res) =>{
    try {
        const notifi = await Notification.find();
        console.log(notifi)
        return res.status(200).json({
			success: true,
			notifi,
			message: "Notification fetched successfully",
		});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
