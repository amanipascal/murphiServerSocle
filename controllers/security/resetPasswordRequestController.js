const { resetPwdRequestService } = require("../../services");

const resetPasswordRequestController = async (req, res) => {
    const {email} = req.body
    const result = await resetPwdRequestService(email);
    return res.status(result.status).json({message: result.message, data: result.data});
  };


  module.exports = resetPasswordRequestController;