const {UserModel} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
// achangement de password qui fait etant deja connecté à l'application cliente
// le payload doit donc contenir l'ancien password, le nouveau password et eventuellement le token
const changePasswordService = async (payload) => {
  const secretKey = process.env.JWT_SECRET;
  const {oldPassword, newPassword, accessToken} = payload;

  // try {
    let decoded;
    try {
      decoded = jwt.verify(accessToken, secretKey);
      
    } catch (error) {
        return {status: 400, message: 'token invalide', data: null }
    } 
    
    const {userId} = decoded;
    const user = await UserModel.findById(userId);
    if (!user) {
      return { status: 401, message: "Compte utilisateur introuvable ", data:null }
    }
    //check if password matches
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) { 
        return { status: 401, message: "Ancien mot de pase invalide", data: null } 
    }

    try {
      user.password = await bcrypt.hash(newPassword, Number(process.env.BCRYPT_SALT));
      user.save()
      return {status: 200, message: 'Password modifié avec success !', data: null }
    } catch (error) {
      return {status: 500, message: `Server error : ${error.message}`, data: null }
    }
  

}

module.exports = changePasswordService