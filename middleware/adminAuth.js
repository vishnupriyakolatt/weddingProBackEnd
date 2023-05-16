const jwt=require('jsonwebtoken')
const Admin=require('../models/admin/AdminSchema')


const adminAuth=async(req,res,next)=>{


    //verify authentication
   const{authorization} =req.headers
   
console.log(authorization)
   if(!authorization){
    return res.status(401).json({error:"Authorization token required"})
   }
const token=authorization
   console.log(token);
try {
   const {_id} =jwt.verify(token,'adminsecretkey')
   req.admin = await Admin.findOne({_id}).select('_id')

   next()
} catch (error) {
    console.log(error)
    res.status(401).json({error:'Request is not authorized'})
}



}
module.exports=adminAuth