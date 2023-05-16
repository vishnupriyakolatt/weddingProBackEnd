const twilio = require("twilio");
const dotenv = require("dotenv");
require("dotenv").config();

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_SERVICE_ID = process.env.TWILIO_SERVICE_ID;
// const client = require('twilio')(accountSid, authToken);

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
exports.sendVerificationToken = (phoneNumber) => {
  return new Promise((resolve) => {
    client.verify.v2
      .services(TWILIO_SERVICE_ID)
      .verifications.create({
        to: `+91${phoneNumber}`,
        channel: "sms",
      })
      .then((data) => {
        console.log(data);
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      });
  });
};

exports.checkVerificationToken = (otp, phoneNumber) => {
  console.log(otp , phoneNumber)
  return new Promise((resolve) => {

client.verify.v2.services(TWILIO_SERVICE_ID)
.verificationChecks
.create({to:`+91${phoneNumber}`, code:otp})
  
  .then((verification_check) =>{
  console.log(verification_check.status)
 
   if (verification_check.status) {
          resolve(true);
        } else {
          resolve(false);  
        }
}
)
    
      .catch((error) => {
        console.log(error+"this is the error"); 
        resolve(false);
      });
  });
};