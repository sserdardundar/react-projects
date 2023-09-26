const express= require('express')
const router= express.Router()
const {login,register}=require('../controllers/auth')
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: username
 *         email:
 *           type: string
 *           description: user mail
 *         password:
 *           type: string
 *           description: At leas 6 digit password
 *       example:
 *         name: Mehmet
 *         email: mehmettest@gmail.com
 *         password: 89!js8nsf
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Opeartion success
 *         error:
 *           type: string
 *           description: Error type
 *       example:
 *         success: false
 *         error: Error occured during process
 *     Successauth:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Opeartion success
 *         message:
 *           type: string
 *           description: success message
 *         data:
 *           type: object
 *           description: User and token
 *           properties:
 *             user:
 *               type: object
 *               description: created user
 *               properties:
 *                 name:
 *                   type: string
 *                   description: username
 *                 email:
 *                   type: string
 *                   description: usermail
 *             token:
 *               type: string
 *               description: auth token
 *       example:
 *         success: true
 *         message: Successfull
 *         data:
 *           user:
 *             name: Mehmet
 *             email: mehmettest@gmail.com
 *           token: 89347y5bf87erj8egg77f89qh8d7w4f9048yq3g7fh7w9h3cb86g34f
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The user managing API
 * /auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Successauth'
 *       400:
 *         description: Bad request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 */
router.post('/auth/register',register)
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The user managing API
 * /auth/login:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: user mail
 *               password:
 *                 type: string
 *                 description: user password
 *             example:
 *               email: mehmettest@gmail.com
 *               password: 89!js8nsf
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Successauth'
 *       400:
 *         description: Bad request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 */
router.post('/auth/login',login)

module.exports=router