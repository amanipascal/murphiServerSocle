const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET;
const expiresIn = process.env.TOKEN_EXPIRES_IN;

const authenticate = (req, res, next) => {
    const accessToken = req.headers['authorization'];
    const refreshToken = req.cookies['refreshToken'];

    if (!accessToken && !refreshToken) {
      return res.status(401).send('Access Denied. No token provided.');
    }
  
    try {
      const decoded = jwt.verify(accessToken, secretKey);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      if (!refreshToken) {
        return res.status(401).send('Access Denied. No refresh token provided.');
      }
  
      try {
        const decoded = jwt.verify(refreshToken, secretKey);
        // console.log('decoded refresh : ', decoded)
        const accessToken = jwt.sign({ user: decoded.userId }, secretKey, { expiresIn });
        // console.log('accessToken refresh : ', accessToken)
        return res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
          .header('Authorization', accessToken).json({userid: decoded.userId, accessToken, refreshToken});
      } catch (error) {
        return res.status(400).json({error: 'Invalid Token'});
      }
    }
  };

  module.exports = authenticate