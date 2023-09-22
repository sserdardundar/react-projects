const mongoose = require('mongoose')

const fdSchema= new mongoose.Schema({
    belong:{
        type:mongoose.Types.ObjectId,
        required:[true," parentsubheader is required"],
    },
    title:{
        type:String,
        required:[true,'feature title is required']
    },
    description:{
        type:String
    },
    }
    )


    module.exports=mongoose.model('FeatureDetailed',fdSchema) 