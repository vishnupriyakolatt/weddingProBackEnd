const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const adminSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    age:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:false
    },
     password:{
    type:String,
    

    },
    mobile:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    isblocked:{
        type:Boolean,
        default:false
    }

})
const admin=mongoose.model("AdminSchema",adminSchema)
module.exports=admin
