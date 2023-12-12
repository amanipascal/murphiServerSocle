const { resetPasswordService} = require("../../services");

const resetPasswordController = async (req, res) => {
  
    const result = await resetPasswordService(req.body);
    return res.status(result.status).json({message: result.message, data: result.data});
  };

  module.exports = resetPasswordController
  