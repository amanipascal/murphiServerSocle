
const {UserModel, TokenModel} = require("../models");
const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken')
// const crypto = require("crypto");
const sendVerificationEmail = require('./mailService')
const smsService = require('./sms_Service')
// const {genOtp, genToken } = require('../utils')

const resetPasswordService = async (body) => {

    const {userId, token, password} = body;

    const existingUser = await UserModel.findOne({ _id: userId });
  
    if (!existingUser) {
      return {status: 400, message: 'Email inconnu',  data:  null }
    } 
    let passwordResetToken = await TokenModel.findOne({ userId: existingUser._id });

    if (!passwordResetToken) {
      return {status: 401, message: 'Token ou OTP expiré',  data:  null }
    }

    let emailOrSmsResult;
    if (existingUser.user_type == "WEB") {
        const isValid = await bcrypt.compare(token, passwordResetToken.token);
        if (!isValid) {
          return {status: 401, message: 'token invalid ou expiré',  data:  null }
        }
        // const hash = await bcrypt.hash(password, Number(bcryptSalt)); // plus besoin car le pwd sera bcrypter par le UserModel
        const updatedUser = await UserModel.findOneAndUpdate({_id: userId}, {password})
        const payload = {name: updatedUser.name}
        emailOrSmsResult = await sendVerificationEmail(updatedUser.email, "Password Reset Successfully", payload,  "./template/resetPassword.handlebars" )
        return emailOrSmsResult;
    } else if (existingUser.user_type == "MOBILE") {
      const isValid = await bcrypt.compare(token, passwordResetToken.token);
      if (!isValid) {
        return {status: 401, message: "OTP invalid ou expiré",  data:  null }
      }

      const smsPayload = {userid: existingUser._id, phone_number: existingUser.phone_number, sms_msg: `Votre mot de passe a été re-initialisé avec success. `}
      emailOrSmsResult = await smsService(smsPayload)
      return emailOrSmsResult;

    }
  
  };

  module.exports = resetPasswordService;
  
  