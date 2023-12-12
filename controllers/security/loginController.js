const { loginService } = require("../../services");
const { validationResult } = require('express-validator')

const loginController = async (req, res) => {

    const errors = validationResult(req)
  
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
  
    const result = await loginService(req.body);
  
    if (result.data) {
        const {accessToken, refreshToken} = result.data;
        return res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' }).header('Authorization', accessToken)
        .json({message: result.message, data: result.data});
    }
    return res.status(result.status).json({message: result.message})
  };

  module.exports = loginController