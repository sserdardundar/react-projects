const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Coins = require("../models/Coins");
const Crypto = require("../models/Crypto");
const moment = require("moment");
require("dotenv").config();
const nodemailer = require("nodemailer");

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).select("-_id -__v -password");
    const { confirm } = req.params;
    if (confirm === "no") {
      return res.status(200).json({
        success: true,
        data: {
          user: {
            name: user.name,
            email: user.email,
            isConfirmed: user.isConfirmed,
          },
        },
      });
    } else if (confirm === "yes") {
      function generateRandom6DigitNumber() {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      const randomNum = generateRandom6DigitNumber();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "ssdcorpcrypto@gmail.com",
          pass: "docavdoupzywxwsn",
        },
      });
      const mailOptions = {
        from: "ssdcorpcrypto@gmail.com",
        to: user.email,
        subject: "Confirmation Mail",
        text: `${randomNum}`,
      };
      await transporter.sendMail(mailOptions);
      return res.status(200).json({
        success: true,
        data: {
          verCode: `${randomNum}`,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
const editUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const newUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body.edit },
      { runValidators: true, new: true }
    ).select("-_id -__v -password");
    return res.status(200).json({ success: true, data: { user: newUser } });
  } catch (error) {
    next(error);
  }
};
const manageUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { action } = req.params;
    const user = await User.findById(userId);
    let editedUser = {};
    if (action === "delete") {
      const existed = await User.findOne({ email: `#${user.email}#` });
      if (!existed) {
        editedUser = { email: `#${user.email}#`, isActive: false };
      } else {
        editedUser = { email: `#${existed.email}#`, isActive: false };
      }
    } else if (action === "freeze") {
      editedUser = { isActive: false };
    }
    const newUser = await User.findByIdAndUpdate(userId, editedUser, {
      new: true,
    });
    const newWallet = await Wallet.findOneAndUpdate(
      { belong: userId },
      { isActive: false },
      { new: true }
    );
    const { coins } = newWallet;
    if (coins.length !== 0) {
      for (coinstance of coins) {
        const listedcoin = await Coins.findOne({ symbol: coinstance.name });
        if (listedcoin.count === 1) {
          if (listedcoin.category !== "top20") {
            await Coins.findOneAndUpdate(
              { symbol: coinstance.name },
              { count: 0, isActive: false }
            );
          } else {
            await Coins.findOneAndUpdate(
              { symbol: coinstance.name },
              { count: 0 }
            );
          }
        } else {
          if (listedcoin.count !== 0) {
            await Coins.findOneAndUpdate(
              { symbol: coinstance.name },
              { count: listedcoin.count - 1 }
            );
          }
        }
      }
    }
    return res.status(200).json({ success: true,message:`${action} user request successfull`});
  } catch (error) {
    next(error);
  }
};
module.exports = { getUser, editUser, manageUser };
