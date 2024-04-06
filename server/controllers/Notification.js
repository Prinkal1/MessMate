require("dotenv").config();
const Notification = require("../models/Notification")

exports.addNotification = async (req, res) =>{
    try{
        const{
            notification,
            day,
            date,
            createdAt
        }= req.body

        //check all details are present
        if (
            !notification,
            !day,
            !date
        ) {
            return res.status(403).send({
                success: false,
                message: "Adding notification is required",
            });
        }
        const notifi = await Notification.create({
			notification,
            day,
            date,
            createdAt
		});
        console.log(notifi)
		return res.status(200).json({
			success: true,
			notifi,
			message: "Notification added successfully",
		});
}catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        message: "Notification cannot be added",
    });
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
