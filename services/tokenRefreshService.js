const jwt = require('jsonwebtoken')
const expiresIn = process.env.TOKEN_EXPIRES_IN;

const tokenRefreshService = async (refreshToken) => {
    const secretKey = process.env.JWT_SECRET;
    if (!refreshToken) {
      return {status: 401, message: 'Access refusé. pas de refresh fourni.', data: null }
    }
    try {
      const decoded = jwt.verify(refreshToken, secretKey);
      const accessToken = jwt.sign({userId: decoded.userId }, secretKey, { expiresIn });
      return {status: 200, message: "Token généré avec success.", data: accessToken}
    } catch (error) {
      return {status: 400, message: 'refresh token Invalide.',  data:  null }
    }
}

module.exports = tokenRefreshService
