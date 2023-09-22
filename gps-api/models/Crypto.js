const mongoose = require('mongoose')

const cryptoSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Crypto currency name is required"],
        maxlength:5
    },
    price:{
        type:String,
        required:[true,'crypto price is required']
    },
    time:{
        type:Date,
    }
    }
    )


    module.exports=mongoose.model('Crypto',cryptoSchema)