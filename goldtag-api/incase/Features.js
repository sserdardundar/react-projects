const mongoose = require('mongoose')

const featuresSchema= new mongoose.Schema({
    belong:{
        type:mongoose.Types.ObjectId,
        required:[true," parent subheader is required"],
    },
    title:{
        type:String,
        required:[true,'features title is required']
    },
    description:{
        type:String
    },
    comments:{
        type:Array
    }
    }
    )


    module.exports=mongoose.model('CommentSection',featuresSchema) 