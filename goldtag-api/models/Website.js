const mongoose = require('mongoose')
const websiteSchema= new mongoose.Schema({
    title:{
        type:String,
        unique:true
    },
    isActive:{
        type:Boolean,
        default:true,
    }
    }
    )
    module.exports=mongoose.model('Website',websiteSchema)