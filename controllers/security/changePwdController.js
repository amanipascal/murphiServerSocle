const { changePasswordService } = require("../../services");

const changePwdController = async (req, res) => {
    const accessToken = req.headers['authorization'];
    const {oldPassword, newPassword} = req.body;
    if (!oldPassword) {  return res.status(400).json({error: 'Invalid old password.'}) }
    if (!newPassword) {  return res.status(400).json({error: 'Invalid new password.'}) }
    if (!accessToken) { return res.status(400).json({error: 'token is not defined'})  }
    const result = await changePasswordService({oldPassword, newPassword, accessToken});
    return res.status(result.status).json({message: result.message, data: result.data})
  }
  
  module.exports = changePwdController