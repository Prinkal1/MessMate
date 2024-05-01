const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
	{
		notification: {
			type: String,
			required: true,
			trim: true,
		},
		day:{
			type: String,
			required: true,
		},
		date:{
			type: String,
			required: true,
		},
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 3*30*24*60*60, // 3 months min mei delete
        },
	},
);

module.exports = mongoose.model("Notification", notificationSchema);