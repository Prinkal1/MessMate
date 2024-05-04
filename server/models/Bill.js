const mongoose = require("mongoose");
const billSchema = new mongoose.Schema(
	{
		
		month: {
			type: String,
			required: true,
			trim: true,
		},
        year: {
			type: String,
			required: true,
			trim: true,
		},
        groceryBill: {
			type: Number,
			required: true,
			trim: true,
		},
        milkBill: {
			type: Number,
			required: true,
			trim: true,
		},
        vegeBill: {
			type: Number,
			required: true,
			trim: true,
		},
        totalBill: {
			type: Number,
			required: true,
			trim: true,
		},
	},
);

module.exports = mongoose.model("Bill", billSchema);