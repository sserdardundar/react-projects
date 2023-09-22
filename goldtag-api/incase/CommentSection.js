const mongoose = require('mongoose')

const commentsSchema= new mongoose.Schema({
    belong:{
        type:mongoose.Types.ObjectId,
        required:[true," parent website name is required"],
    },
    title:{
        type:String,
        required:[true,'Comments title is required']
    },
    description:{
        type:String
    },
    comments:{
        type:Array
    }
    }
    )


    module.exports=mongoose.model('CommentSection',commentsSchema) 