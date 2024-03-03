const userService = require("../services/user_services.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart_services.js");

const register = async (req, resp) => {
  try {
    const user = await userService.creatUser(req.body);
    // console.log(user);
    const jwtToken  = jwtProvider.generateToken(user._id);
    // console.log(jwtToken);
    await cartService.createCart(user);
    console.log(user);
    return resp.status(200).send({ jwtToken, message: "Register Successful" });
  } catch (error) {
    return resp.status(500).send({ error: error.message });
  }
};

const login = async (req, resp) => {
  const { password, email } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return resp
        .status(404)
        .send({ message: "User are not found with this email : ", email });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return resp.status(401).send({ message: "Invalid Password..." });
    }
    
    const jwtToken = jwtProvider.generateToken(user._id);
    return resp.status(200).send({ jwtToken,message: "Login Successful" });
  } catch (error) {
    return resp.status(500).send({ error: error.message });
  }
};

module.exports = { register, login };
