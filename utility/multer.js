const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name:'de8j43bvd',
  api_key:'552827116629916',
  api_secret:'snE_coPwPA0Ft3pE4-SqptXvTZs'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Weddingpro',
    allowed_formats: ['jpg', 'png'],
    limits: { fileSize: 1024 * 1024 * 5 },
    // height: 200, width: 200, crop: "fill"
  }
});
// console.log(storage)
const upload = multer({ storage: storage });

module.exports = upload;

