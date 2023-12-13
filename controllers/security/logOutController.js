const jwt = require('jsonwebtoken')

const logout = async (req, res) => {
    const SECRET = 'qqefkuhio3k2rjkofn2mbikbkwjhnkk'
    const accessToken = jwt.sign({userId: req.user}, SECRET, {expiresIn: 1});
    const refreshToken = jwt.sign({userId: req.user}, SECRET, {expiresIn: 1});
    return res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' }).header('Authorization', "")
        .json({message: 'vous êtes déconnectés', data: {accessToken, refreshToken} });

}

module.exports = logout