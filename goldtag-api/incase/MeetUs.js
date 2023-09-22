const mongoose = require('mongoose')

    const muSchema= new mongoose.Schema({
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
        }
        }
        )
    
    
        module.exports=mongoose.model('MeetUs',muSchema) 