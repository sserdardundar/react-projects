const mongoose = require('mongoose')

const mainSchema= new mongoose.Schema({
    belong:{
        type:mongoose.Types.ObjectId,
        required:[true," parent subheader is required"],
    },
    title:{
        type:String,
        required:[true,'main title is required']
    },
    website:{
        type:String
    },
    slogan:{
        type:String
    },
    }
    )


    module.exports=mongoose.model('MainIdea',mainSchema) 