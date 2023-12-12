const {TmpUserModel} = require('../models')
// const {hashedPwd} = require('../utils')

const sendVerificationEmail = require('./mailService')
const smsService = require('./sms_Service')
const {UserModel} = require('../models')

const registerService = async (userData) => {
    const {email} = userData;

    const existingUser = await UserModel.findOne({email})
    // console.log('existingUser : ', existingUser)
    if (existingUser) {
      return {
        status: 422, 
        message: `Ce compte est déjà existant et actif`,
        data:null
       } 
    }
  
    let tmpUser = await TmpUserModel.findOne({ email });
  
    if (tmpUser) {
      return {
        status: 422, 
        message: `Un processus de creation de compte est déjà en cours pour cet eMail ${email}. Veuillez patienter 10mn pour reprendre si nécéssaire. merci `,
        data: null
       }
    }
  
    try {
      const tmpUser = new TmpUserModel({ ...userData });
      const user = await tmpUser.save();
      const link = `${process.env.CLIENT_URL}/activation?token=${user.token}&id=${user._id}`;
      const payload = {name: user.name, otp: user.otp, link}
      let emailOrSmsResult;
      if (user.user_type == "WEB") {
          emailOrSmsResult = await sendVerificationEmail(user.email, "vérification et activation de compte", payload,  "./template/emailVerification.handlebars" )
      } else if (user.user_type == "MOBILE") {
          const smsPayload = {userid: user._id, phone_number: user.phone_number, sms_msg: `Ceci est votre code otp d\'activation: ${user.otp} `}
          emailOrSmsResult = await smsService(smsPayload)
      } 
      
      
      const {__v, is_active, is_verified, is_admin, otp, createdAt, token, password, ...rest} = user.toJSON()
      return { status: emailOrSmsResult.status, message: emailOrSmsResult.message, data: rest}
    
    } catch (error) {
      return {status: 422, message: error.message,  data:  null }
    }
  
  };

  module.exports = registerService