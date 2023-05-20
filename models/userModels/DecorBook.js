const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const Decor=require('../admin/Decoration')
const DecorBookSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
        ref: 'User', 
    },
    DecorId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'DecorSchema', 
    },
    Date: {
        type: String,
    },},
    {
      timestamps: true, 
    }
);
const DecorBook=mongoose.model("DecorBook",DecorBookSchema)
module.exports=DecorBook;