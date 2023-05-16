const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const Venue=require('../admin/Venue')
const VenueBookSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
        ref: 'User', // reference to User model
    },
    VenueId: {
        type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
        ref: 'Venue', // reference to Decoration model
    },
    Date: {
        type: String,
    },
});
const VenueBook=mongoose.model("VenueBook",VenueBookSchema)
module.exports=VenueBook;