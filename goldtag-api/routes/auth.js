const express= require('express')
const router= express.Router()
const {login,register}=require('../controllers/auth')

router.post('/auth/register',register)
router.post('/auth/login',login)

module.exports=router