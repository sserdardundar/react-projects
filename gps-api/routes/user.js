const express= require('express')
const router=express.Router()
const{getUser,editUser, manageUser}=require(`../controllers/user`)

router.route('/:confirm').get(getUser).post(editUser)
router.route('/manage/:action').post(manageUser)

module.exports=router