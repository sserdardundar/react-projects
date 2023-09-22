const mongoose = require('mongoose')

const usaSchema= new mongoose.Schema({
    belong:{
        type:mongoose.Types.ObjectId,
        required:[true," parent subheader is required"],
    },
    title:{
        type:String,
    },
    description:{
        type:String
    },
    sides:{
        type:String
    },
    definition:{
        type:String
    },
    }
    )


    module.exports=mongoose.model('UserAgreement',usaSchema) 