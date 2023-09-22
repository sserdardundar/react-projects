const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const jwt= require('jsonwebtoken')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'user name is required'],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,'user mail is required'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide a valid email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'user password is required'],
        minlength:6,
    },
    isActive:{
        type:Boolean,
        default:true
    }
    })
    userSchema.pre('save',async function () {
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)
    })
    userSchema.methods.getToken=function (){
        return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
    }
    userSchema.methods.comparePasswords=async function(wantedPassword){
        const isaMatch= bcrypt.compare(wantedPassword,this.password)
        return isaMatch
    }
const User = mongoose.model('User',userSchema)
User.createIndexes();  
module.exports=User  