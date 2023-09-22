const mongoose = require('mongoose')

const baSchema= new mongoose.Schema({
    belong:{
        type:mongoose.Types.ObjectId,
        required:[true," parent website name is required"],
    },
    title:{
        type:String,
    },
    areas:{
        type:Array
    }
    }
    )


    module.exports=mongoose.model('BusinessAreas',baSchema) 