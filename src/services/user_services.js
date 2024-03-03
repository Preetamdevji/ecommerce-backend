const User = require("../model/user_model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider.js");

let creatUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error(`User is already exist with this email, ${email}`);
    }
    password = await bcrypt.hash(password, 8);

    let user = await User.create({ firstName, lastName, email, password });
    // console.log("user created", user);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    let user = await User.findById(userId);
    // .populate("address");
    if (!user) {
      throw new Error("User not found by this id : ", user);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found with this email : ", email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    let userId = jwtProvider.getUserIdFromToken(token);
    let user = await findUserById(userId);
    if (!user) {
      throw new Error("User not found with id : ", userId);
    }
    // console.log(user);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  creatUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
