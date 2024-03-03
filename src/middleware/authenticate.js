const jwtProvider = require('../config/jwtProvider');
const userService = require('../services/user_services')

const authenticate = async(req,resp,next)=>{
    // ['Bearer', 'token']
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return resp.status(404).send({error:"token not found..."});
        }

        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await userService.findUserById(userId);
        req.user =user
    } catch (error) {
        return resp.status(500).send({error: error.message});
    }
    next();
}

module.exports = authenticate