const userService = require("../services/user_services.js");

const getUserProfile =async(req, resp) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1];
    if (!jwt) {
      return resp.status(404).send({ error: "Token not found" });
    }
    const user = await userService.getUserProfileByToken(jwt);
    return resp.status(200).send(user);
  } catch (error) {
    return resp.status(500).send({ error: error.message });
  }
};

const getAllUsers = async (req, resp) => {
  try {
    const users = await userService.getAllUsers();
    return resp.status(200).send(users);
  } catch (error) {
    return resp.status(500).send({ error: error.message });
  }
};

module.exports = { getUserProfile, getAllUsers };
