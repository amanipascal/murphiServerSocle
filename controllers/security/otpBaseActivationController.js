const {otpBaseActivation} =require('../../services')
const otpBaseActivationController = async (req, res) => {
    const {otp, email } = req.body
    const result = await otpBaseActivation({otp, email });
    return res.status(result.status).json({message: result.message, data: result.data});
};
  

module.exports = otpBaseActivationController;