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
            expires: 30*24*60*60, // 30 days min mei delete
        },
	},
);

module.exports = mongoose.model("Complaint", complaintSchema);