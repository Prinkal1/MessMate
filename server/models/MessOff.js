const mongoose = require('mongoose');
const MessOffSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
		ref:'User'
    },
    leaving_date:{
        type:Date,
        required:true
    },
    return_date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    },
    request_date:{
        type:Date,
        default:Date.now
    }
})

module.exports = MessOff = mongoose.model('MessOff',MessOffSchema);