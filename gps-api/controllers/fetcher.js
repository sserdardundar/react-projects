require('dotenv').config()
const Crypto= require('../models/Crypto')
const axios = require('axios');
const Coins=require('../models/Coins')
const {BadRequestError,UnauthenticatedError, NotFoundError} =require('../errors/index')


const first20Fetcher=async(coin)=>{
const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
try {
  const response = await axios.get(apiUrl, {
    params: {
      start: '1',
      limit: '20',
      convert: 'USD',
    },
    headers: {
      'X-CMC_PRO_API_KEY': process.env.API_KEY,
    }
  })
  const data= response.data.data
  let coinDataSet=[]
  for(item of data){
    coinDataSet.push({name:item.symbol,price:item.quote.USD.price})
  }
  return coinDataSet
} catch (error) {
  console.error(error.message)
  throw new Error('Error occured while fetching top 20 coins ')
}
}
const coinFetcher=async (coin)=>{
  try {
    const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${coin}`;
    const response = await axios.get(apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY,
      }
    })
    const data= response.data.data
    return data[coin].quote.USD.price
  } catch (error) {
  } 
}
module.exports={first20Fetcher,coinFetcher}
