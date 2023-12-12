// const JWT = require("jsonwebtoken");
// const Token = require("../models/Token.model");
// const sendEmail = require("../utils/email/sendEmail");
// const crypto = require("crypto");
// const User = require("../models/User.model");
// const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken')
// //otp
// const otpGenerator = require('otp-generator');
// const OTP = require('../models/exclude/otp.model')

// const expiresIn = process.env.TOKEN_EXPIRES_IN;
// const bcryptSalt = process.env.BCRYPT_SALT;
// const clientURL = process.env.CLIENT_URL;


// const signupService = async (userData) => {

//   const {password, email} = userData

//   let user = await User.findOne({ email });

//   if (user) {
//     return {status: 422, data: {error: "Email already exist"} }
//   }

//   try {
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user = new User({ ...userData, password: hashedPassword });
//     const data = await user.save();
//     return { status: 201, data}
  
//   } catch (error) {
//     return {status: 422, data: {error: error.message} }
//   }

// };


// const login = async (credentials) => {
//   const SECRET = process.env.JWT_SECRET;

//   const {email, password} = credentials;
//   try {
//        // check if the user already exists
//      const user = await User.findOne({email})
//      if(!user) {
//       return {
//         status: 401,
//         data: {error: "Invalid credentials, unknown user"}
//        }
//      }
//      //check if password matches
//      const isPasswordValid = await bcrypt.compare(password, user.password);
//      if (!isPasswordValid) {
//          return {
//           status: 401,
//           data: {error: "Invalid credentials, password invalid "}
//          }
//      }
//      //generate access token
//      const accessToken = jwt.sign({userId: user._id}, SECRET, {expiresIn});
//      //generate access token
//      const refreshToken = jwt.sign({userId: user._id}, SECRET, {expiresIn: '7d'});
//      return {
//       status: 200,
//       data: {accessToken, refreshToken}
//      }
      
//   } catch (error) {
//     return {
//       status: 500,
//       data: {error: 'Server error'}
//      }
//   }

// }

// // achangement de password qui fait etant deja connecté à l'application cliente
// // le payload doit donc contenir l'ancien password, le nouveau password et eventuellement le token
// const changePassword = async (payload) => {
//   const secretKey = process.env.JWT_SECRET;
//   const {oldPassword, newPassword, accessToken} = payload;
//   try {
//     const decoded = jwt.verify(accessToken, secretKey);
//     const {userId} = decoded;
//     const user = await User.findById(userId);
//     if (!user) {
//       return { status: 401, data: {error: "User not found "} }
//     }
//     //check if password matches
//     const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
//     if (!isPasswordValid) { return { status: 401, data: {error: "Old password invalid "} } }
//     const salt = bcrypt.genSalt(process.env.BCRYPT_SALT);
//     user.password = bcrypt.hash(newPassword, salt);
//     user.save()
//     return {status: 200, data: {message: 'Password modifié avec success !'} }
//   } catch (error) {
//     return {status: 400, data: {error: 'Invalid token.'} }
//   }
  

// }


// const tokenRefresh = async (refreshToken) => {
//     const secretKey = process.env.JWT_SECRET;
//     if (!refreshToken) {
//       return {status: 401, data: {error: 'Access Denied. No refresh token provided.'} }
//     }
//     try {
//       const decoded = jwt.verify(refreshToken, secretKey);
//       const accessToken = jwt.sign({userId: decoded.userId }, secretKey, { expiresIn });
//       return {status: 200, data: accessToken}
//     } catch (error) {
//       return {status: 400, data: {error: 'Invalid refresh token.'} }
//     }
// }




// const requestPasswordReset = async (email) => {

//   const user = await User.findOne({ email });

//   if (!user) throw new Error("Email does not exist");

//   let token = await Token.findOne({ userId: user._id });

//   if (token) await token.deleteOne();

//   let resetToken = crypto.randomBytes(32).toString("hex");
//   const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

//   await new Token({
//     userId: user._id,
//     token: hash,
//     createdAt: Date.now(),
//   }).save();

//   const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;

//   sendEmail(
//     user.email,
//     "Password Reset Request",
//     {
//       name: user.name,
//       link: link,
//     },
//     "./template/requestResetPassword.handlebars"
//   );
//   console.log("resetToken :" , resetToken)
//   return { link, resetToken };
// };
//-------------------------------------------------------------------------------------------------


// const resetPassword = async (body) => {

//   const {userId, token, password} = body;

//   let passwordResetToken = await Token.findOne({ userId });

//   if (!passwordResetToken) {
//     throw new Error("Invalid or expired password reset token");
//   }


//   const isValid = await bcrypt.compare(token, passwordResetToken.token);

//   if (!isValid) {
//     throw new Error("Invalid or expired password reset token");
//   }

//   const hash = await bcrypt.hash(password, Number(bcryptSalt));

//   await User.updateOne(
//     { _id: userId },
//     { $set: { password: hash } },
//     { new: true }
//   );

//   const user = await User.findById({ _id: userId });

//   sendEmail(
//     user.email,
//     "Password Reset Successfully",
//     {
//       name: user.name,
//     },
//     "./template/resetPassword.handlebars"
//   );

//   await passwordResetToken.deleteOne();

//   return { message: "Password reset was successful" };
// };


// const serviceOTP = async (email) => {
//    // Check if user is already present
//   // const checkUserPresent = await User.findOne({ email });
//   // // If user found with provided email
//   // if (!checkUserPresent) {
//   //   return {status: 400, data: {message: 'l\'utilisateur concerné concerné n\'existe pas'}  }
//   // }

//   let otp = otpGenerator.generate(6, {upperCaseAlphabets: false,  lowerCaseAlphabets: false,  specialChars: false, });
//   // extraire la liste eventuelle d'OTPs qui pourraient en meme temps pour un meme utilisateur client
//   const otpList = (await OTP.find({email, otp})).map(item => item.otp)
//   if (otpList.indexOf(otp) !== -1) {
//     otp = otpGenerator.generate(6, { upperCaseAlphabets: false, });
//   } 

//   const otpPayload = { email, otp };
//   const otpBody = await OTP.create(otpPayload);
//   return {status: 200, data: {success: true, message: '"Otp is successfully sent to the user, thinks !!"', otp }  }

// }




// module.exports = {
//   signupService,
//   login,
//   requestPasswordReset,
//   resetPassword,
//   tokenRefresh,
//   changePassword,
//   serviceOTP
// };
