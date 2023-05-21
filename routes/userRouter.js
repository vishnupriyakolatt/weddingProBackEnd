 const express=require('express');
 const router=express.Router();
 const User=require('../controllers/userController');
 
 const userAuth=require('../middleware/userAuth')

 router.post('/login',User.login)
 
router.post('/signup',User.postsignup)
router.post('/otp',User.otpverify)


 //require for all routes

router.post('/photoBookadd/:id',User.PhotoBook)
router.post('/checkDate/:id',User.checkDate)
router.post('/BookVenue/:id',User.VenueBook)
router.post('/checkvenueDate/:id',User.checkVenue)
router.post('/BookDecor/:id',User.DecorBook)

 router.put("/cancelItem/:id",User.itemCancel)

router.post('/checkdecorDate/:id',User.checkDecor)



router.get('/Orderdisplay',User.Order)


 router.use(userAuth)
router.get('/singleVenue/:id',User.singleVenue)
router.get('/venuedisplay',User.venuedisplay)

router.get('/photodisplay',User.photodisplay)
router.get('/singlePhotographer/:id',User.singlePhoto)
router.get('/Decordisplay',User.Decordisplay)

router.get('/singleDecor/:id',User.singleDecor)





  module.exports=router;



