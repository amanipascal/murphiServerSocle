const { signupService } = require("../../../services/auth.service");

const signUpController = async (req, res) => {

    const result = await signupService(req.body);
    //filtrer les champs à retourner au client
    const {_id, email, phone_number, user_type } = result.data
    return res.status(result.status).json({_id, email, phone_number, user_type });
  };


  module.exports = signUpController;