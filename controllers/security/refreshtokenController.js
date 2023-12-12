const { tokenRefreshService } = require("../../services");

const refreshtoken = async (req, res) => {
    const refreshToken = req.cookies['refreshToken'];
    const result = await tokenRefreshService(refreshToken) 
    return res.status(result.status).header('Authorization', result.data).send({accessToken: result.data})
}

module.exports = refreshtoken;