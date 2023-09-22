const Crypto = require("../models/Crypto");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Coins = require("../models/Coins");
const { coinFetcher } = require("./fetcher");
const { NotFoundError } = require("../errors/index");
const { dovizFetcher } = require("./currency");
const getWallet = async (req, res,next) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const price = await dovizFetcher(user.currency);
    const sign= user.currency==='usd'?`$`:'₺'
    const userWallet = await Wallet.findOne({ belong: userId });
    const newWallet = [];
    if (!userWallet.coins.length) {
      return res
        .status(200)
        .json({ success: false, error: "User wallet is empty" });
    }
    for (item of userWallet.coins) {
      newWallet.push(item);
    }
    const history = [];
    for (item of newWallet) {
      const coinHistory = await Crypto.find({ name: item.name }).select(
        "-_id -__v -name"
      );
      let tempList = [];
      const millisecondsInMonth = 30 * 24 * 60 * 60 * 1000;
      let mont = 0;
      for (let it of coinHistory) {
        let tempPrice = parseFloat(it.price) * parseFloat(price);
        it = { price: `${tempPrice} ${sign}`, time: it.time };
        if (req.params.time === "dflt") {
          if (item.time < it.time) {
            tempList.push(it);
          }
        } else {
          let time = new Date();
          const gmtPlus3Date = new Date(time.getTime() + 180 * 60 * 1000);
          mont = Number(req.params.time[0]);
          if (gmtPlus3Date - it.time < mont * millisecondsInMonth) {
            tempList.push(it);
          }
        }
        if (
          tempList.length === 0 &&
          it.time === coinHistory[coinHistory.length - 1].time
        ) {
          tempList.push(it);
        }
      }
      history.push({ name: item.name, coinHistory: tempList });
    }
    return res.status(200).json({
      success: true,
      errors: "",
      data: { coins: newWallet, history: history },
    });
  } catch (error) {
    next(error);
  }
};
const addCoin = async (req, res,next) => {
    try{
  const { userId } = req.user;
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const verified = user.isConfirmed
  if(!verified){
    throw new Error('User mail is not verified to do wallet operations, Please verify')
  }
  let userWallet = await Wallet.findOne({ belong: userId });
  userWallet = userWallet.coins;
  let { crypto } = req.params;
  if (crypto === "coin") {
    crypto = req.body.crypto;
  }
  const newWallet = [];
  const errors = [];
  let cryptoList = [];
  if (typeof crypto === "object") {
    for (element of crypto) {
      cryptoList.push(element);
    }
  } else {
    cryptoList.push(crypto);
  }
  if (userWallet.length) {
    for (item of userWallet) {
      newWallet.push(item);
    }
  }
  for (element of cryptoList) {
    let found = 0;
    for (item of newWallet) {
      if (item.name === element) {
        found = true;
      }
    }
    if (found) {
      errors.push(`${element} already exists in Wallet`);
    } else {
      const exist = await coinFetcher(element);
      if (!exist) {
        errors.push(`${element} does not exist as a coin`);
      } else {
        let time = new Date();
        const gmtPlus3Date = new Date(time.getTime() + 180 * 60 * 1000);
        newWallet.push({ name: element, time: gmtPlus3Date });
        const listed = await Coins.findOne({ symbol: element });
        if (listed) {
          if (listed.isActive === false && listed.count === 0) {
            await Coins.findOneAndUpdate(
              { symbol: element },
              { count: listed.count + 1, isActive: true }
            );
          }
          await Coins.findOneAndUpdate(
            { symbol: element },
            { count: listed.count + 1 }
          );
        } else {
          await Coins.create({ symbol: element, count: 1 });
        }
        const inDB = await Crypto.findOne({ name: element });
        if (!inDB) {
          try {
            let tim = new Date();
            const gmt3 = new Date(tim.getTime() + 180 * 60 * 1000);
            await Crypto.create({ name: element, price: exist, time: gmt3 });
          } catch (error) {
            next(error);
          }
        }
      }
    }
  }
  const Wallett = await Wallet.findOneAndUpdate(
    { belong: userId },
    { coins: newWallet },
    { new: true }
  );
  if (errors) {
    if (errors.length === cryptoList.length) {
      return res.status(200).json({ success: false, error: errors });
    }
    return res
      .status(200)
      .json({ success: true, error: errors, data: { wallet: Wallett.coins } });
  }
  return res
    .status(200)
    .json({ sucess: true, data: { wallet: Wallett.coins } });
}catch(error){
    next(error)
}
};

