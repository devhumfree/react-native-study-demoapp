const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        retuired:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,    
    },
    profilePicture:{
        type:String,
    },
    joinDate:{
        type:Date,
        default:Date.now
    },
    sentFollowRequests:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    receivedFollowRequest:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    verified:{
        type:Boolean,
        dafault:false
    },
    verificationToken:String
})

const User = mongoose.model("user", userSchema)

module.exports = User

