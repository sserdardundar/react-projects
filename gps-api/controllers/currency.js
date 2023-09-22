const  axios =require('axios') 
const  cheerio =require('cheerio');

const dovizFetcher = async (cur) => {
  const Url = `https://kur.doviz.com/serbest-piyasa/amerikan-dolari`;
  const response = await axios.get(Url);
  const html = response.data;
  const $ = cheerio.load(html);
  const marketPrice = $("div .item");
  const items = marketPrice.children();
  const child = items[1];
  const price = $(child).find(".value").text();
  if(cur==='tl'){
      return price;
  }
  return 1 
};

module.exports={dovizFetcher}
