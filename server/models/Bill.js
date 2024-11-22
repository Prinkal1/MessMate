const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
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
    totalExpense: {
        type: Number,
        required: true,
    },
    perStudentCost: {
        type: Number,
        required: true,
    },
    totalStudents: {
        type: Number,
        required: true,
    },
    expenses: {
        grocery: { 
			type: Number, 
			required: true 
		},
        milk: { 
			type: Number, 
			required: true 
		},
        vegetables: { 
			type: Number, 
			required: true 
		},
        otherItems: { 
			type: Number, 
			default: 0 
		}, // Optional additional items
    },
    calculatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Bill", billSchema);
