const User = require("../models/userModels/userDetail");
const mongoose = require("mongoose");
const twilio = require("../utility/twilio");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const photograph = require("../models/admin/Photographer");
const Venue = require("../models/admin/Venue");
const Decor = require("../models/admin/Decoration");
const Booking = require("../models/admin/EventBook");
const DecorBooking = require("../models/userModels/DecorBook");
const PhotoBooking = require("../models/userModels/PhotoBook");
const VenueBooking = require("../models/userModels/userVenueBook");
const mailer = require("../config/otp");
const createToken = (_id) => {
  return jwt.sign({ _id }, "usersecretkey", { expiresIn: "3d" });
};

const postsignup = async (req, res) => {
  console.log("something is here");
  try {
    const userDetail = req.body;
    const phonenumber = req.body.mobile;
    const userExist = await User.findOne({ mobile: userDetail.mobile });

    if (userExist) {
      res
        .status(200)
        .json({
          message: "Already registered using this mobile number",
          state: false,
        });
    } else {
      twilio.sendVerificationToken(phonenumber);
      res.status(200).json({ message: "OTP send" });
    }
  } catch (error) {
    console.log("error");
  }
};

const otpverify = async (req, res) => {
  try {
    const otp = req.body.OTP;
    const data = req.body.data;
    const phonenumber = data.mobile;
    const Hashpassword = await bcrypt.hash(data.password, 10);
    const userExist = await User.findOne({ mobile: data.mobile });
    if (userExist) {
      res
        .status(201)
        .json({
          message: "Already registered using this mobile number",
          state: false,
        });
    } else {
      const twiliostatus = await twilio.checkVerificationToken(
        otp,
        phonenumber
      );
      if (twiliostatus) {
        const newUser = new User({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          password: Hashpassword,
        });
        await newUser.save();
        res.status(201).json();
      } else {
        res.status(200).json({ message: "OTP is invalid" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    console.log(data.password);
    console.log(data.email);

    const userExist = await User.findOne({ email: data.email });
    console.log("here the details" + userExist);

    if (userExist) {
      id = userExist._id;
      console.log("hashed password", userExist.password);

      const checkpassword = await bcrypt.compare(
        data.password,
        userExist.password
      );

      console.log("passwords match?", checkpassword);

      if (data.email == userExist.email && checkpassword == true) {
        const token = createToken(userExist._id);

        console.log("token", token);

        res.status(200).json({
          token,
        });

        console.log("login successfully");
      } else {
        res.status(401).json({ error: "Incorrect login details" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const photodisplay = async (req, res) => {
  try {
    const photo = await photograph.find({});
    console.log(photo);
    res.status(201).json({ data: photo });
  } catch (error) {}
};
const venuedisplay = async (req, res) => {
  try {
    const Venuecollect = await Venue.find({});
    console.log(Venuecollect);
    res.status(201).json({ data: Venuecollect });
  } catch (error) {}
};

const Decordisplay = async (req, res) => {
  try {
    const Decoration = await Decor.find({});
    console.log(Decoration);
    res.status(201).json({ data: Decoration });
  } catch (error) {}
};

const singleDecor = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const decorsingle = await Decor.findById({ _id: id });
    console.log(decorsingle);
    res.status(201).json(decorsingle);
  } catch (error) {
    console.log("Error occurred in single view of Decor", error);
  }
};
const singlePhoto = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const photosingle = await photograph.findById({ _id: id });
    console.log(photosingle);
    res.status(201).json(photosingle);
  } catch (error) {
    console.log("Error occurred in single view of photographer", error);
  }
};
const singleVenue = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const venuesingle = await Venue.findById({ _id: id });
    console.log(venuesingle);
    res.status(201).json(venuesingle);
  } catch (error) {
    console.log("Error occurred in single view of venue", error);
  }
};







const checkDecor = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    const { authorization } = req.headers;
    const token = authorization;

    const { _id } = jwt.verify(token, "usersecretkey");

    const newStartDate = new Date(date);
    const startDate = newStartDate.toISOString().split("T")[0];

    const decorExist = await DecorBooking.findOne({ DecorId: id, Date: startDate });

    const isExist = Boolean(decorExist);

    res.status(200).json({
      success: true,
      isExist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "An error occurred",
    });
  }
};

const DecorBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { selectedDate } = req.body;

    const newStartDate = new Date(selectedDate);
    const startDate = newStartDate.toISOString().split("T")[0];

    const { authorization } = req.headers;
    const token = authorization;

    const { _id } = jwt.verify(token, "usersecretkey");

    const decorExist = await DecorBooking.findOne({ DecorId: id, Date: startDate });

    if (decorExist) {
      res.status(200).json({ success: false, message: "Already booked" });
    } else {
      const Bookingdecor = new DecorBooking({
        userId: _id,
        DecorId: id,
        Date: startDate,
      });
      await Bookingdecor.save();

      res.status(200).json({ success: true, message: "Payment done successfully" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "An error occurred",
    });
  }
};


//...........................................................................


const checkDate = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("in the check date function" );
    const date = req.body.date;

    const { authorization } = req.headers;
    const token = authorization;

    const { _id } = jwt.verify(token, "usersecretkey");

console.log(date)
const newStartDate = new Date(date)
      const startDate = newStartDate.toISOString().split('T')[0]
      console.log(startDate)   
       const photographerExist = await PhotoBooking.findOne({$and:[{PhotoId:id},{Date:startDate}]})
    console.log(photographerExist);
    
const isExist =  Boolean(photographerExist) 
    // console.log(isExist);

       
      res
        .status(200)
        .json({
          isExist
          
        });
    
  } catch (error) {}

};

