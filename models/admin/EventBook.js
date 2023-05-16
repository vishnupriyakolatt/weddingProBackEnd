const mongoose=require('mongoose');
const photographer = require('../admin/Photographer');
const User = require('../userModels/userDetail');
const Venue=require('../admin/Venue')
const Decor=require('../admin/Decoration')
const Schema=mongoose.Schema;
const EventBookSchema=new Schema({
userId:{
    type:Schema.Types.ObjectId,
    ref:'User'
},
photoId:{
    type:Schema.Types.ObjectId,
    ref:'photographer'
},
venueId:{
    type:Schema.Types.ObjectId,
    ref:'Venue'
},
decorId:{
    type:Schema.Types.ObjectId,
    ref:'Decor'
},
Date:{
    type:Date,
    required:true
}


})
const Booking=mongoose.model('Booking',EventBookSchema)
module.exports=Booking