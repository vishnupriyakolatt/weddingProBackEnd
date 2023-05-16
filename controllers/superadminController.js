const Admin = require("../models/admin/AdminSchema");
const superadmin = require("../models/admin/superadmin");
const mailer = require("../config/otp");
upload = require("../utility/multer");
const Eventcat = require("../models/admin/Eventcategory");
const Venuecat = require("../models/admin/Venuecat");
const photographer = require("../models/admin/Photographer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({_id},'superadminSecretkey',{expiresIn:'3d'})
}
const demo = (req,res)=>{console.log('jajlafjkdls')}

const login = async (req, res) => {

  try {
    const { email, password } = req.body;
    console.log(req.body);

    const superwe = await superadmin.findOne({ email: req.body.email });

    console.log(superwe);

    if (!superwe || email !== "admin@gmail.com") {
      res.status(401).json({ error: "Invalid login details" });
    } else if (email === superwe.email && password === superwe.password) {
      const token = createToken(superwe._id);
      console.log("Token created: " + token);
      res.status(200).json({success:true, token, message: "Login successful" });
    } else {
      res.status(401).json({ error: "Incorrect login details" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const viewadmin = async (req, res) => {
  try {
    const viewdata = await Admin.find();
    console.log(viewdata);
    res.json({ data: viewdata});
  } catch (error) {}
};

const insertAdmin = async (req, res) => {
  try {
    let mailDetails = {
      from: "vishnupriyakolatt@gmail.com",
      to: req.body.email,
      subject: "weddingpro",
      html: `<p>Your password for accessing Wedding pro is${mailer.OTP}</p>`,
    };
    console.log(mailer.OTP);
    mailer.mailTransporter.sendMail(mailDetails, async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("here mailer otp" + mailer.OTP);
        const hashedPassword = await bcrypt.hash(mailer.OTP, 10);
        console.log("mailed otp is............" + hashedPassword);
        const newAdmin = new Admin({
          name: req.body.name,
          email: req.body.email,
          age: req.body.age,
          gender: req.body.gender,
          mobile: req.body.mobile,
          address: req.body.address,
          location: req.body.location,
          image: req.file.path,
          password: hashedPassword,
        });

        newAdmin.save().then((response) => {
          res
            .status(200)
            .json({ message: "Admin details added" });
        });
        console.log("otp mailed");
      }
    });
  } catch {
    console.log("error");
  }
};

const singleviewadmin = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const userindividual = await Admin.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    console.log("error");
  }
};
const updateadmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }
    res.json({ data: admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addVenue = async (req, res) => {
  console.log(req.file);
  const allvenue = await Venuecat.find();
  const verify = await Venuecat.findOne({
    name: { $regex: new RegExp(req.body.name, "i") },
  });
  if (!verify) {
   const newVenuecat = new Venuecat({
      name: req.body.name,
      image: req.file.path,
    });
    await newVenuecat.save();
    res.status(201).json({ message: "successfully added"});
  } else {
   res.status(201).json({verified:false,error: "category already exist" });
  }
};
const showVenue = async (req, res) => {
  try {
    const venue = await Venuecat.find();
    res.status(201).json({ data: venue });
  } catch (error) {
    console.log('error');
  }
}


const blockAdmin= async (req, res) => {
  
 
    const id=req.params.id
    console.log(id);
    const adminstatus=await Admin.findById({_id:id})
    if (adminstatus.isblocked===false){
    const isBlocked=await Admin.findByIdAndUpdate(id,{$set: {isblocked:true}})
    console.log(isBlocked.isblocked);
    res.json({success:true})
    }else{
      const isBlocked = await Admin.findByIdAndUpdate(id,{$set:{isblocked:false}})
      console.log(isBlocked.isblocked);
      res.json({success:true})
    }
  
  }
  const Deletecat = async (req, res) => {
    const id = req.params.id;
    try {
      await Venuecat.findByIdAndDelete(id);
      res.status(200).json({ message: "Venue category deleted successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json();
    }
  };
  

  
 



module.exports = {demo,
login,
  insertAdmin,
  viewadmin,
  singleviewadmin,
  updateadmin,
  showVenue,
  addVenue,
  blockAdmin,Deletecat
};
