const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Coins = require("../models/Coins");
const moment = require("moment");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");
const Crypto = require("../models/Crypto");
const { dovizFetcher } = require("./currency");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    await Wallet.create({ belong: user._id });
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
        data: { userName: user.name,userMail:email,isConfirmed:user.isConfirmed,currency:user.currency, token },
      });
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const coins = await Coins.find();
    const coinscount = coins.length;
    const coinsSet = await Crypto.find()
      .select("-_id -createdAt -__v")
      .sort({ time: -1 })
      .limit(coinscount);
    let lasttime = null;
    const price = await dovizFetcher(req.params.cur);
    let finalSet = [];
    for (const coin of coinsSet) {
      const vartime = moment(coin.time).subtract(20, "minutes").toDate();
      if (vartime > lasttime && coin != coinsSet[0]) {
        break;
      }
      lasttime = vartime;
      for (item of coins) {
        if (item.symbol === coin.name) {
          if (item.isActive) {
            let newprc = parseFloat(coin.price) * parseFloat(price);
            finalSet.push({
              name: coin.name,
              price: `${newprc}`,
              time: coin.time,
            });
          }
        }
      }
    }
    finalSet.reverse();
    res
      .status(200)
      .json({
        success: true,
        data: { numberOfCoins: finalSet.length, TopCoins: finalSet },
      });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  login,
  register,
  getAll,
};
