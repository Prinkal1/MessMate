const mongoose = require("mongoose");
const Schema = mongoose.Schema
const complaintSchema = Schema(
	{
		user:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'
		},
		type:{
			type:String,
			required:true
		},
		title:{
			type:String,
			required:true
		},
		description:{
			type:String,
			required:true
		},
		status:{
			type:String,
			default:'pending'
		},
		date:{
			type:Date,
			default:Date.now,
			expires: 30*24*60*60*1000, //in 1 month
		}
	},
);

module.exports = mongoose.model("Complaint", complaintSchema);