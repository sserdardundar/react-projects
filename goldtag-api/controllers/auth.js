const User = require("../models/User");
const moment = require("moment");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    let user = await User.create({ ...req.body });
    const token = user.getToken();
    user={name:user.name, email:user.email}
    res
      .status(200)
      .json({ success: true,message:"User created successfully", data: {user,token} });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email.length || !password.length) {
      throw new BadRequestError("Please provide Email and Password" );
    }
    let user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("No user exist with given email" );
    }
    const passwordCheck = await user.comparePasswords(password);
    if (!passwordCheck) {
      throw new BadRequestError("User password is incorrect")
    }
    const token = user.getToken();
    user = { name: user.name, email: user.email };
    return res
      .status(StatusCodes.OK)
      .json({
        success: true,
        messsage: "Giriş Başarılı",
        data: { user, token },
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register
};
