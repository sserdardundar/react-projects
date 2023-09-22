const mongoose = require('mongoose')

const comSchema= new mongoose.Schema({
    belong:{
        type:mongoose.Types.ObjectId,
        required:[true," parent website name is required"],
    },
    address:{
        type:String,
    },
    phone:{
        type:String,
        required:[true,"Phone is required"]
    },
    mail:{
        type:String,
        required:[true,"Mail is required"]
    }
    }
    )


    module.exports=mongoose.model('Communication',comSchema) 