

const { registerService } = require('../../services')

const regsiterController = async (req, res) => {
    const {email, name, password, phone_number, user_type} = req.body;
    const result = registerService({email, name, password, phone_number, user_type})
    return res.status((await result).status).json({message: (await result).message, data: (await result).data});
    
};
 
module.exports = regsiterController;