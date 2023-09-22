const mongoose = require('mongoose')

const walletSchema= new mongoose.Schema({
    belong:{
        type:mongoose.Types.ObjectId,
        required:[true,"userId is required"],
    },
    isActive:{
        type:Boolean,
        default:true
    },
    coins:{
        type:Array,
        default:[],
    },
    }
    )


    module.exports=mongoose.model('Wallet',walletSchema) 