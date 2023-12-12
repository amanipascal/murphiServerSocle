const jwt = require('jsonwebtoken')

const logout = async (req, res) => {
    const authHeader = req.headers["authorization"];
    console.log('authHeader : ', authHeader)
    // const refreshToken = req.cookies['refreshToken'];
    const fakeToken =  '';  // jwt.sign(authHeader, 'secret', { expiresIn: 1 });
    try {
        const result = res.cookies('refreshToken', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: 'strict'
        });
        
        return result.header('Authorization', fakeToken).json({
            message: "Vous êtes déconnectés"
        });

    } catch (error) {
        return res.status(500).json({
            message :" erreur serveur"
        })
    }

}

module.exports = logout