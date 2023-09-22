const mongoose = require('mongoose')

    const blogsSchema= new mongoose.Schema({
        belong:{
            type:mongoose.Types.ObjectId,
            required:[true," parent subheader is required"],
        },
        title:{
            type:String,
            required:[true,'Blogs title is required']
        },
        blog:{
            type:Array
        }
        }
        )
    
    
        module.exports=mongoose.model('Blogs',blogsSchema) 