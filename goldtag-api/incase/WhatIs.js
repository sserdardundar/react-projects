const mongoose = require('mongoose')

const whatisSchema= new mongoose.Schema({
    belong:{
        type:mongoose.Types.ObjectId,
        required:[true," parent subheader name is required"],
    },
    title:{
        type:String,
        required:[true,'What is title  required']
    },
    description:{
        type:String
    },
    countPairs:{
        type:Array
    }
    }
    )


    module.exports=mongoose.model('WhatIs',whatisSchema) 