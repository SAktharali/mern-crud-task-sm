const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
    },
    email:{
        type:String,
        required:[true,'name is required'],
    },
    password:{
        type:String,
        required:[true,'name is required'],
    },
})

const userModel=mongoose.model('users',userSchema);

module.exports=userModel;


