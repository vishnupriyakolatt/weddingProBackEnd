 const express=require('express');
 const router=express.Router();
 const User=require('../controllers/userController');
 
 const userAuth=require('../middleware/userAuth')

 router.post('/login',User.login)
 
router.post('/signup',User.postsignup)
router.post('/otp',User.otpverify)


 //require for all routes

router.post('/photoBookadd/:id',User.PhotoBook)
router.post('/BookVenue/:id',User.VenueBook)
router.post('/BookDecor/:id',User.DecorBook)

 router.use(userAuth)
router.get('/singleVenue/:id',User.singleVenue)
router.get('/venuedisplay',User.venuedisplay)

router.get('/photodisplay',User.photodisplay)
router.get('/singlePhotographer/:id',User.singlePhoto)
router.get('/Decordisplay',User.Decordisplay)

router.get('/singleDecor/:id',User.singleDecor)




  module.exports=router;



