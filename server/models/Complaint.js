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
			default:Date.now
		}
	},
);

module.exports = mongoose.model("Complaint", complaintSchema);