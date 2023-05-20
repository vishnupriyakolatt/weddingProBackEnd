const express=require('express');
 const router=express.Router();
 const upload=require('../utility/multer');
 const admin=require('../controllers/adminController')
// const adminAuth=require('../middleware/adminAuth')



router.post('/login',admin.login)
// router.use(adminAuth)
router.get('/Venuedisplay',admin.Venuecategory)
router.post('/Venueadd',upload.single('image'),admin.addVenue)


router.get('/customerdisplay',admin.customerview)

router.get('/photographerView',admin.viewphotographer)
 router.post('/addPhotographer',upload.array('image', 5),admin.photographerAdd)
 router.get('/singlePhotographer/:id',admin.singlePhotographer)
 router.post('/addVenueside',upload.array('image',4),admin.VenuesideAdd)
 router.get('/venuecollectView',admin.venuecollectview)
 router.get('/singleVenue/:id',admin.singleVenue)
 router.post('/addDecor',upload.array('image', 4),admin.Decoradd)
 router.get('/Decorview',admin.Decorview)
 router.get('/singleDecor/:id',admin.singleDecor)
 router.put("/decoredit/:id",upload.single('image',4),admin.updateDecor)
 router.put("/photoedit/:id",upload.single('image',5),admin.updatePhoto)
 router.put("/venuEdit/:id",upload.single('image',4),admin.updateVenue)
 router.put("/deletecat/:id",admin.Deletecat)
 router.get('/getall', admin.getAdmin)
 router.put("/deletevenue/:id",admin.Deletevenue)
 
 router.put("/deletedecor/:id",admin.Deletedecor)
  
 router.put("/deletephoto/:id",admin.Deletephoto)

 router.put('/blockuser/:id', admin.blockUser)



 module.exports=router;