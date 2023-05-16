const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const Decor=require('../admin/Decoration')
const DecorBookSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
        ref: 'User', // reference to User model
    },
    DecorId: {
        type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
        ref: 'Decor', // reference to Decoration model
    },
    Date: {
        type: String,
    },
});
const DecorBook=mongoose.model("DecorBook",DecorBookSchema)
module.exports=DecorBook;