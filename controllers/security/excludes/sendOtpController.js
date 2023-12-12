const { serviceOTP } = require("../../../services/auth.service");

const sendOTP = async (req, res) => {
    const {email} = req.body;
    result = await serviceOTP(email);
    return res.status(result.status).json(result.data)
}

module.exports = sendOTP