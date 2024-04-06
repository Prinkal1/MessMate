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
            expires: 5*24*60*60, // 5 days min mei delete
        },
	},
);

module.exports = mongoose.model("Complaint", complaintSchema);