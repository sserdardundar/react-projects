const mongoose = require('mongoose')

const asSchema= new mongoose.Schema({
    belong:{
        type:mongoose.Types.ObjectId,
        required:[true," parent subheader is required"],
    },
    title:{
        type:String,
        required:[true,' title is required']
    },
    elements:{
        type:Array
    }
    }
    )


    module.exports=mongoose.model('ActionSolution',asSchema) 