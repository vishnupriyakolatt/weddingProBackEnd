const express=require("express");
const router=express.Router()
const upload=require('../utility/multer')
const superadminController=require("../controllers/superadminController")
  // const superAuth=require('../middleware/superAuth')

router.post("/superlogin",superadminController.login)


  // router.use(superAuth)
 router.get('/viewadmin', superadminController.viewadmin)
 router.post("/addadmin",upload.single('image'),superadminController.insertAdmin)
 router.get("/viewadminsingle/:id",superadminController.singleviewadmin)
router.put("/adminedit/:id",upload.single('image'),superadminController.updateadmin)

router.put('/blockadmin/:id', superadminController.blockAdmin)
router.get('/getall', superadminController.getAdmin)
router.get("/showVenue-type",upload.single('image'),superadminController.showVenue)
router.post("/addVenuecat",upload.single('image'),superadminController.addVenue)


router.put("/deletecat/:id",superadminController.Deletecat)

 
module.exports=router;