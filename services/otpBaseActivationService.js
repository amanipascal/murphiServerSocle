const { TmpUserModel,UserModel } = require('../models')


const otpBaseActivation = async (payload) =>{
   const { email, otp: incomingOtp } = payload;
    const user = await TmpUserModel.findOne({email});
    if (!user) {
        return { status: 401, message: "Votre code d'activation a expiré", data:null  }
    }
    if (user && user.otp !== incomingOtp) {
        return { status: 401, message: "Code otp est invalide", data: null }
    }
    try {
        const {__v, otp, createdAt, token, ...rest} = user.toJSON()
        const UserToCreate = new UserModel({...rest});
        UserToCreate.is_active = true;
        const newUser = await UserToCreate.save()
        return { status: 200, massage: "Votre compte est activé",  data: newUser }
        
    } catch (error) {
        return { status: 401, massage: error.message,  data: null }
    }

}  

module.exports = otpBaseActivation;


//   const validateUserSignUp = async (email, otp) => {
//     const user = await User.findOne({
//       email,
//     });
//     if (!user) {
//       return [false, 'User not found'];
//     }
//     if (user && user.otp !== otp) {
//       return [false, 'Invalid OTP'];
//     }
//     const updatedUser = await User.findByIdAndUpdate(user._id, {
//       $set: { active: true },
//     });
//     return [true, updatedUser];
//   };