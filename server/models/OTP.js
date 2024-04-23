const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // 5 min mei delete
	},
});
module.exports = mongoose.model("OTP", OTPSchema);
