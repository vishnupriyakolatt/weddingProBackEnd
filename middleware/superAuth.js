const jwt=require('jsonwebtoken')
const superadmin=require('../models/admin/superadmin')


const superAuth=async(req,res,next)=>{


    //verify authentication
   const{authorization} =req.headers
   
console.log(authorization)
   if(!authorization){
    return res.status(401).json({error:"Authorization token required"})
   }
const token=authorization
   console.log(token);
try {
   const {_id} =jwt.verify(token,'superadminSecretkey')
   req.superadmin = await superadmin.findOne({_id})

   next()
} catch (error) {
    console.log(error)
    res.status(401).json({error:'Request is not authorized'})
}



}
module.exports=superAuth