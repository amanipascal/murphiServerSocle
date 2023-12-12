const {UserModel} =require('../../models')

const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user)
        console.log(user);
        if(!user){
            return res.status(404).json({message: 'Utilisateur inconnu'});
        }
        const {__v, is_active, is_verified, is_admin, createdAt, updatedAt, password, ...rest} = user.toJSON()
        res.status(200).json(rest);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = getMe;