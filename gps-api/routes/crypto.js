const express= require('express')
const router=express.Router()
const{getCoin,getWallet,addCoin,deleteCoin}=require(`../controllers/crypto`)

router.route('/wallet/:time').get(getWallet)
router.route('/:crypto&:time').get(getCoin).post(addCoin).delete(deleteCoin)

module.exports=router  