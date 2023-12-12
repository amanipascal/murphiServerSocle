const mongoose = require('mongoose');
const sendVerificationEmail = require('../../services/mailService')
const User = require('../User.model')

const otpSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    user_type: {
        type: String, 
        enum: ['WEB', 'MOBILE']
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
  });

  otpSchema.pre("save", async function (next) {
    console.log("New document saved to the database");
    // Only send an email when a new document is created
    if (this.isNew) {
      const user = await User.findOne({email:this.email})  
      await sendVerificationEmail(this.email, user.name, this.otp);
    }
    next();
  });

  module.exports = mongoose.model("OTP", otpSchema);