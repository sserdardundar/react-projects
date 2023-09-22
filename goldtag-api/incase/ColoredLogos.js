const mongoose = require('mongoose')

    const colorlogoSchema= new mongoose.Schema({
        belong:{
            type:mongoose.Types.ObjectId,
            required:[true," parent subheader is required"],
        },
        title:{
            type:String,
            required:[true,'Meet us title is required']
        },
        description:{
            type:String
        },
        logolist:{
            type:Array
        }
        }
        )
    
    
        module.exports=mongoose.model('ColoredLogos',colorlogoSchema) 