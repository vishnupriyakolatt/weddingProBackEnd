const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const Venue=require('../admin/Venue')
const VenueBookSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
        ref: 'User', 
    },
    VenueId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'venueSchema', 
    },
    Date: {
        type: String,
    },
},
{
  timestamps: true, 
});
const VenueBook=mongoose.model("VenueBook",VenueBookSchema)
module.exports=VenueBook;