const getCoin = async (req, res,next) => {
    try{
  const { userId } = req.user;
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  let { crypto } = req.params;
  if (crypto === "coin") {
    crypto = req.body.crypto;
  }
  let coins = await Crypto.findOne({ name: crypto }).select("-_id -__v -name");
  const price = await dovizFetcher(user.currency);
  const sign= user.currency==='usd'?`$`:'₺'
  if (!coins) {
    const coinPrice = await coinFetcher(crypto);
    if (!coinPrice) {
      return res
        .status(200)
        .json({ success: false, error: "Coin does not exists " });
    }
    let time = new Date();
    const gmtPlus3Date = new Date(time.getTime() + 180 * 60 * 1000);
    let newPrice = parseFloat(coinPrice) * parseFloat(price);
    coins = { prices: [{ price: `${newPrice}`, time: gmtPlus3Date }] };
  } else {
    let prices = await Crypto.find({ name: crypto }).select("-_id -__v -name");
    prices = prices.filter((inst) => {
      if (inst === prices[prices.length - 1]) {
        return true;
      } else {
        const millisecondsInMonth = 30 * 24 * 60 * 60 * 1000;
        let time = new Date();
        const gmtPlus3Date = new Date(time.getTime() + 180 * 60 * 1000);
        const mont = Number(req.params.time[0]);
        if (gmtPlus3Date - inst.time < mont * millisecondsInMonth) {
          return true;
        }
      }
    });
    let newPrices = prices.map((prc) => {
      return {
        price: `${parseFloat(prc.price) * parseFloat(price)} ${sign}`,
        time: prc.time,
      };
    });
    coins = { prices: newPrices.reverse() };
  }
  return res.status(200).json({ success: true, name: crypto, data: { coins } });
}catch(error){
    next(error)
}
}

const deleteCoin = async (req, res,next) => {
    try{
  const { userId } = req.user;
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  let userWallet = await Wallet.findOne({ belong: userId });
  userWallet = userWallet.coins;
  const verified = user.isConfirmed
  if(!verified){
    throw new Error('User mail is not verified to do wallet operations, Please verify')
  }
  const { crypto } = req.body;
  let newWallet = [];
  let found = 0;
  if (!userWallet.length) {
    return res
      .status(200)
      .json({ success: false, error: "user wallet is empty" });
  }
  for (item of userWallet) {
    newWallet.push(item);
    if (item.name === crypto) {
      found = true;
    }
  }
  if (!found) {
    return res.status(200).json({
      success: false,
      error: `${crypto} is not listed in user Wallet'`,
    });
  }
  newWallet = newWallet.filter((item) => {
    if (item.name !== crypto) {
      return true;
    }
  });
  const listedcoin = await Coins.findOne({ symbol: crypto });
  if (listedcoin.count === 1) {
    if (listedcoin.category !== "top20") {
      await Coins.findOneAndUpdate(
        { symbol: crypto },
        { count: 0, isActive: false }
      );
    } else {
      await Coins.findOneAndUpdate({ symbol: crypto }, { count: 0 });
    }
  } else {
    if (listedcoin.count === 0) {
      if (listedcoin.category !== "top20") {
        await Coins.findOneAndUpdate(
          { symbol: crypto },
          { count: 0, isActive: false }
        );
      } else {
        await Coins.findOneAndUpdate({ symbol: crypto }, { count: 0 });
      }
    } else {
      await Coins.findOneAndUpdate(
        { symbol: crypto },
        { count: listedcoin.count - 1 }
      );
    }
  }
  const wallett = await Wallet.findOneAndUpdate(
    { belong: userId },
    { coins: newWallet },
    { new: true }
  ).select("-_id -__v -isActive -belong");
  return res.status(200).json({ success: true, wallett });
    }catch(error){
        next(error)
    }
};
module.exports = {
  getCoin,
  getWallet,
  addCoin,
  deleteCoin,
};
