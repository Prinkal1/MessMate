const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
	{
		user:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'
		},
		title:{
			type:String,
			required:true
		},
		description:{
			type:String,
			required:true
		},
		date:{
			type:Date,
			default:Date.now,
			expires: 15*24*60*60*1000, //15 days
		}
	},
);

module.exports = mongoose.model("Notification", notificationSchema);