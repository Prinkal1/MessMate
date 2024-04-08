const mongoose = require("mongoose");
const additionalbillSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
        lastName: {
			type: String,
			required: true,
			trim: true,
		},
        messacc: {
			type: Number,
			required: true,
			trim: true,
		},
        monthlyBill: {
			type: Number,
			trim: true,
			default :"0"
		},
        maggi: {
			type: Number,
			trim: true,
            default :"0"
		},
        bread: {
			type: Number,
			trim: true,
            default :"0"
		},
        tea: {
			type: Number,
			trim: true,
            default :"0"
		},
        milk: {
			type: Number,
			trim: true,
            default :"0"
		},
	},
);

module.exports = mongoose.model("AdditionalBill", additionalbillSchema);