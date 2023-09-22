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
    const user = await User.create({ ...req.body });
    const token = user.getToken();
    res
      .status(200)
      .json({ success: true, data: {isConfirmed:false, token } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email.length || !password.length) {
      return res
        .status(StatusCodes.OK)
        .json({ success: false, error: "Please provide Email and Password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.OK)
        .json({ success: false, error: "No user exist with given email" });
    }
    const passwordCheck = await user.comparePasswords(password);
    if (!passwordCheck) {
      return res
        .status(StatusCodes.OK)
        .json({ success: false, error: "User password is incorrect" });
    }
    const token = user.getToken();
    return res
      .status(StatusCodes.OK)
      .json({
        success: true,
        messsage: "Giriş Başarılı",
        data: { userName: user.name,userMail:email, token },
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register
};
