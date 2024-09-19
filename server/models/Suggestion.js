const mongoose = require('mongoose');
const suggestionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
		ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports  = mongoose.model('Suggestion',suggestionSchema);