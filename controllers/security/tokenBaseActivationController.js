const {tokenBaseActivation} = require('../../services')
const tokenBaseActivationController = async (req, res) => {
    const {token, userId } = req.body
    const result = await tokenBaseActivation({token, userId });
    return res.status(result.status).json({message: result.message, data: result.data});
};
  

module.exports = tokenBaseActivationController;