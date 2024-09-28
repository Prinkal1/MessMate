const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
		ref:'User'
    },
    date:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Attendance',AttendanceSchema);