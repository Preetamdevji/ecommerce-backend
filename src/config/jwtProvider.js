const jwt = require("jsonwebtoken");
const SECRET_KEY = "fd5d1h5jj51j58uk8lkhg8kkuytr8rggj58g8g8g3f8g8t1ge69g65sregyji";

const generateToken = (userId)=>{
        let token = jwt.sign({userId},SECRET_KEY,{expiresIn:'48h'});
                return token;
};

const getUserIdFromToken = (token)=>{
        const decodedToken = jwt.verify(token,SECRET_KEY);
        // console.log(decodedToken);
        return decodedToken.userId;
};

module.exports = {generateToken,getUserIdFromToken};