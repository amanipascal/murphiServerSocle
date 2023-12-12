
const {UserModel, TokenModel} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const sendVerificationEmail = require('./mailService')
const smsService = require('./sms_Service')
const {genOtp, genToken } = require('../utils')

// password forgotten
const resetPwdRequestService = async (email) => {

    const userDoc = await UserModel.findOne({ email });

    if (!userDoc) {
        return {status: 400, message: 'Email inconnu.',  data:  null }
    }

    const tokenDoc = await TokenModel.findOne({ userId: userDoc._id });
    if (tokenDoc) await TokenModel.deleteOne();
    
    let emailOrSmsResult;
    if (userDoc.user_type == "WEB") {
        let resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));
        await new TokenModel({ userId: userDoc._id, token: hash, createdAt: Date.now(), }).save();
        const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${userDoc._id}`;
        const payload = {name: userDoc.name, link}
        emailOrSmsResult = await sendVerificationEmail(email, "Réinitialisation du mot de passe", payload,  "./template/requestResetPassword.handlebars" )
        return emailOrSmsResult;
    } else if (user.user_type == "MOBILE") {
        const otp = await genOtp()
        const otpHashed = await bcrypt.hash(otp, Number(process.env.BCRYPT_SALT));
        const newToken = await new TokenModel({ userId: userDoc._id, token: otpHashed, createdAt: Date.now(), }).save();
        const smsPayload = {userid: newToken.userId, phone_number: userDoc.phone_number, sms_msg: `Ceci est votre code otp d\'activation: ${otp} `}
        emailOrSmsResult = await smsService(smsPayload)
        return emailOrSmsResult;
    } 
    
  };

  module.exports = resetPwdRequestService
  