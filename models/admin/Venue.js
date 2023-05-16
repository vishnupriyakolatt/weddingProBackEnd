const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const venueSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    description:{
          type:String,
        required:true
    },
    manager:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
   
email:{
    type:String,
    required:true

},
mobile:{
type:String,
required:true
},
location:{
    type:String,
    required:true
},
seats:{
    type:String,
    required:true
},
rent:{
    type:String,
    required:true
},image: {
  type:Array
}

})
const venuecollection=mongoose.model("venueSchema",venueSchema)
module.exports=venuecollection
