const {first20Fetcher,coinFetcher} = require('./fetcher')
const Crypto= require('../models/Crypto')
const Wallet = require('../models/Wallet')
const User= require('../models/User')
const Coins=require('../models/Coins')
require('dotenv').config()

const updater=async ()=>{
    const coinDataSet=await first20Fetcher()
    const coinsDB=await Coins.find({isActive:true})
    let finalcoinsDB=[]
    const coinList=[]
    const delay = ms=> new Promise(res=>setTimeout(res,ms))
    for(coin of coinDataSet){
       let time=new Date()
       const gmtPlus3Date = new Date(time.getTime() + (180 * 60 * 1000))
        Crypto.create({name:coin.name,price:coin.price,time:gmtPlus3Date})
        let coincount=0
        for(element of coinsDB){
            if(coin.name===element.symbol){
                coincount=element.count
            }
        }
        finalcoinsDB.push({symbol:coin.name,isActive:true,category:"top20",count:coincount})
        coinList.push(coin.name)
        await delay(50)
    }
    const gapList=coinsDB.filter((coin)=>!coinList.includes(coin.symbol))
    for(coin of gapList){
        const price=await coinFetcher(coin.symbol)
        time=new Date()
        const gmtPlus3Date = new Date(time.getTime() + (180 * 60 * 1000))
        await Crypto.create({name:coin.symbol,price:price,time:gmtPlus3Date})
        await delay(1000)
        let coincount=0
        for(element of coinsDB){
            if(coin.symbol===element.symbol){
                coincount=element.count
            }
        }
        finalcoinsDB.push({symbol:coin.symbol,isActive:true,count:coincount})
    }
    for(coins of finalcoinsDB){
        const updated =await Coins.findOneAndUpdate({symbol:coins.symbol},coins,{new:true,runValidators:true})
        if(!updated){
            await Coins.create(coins)
        }
        await delay(100)
    }

}
module.exports={updater}