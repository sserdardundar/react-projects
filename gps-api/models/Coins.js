const mongoose = require('mongoose')
const coinsSchema= new mongoose.Schema({
    symbol:{
        type:String,
        unique:true
    },
    isActive:{
        type:Boolean,
        default:true,
        required:true
    },
    category:{
        type:String,
        default:"gap"
    },
    count:{
        type:Number,
        default:0
    }
    }
    )


    module.exports=mongoose.model('Coins',coinsSchema)