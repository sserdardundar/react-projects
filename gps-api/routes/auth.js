const express= require('express')
const router= express.Router()
const {login,register,getAll}=require('../controllers/auth')


router.post('/auth/register',register)
router.post('/auth/login',login)
router.get('/home/:cur',getAll)

module.exports=router