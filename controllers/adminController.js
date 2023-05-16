const express = require("express");
const upload = require("../utility/multer");
const Admin = require("../models/admin/AdminSchema");
const Eventcat = require("../models/admin/Eventcategory");
const Venuecat = require("../models/admin/Venuecat");
const user = require("../models/userModels/userDetail");
const photographer = require("../models/admin/Photographer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Venue = require("../models/admin/Venue");
const Decor = require("../models/admin/Decoration");
const sharp = require("sharp");
const createToken = (_id) => {
  return jwt.sign({ _id }, "adminsecretkey", { expiresIn: "3d" });
};
const login = async (req, res) => {
  console.log("helloooooooo");
  try {
    const { email, password } = req.body;
    
    const adminExist = await Admin.findOne({ email: email });
    console.log("adminExist", adminExist);
    
    if (adminExist) {
      console.log(email);
      console.log(password);
      const passwordMatch = await bcrypt.compare(password, adminExist.password);
      console.log("passwordMatch", passwordMatch);

      if (email === adminExist.email && passwordMatch === true) {
        const token = createToken(adminExist._id);
  
        console.log("token", token);
  
        res.status(200).json({
         
          token,create:true
         
        });
        console.log("login successfully");
      } else {
        res.status(401).json({ error: "Incorrect login details" });
      }
    } else {
      console.log("Admin not found");
      res.status(401).json({ error: "Incorrect login details" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const Venuecategory = async (req, res) => {
  try {
    const venue = await Venuecat.find();
    res.status(201).json({ data: venue });
  } catch (error) {}
};
const addVenue = async (req, res) => {
  console.log(req.file);
  const allvenue = await Venuecat.find();
  const verify = await Venuecat.findOne({
    name: { $regex: new RegExp(req.body.name, "i") },
  });
  if (verify) {
    res.status(201).json({ err: "category already exist" });
  } else {
    const newVenuecat = new Venuecat({
      name: req.body.name,
      image: req.file.path,
    });
    await newVenuecat.save();
    res.status(201).json({ message: "successfully added", verified: true });
  }
};

const customerview = async (req, res) => {
  try {
    const alluser = await user.find();
    res.status(201).json({ data: alluser });
  } catch (error) {
    res.status(404).json({ message: "error occured" });
  }
};
const viewphotographer = async (req, res) => {
  try {
    const allphotographer = await photographer.find();
    res.status(200).json({ data: allphotographer, verified: true });
  } catch (error) {
    res.status(401).json({ err: "nothing to display" });
  }
};

const photographerAdd = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    const imgArray = [];
    const multiImg = req.files;
    multiImg.map((el) => {
      const em = el.path;
      imgArray.push(em);
    });
    let photo = new photographer({
      pname: req.body.pname,
      pdesc: req.body.pdesc,
      pemail: req.body.pemail,
      pmobile: req.body.pmobile,
      paddress: req.body.paddress,
      pexperiance: req.body.pexperiance,
      rate: req.body.rate,
      image: imgArray,
    });

    await photo.save();
    res.status(201).json({ message: "successfully added" });
  } catch (error) {
    console.log(error.message);
  }
};

const VenuesideAdd = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    const imgArray = [];
    const multiImg = req.files;
    multiImg.map((el) => {
      const em = el.path;
      imgArray.push(em);
    });

    let Venuecollect = new Venue({
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      email: req.body.email,
      manager: req.body.manager,
      mobile: req.body.mobile,
      address: req.body.address,
      seats: req.body.seats,
      location: req.body.location,
      rent: req.body.rent,
      image: imgArray,
    });

    await Venuecollect.save();
    res.status(201).json({ message: "successfully added" });
  } catch (error) {
    console.log(error.message);
  }
};
const venuecollectview = async (req, res) => {
  try {
    const allvenue = await Venue.find();
    res.status(200).json({ data: allvenue, verified: true });
  } catch (error) {
    res.status(401).json({ err: "nothing to display" });
  }
};

const Decorview = async (req, res) => {
  try {
    const allDecor = await Decor.find();
    res.status(200).json({ data: allDecor, verified: true });
  } catch (error) {
    res.status(401).json({ err: "nothing to display" });
  }
};

const Decoradd = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    const imgArray = [];
    const multiImg = req.files;
    multiImg.map((el) => {
      const em = el.path;
      imgArray.push(em);
    });
    let decorTeam = new Decor({
      name: req.body.name,
      email: req.body.email,
      manager: req.body.manager,
      mobile: req.body.mobile,
      type: req.body.type,
      desc: req.body.desc,
      rent: req.body.rent,
      image: imgArray,
    });

    await decorTeam.save();
    res.status(201).json({ message: "successfully added" });
  } catch (error) {
    console.log(error.message);
  }
};
const singlePhotographer = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const photosingle = await photographer.findById({ _id: id });
    console.log(photosingle);
    res.status(201).json(photosingle);
  } catch (error) {
    console.log("Error occurred in single view of photographer", error);
  }
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

const updateDecor = async (req, res) => {
  try {
    const Decornew = await Decor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Decornew) {
      return res.status(404).json({ message: "Decor not found" });
    }
    res.json({ data: Decornew, verified: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updatePhoto = async (req, res) => {
  try {
    const Photonew = await photographer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!Photonew) {
      return res.status(404).json({ message: "Photographer not found" });
    }
    res.json({ data: Photonew, verified: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateVenue = async (req, res) => {
  try {
    const Venuenew = await Venue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Venuenew) {
      return res.status(404).json({ message: "venue not found" });
    }
    res.json({ data: Venuenew, verified: true });
  } catch (error) {
    console.log("errror");
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  addVenue,
  Venuecategory,
  customerview,
  viewphotographer,
  photographerAdd,
  VenuesideAdd,
  venuecollectview,
  Decorview,
  Decoradd,
  singlePhotographer,
  singleDecor,
  singleVenue,
  updateDecor,
  updatePhoto,
  updateVenue,
};
