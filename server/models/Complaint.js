const mongoose = require("mongoose");
const complaintSchema = new mongoose.Schema(
	{
		complaint: {
			type: String,
			required: true,
			trim: true,
		},
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 3*30*24*60*60, // 3 months min mei delete
        },
	},
);

module.exports = mongoose.model("Complaint", complaintSchema);