require("dotenv").config();
const Notification = require("../models/Notification")

exports.addNotification = async (req, res) =>{
    try{
        const{
            notification,
            createdAt
        }= req.body

        //check all details are present
        if (
            !notification
        ) {
            return res.status(403).send({
                success: false,
                message: "Adding notification is required",
            });
        }
        const noti = await Notification.create({
			Day,
            Breakfast,
            Lunch,
            Dinner,
            Sweet_dish
		});

		return res.status(200).json({
			success: true,
			menu,
			message: "Menu added successfully",
		});
}catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        message: "Menu cannot be added",
    });
}
}