const PhotoBook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id is here" + id);
    const date = req.body.selectedDate;
    console.log(date);

    const newStartDate = new Date(date)
    const startDate = newStartDate.toISOString().split('T')[0]
    console.log(startDate)
    const { authorization } = req.headers;
    const token = authorization;

    const { _id } = jwt.verify(token, "usersecretkey");

    console.log(_id);

    const photographerExist = await PhotoBooking.findOne(
      {$and:[{PhotoId:id},{Date:startDate}]}
    );
    console.log(photographerExist);

  if(photographerExist){
    res
    .status(200)
    .json({ message: "already booked", action: true });
  }else{
        const Bookingphoto = new PhotoBooking({
        userId: _id,
        PhotoId: id,
        Date: startDate,
      });
      await Bookingphoto.save();

    
    res
      .status(200)
      .json({ message: "Payment done successfully", action: true });}
  } catch (error) {}
};


//...........................................................................


const checkVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    const { authorization } = req.headers;
    const token = authorization;

    const { _id } = jwt.verify(token, "usersecretkey");

    const newStartDate = new Date(date);
    const startDate = newStartDate.toISOString().split("T")[0];

    const decorExist = await VenueBooking.findOne({ VenueId: id, Date: startDate });

    const isExist = Boolean(decorExist);

    res.status(200).json({
      success: true,
      isExist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "An error occurred",
    });
  }
};

const VenueBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { selectedDate } = req.body;

    const newStartDate = new Date(selectedDate);
    const startDate = newStartDate.toISOString().split("T")[0];

    const { authorization } = req.headers;
    const token = authorization;

    const { _id } = jwt.verify(token, "usersecretkey");

    const venueExist = await VenueBooking.findOne({ VenueId: id, Date: startDate });

    if (venueExist) {
      res.status(200).json({ success: false, message: "Already booked" });
    } else {
      const bookingVenue = new VenueBooking({
        userId: _id,
        VenueId: id,
        Date: startDate,
      });
      await bookingVenue.save();

      res.status(200).json({ success: true, message: "Payment done successfully" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "An error occurred",
    });
  }
};


const Order = async (req, res) => {
  try {
    console.log("ghhgfujiokpl[");
    const { authorization } = req.headers;
    const token = authorization;

    const { _id } = jwt.verify(token, "usersecretkey");

    console.log(_id);
    const photo = await PhotoBooking.find({ userId: _id }).populate("PhotoId").sort({Date:-1})
  
    console.log(photo);
    const venue = await VenueBooking.find({ userId: _id }).populate("VenueId").sort({Date:-1})
    console.log(venue);
    const decor = await DecorBooking.find({ userId: _id }).populate("DecorId").sort({Date:-1})
    console.log(decor);

    res.status(201).json({ photo, venue, decor });
  } catch (error) {}
};

const itemCancel=async(req,res)=>{
  const id=req.params.id;
  const { bookItem } = req.body;
  try {

    const { authorization } = req.headers;
    const token = authorization;

    const { _id } = jwt.verify(token, "usersecretkey");

    console.log(_id);
    const user=await User.findById({_id})
    console.log(user)
    let email=user.email
    let mailDetails = {
      from: "vishnupriyakolatt@gmail.com",
      to: email,
      subject: "weddingpro",
      html: `<p>Your ${bookItem} Has been cancelled.For Return your payment please contact to this number : 9084876544</p>`,
    };
    
   

    if(bookItem=='photographer'){
    await PhotoBooking.findByIdAndDelete(id);
    mailer.mailTransporter.sendMail(mailDetails, async (err, data) => {
      if (err) {
        console.log(err);
      }else{
        res.status(200).json({message:"Your photographer order cancelled"})

      }} );
    }
    if(bookItem=='venue'){
    await VenueBooking.findByIdAndDelete(id);
    mailer.mailTransporter.sendMail(mailDetails, async (err, data) => {
      if (err) {
        console.log(err);
      }else{
        res.status(200).json({message:"Your venue order cancelled"})

      }} );
    }
    if(bookItem=='decor'){
    await DecorBooking.findByIdAndDelete(id);
    mailer.mailTransporter.sendMail(mailDetails, async (err, data) => {
      if (err) {
        console.log(err);
      }else{
        res.status(200).json({message:"Your decor order cancelled"})

      }} );
    }
  } catch (error) {
    console.log(error)
  }
}





module.exports = {
  postsignup,checkDecor,itemCancel,
  otpverify,
  login,
  photodisplay,
  venuedisplay,
  Decordisplay,
  singleDecor,
  singlePhoto,
  singleVenue,
  DecorBook,
  PhotoBook,
  checkDate,
  VenueBook,checkVenue,
  Order,
};
