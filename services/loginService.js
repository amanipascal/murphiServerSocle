const {UserModel} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const expiresIn = process.env.TOKEN_EXPIRES_IN;

const loginService = async (credentials) => {
    const SECRET = process.env.JWT_SECRET;
  
    const {email, password} = credentials;

    try {
         // check if the user already exists
       const user = await UserModel.findOne({email})
      //  console.log('user : ', user)
       if(!user) {
        return {status: 401,  message: "Invalid credentials, unknown user",  data: null   }
       }
       //check if password matches
       const isPasswordValid = await bcrypt.compare(password, user.password);
      //  console.log('isPasswordValid : ', isPasswordValid)
       if (!isPasswordValid) {
           return { status: 401, message: "Invalid credentials, password invalid ",  data:null }
       }
       //generate access token
       const accessToken = jwt.sign({userId: user._id}, SECRET, {expiresIn});
       //generate access token
       const refreshToken = jwt.sign({userId: user._id}, SECRET, {expiresIn: '7d'});

       return {status: 200,  message: 'vous êtes connectés', data: {accessToken, refreshToken}  }
        
    } catch (error) {
        return { status:500, message: 'Server error', data: null }
    }
  
  }
  
  module.exports = loginService