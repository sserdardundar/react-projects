const mongoose = require('mongoose')

    const podcastSchema= new mongoose.Schema({
        belong:{
            type:mongoose.Types.ObjectId,
            required:[true," parent subheader is required"],
        },
        title:{
            type:String,
            required:[true,'Podcast title is required']
        },
        playing:{
            type:String
        },
        subtitle:{
            type:String
        },
        playlist:{
            type:Array
        }
        }
        )
    
    
        module.exports=mongoose.model('Podcast',podcastSchema) 