const mongoose = require('mongoose')

    const partnersSchema= new mongoose.Schema({
        belong:{
            type:mongoose.Types.ObjectId,
            required:[true," parent subheader is required"],
        },
        title:{
            type:String,
            required:[true,'Partners title is required']
        },
        description:{
            type:String
        },
        }
        )
    
    
        module.exports=mongoose.model('Partners',partnersSchema) 