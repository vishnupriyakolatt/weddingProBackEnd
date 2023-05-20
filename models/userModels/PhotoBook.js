const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const Photo=require('../admin/Photographer')
const PhotoBookSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // change type to ObjectId
        ref: 'User', // reference to User model
    },
    PhotoId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'photographerSchema', 
    },
    Date: {
        type: String,
      },
    },
    {
      timestamps: true, 
    });
const PhotoBook=mongoose.model("PhotoBook",PhotoBookSchema)
module.exports=PhotoBook;