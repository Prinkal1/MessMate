const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
	Day: {
		type: String,
		trim: true,
	},
    Breakfast:{
		type: String,
		trim: true,
	},
    Lunch :{
		type: String,
		trim: true,
	},
	Dinner: {
		type: String,
		trim: true,
	},
    Sweet_dish: {
		type: String,
		trim: true,
	},
});

module.exports = mongoose.model("Menu", menuSchema);