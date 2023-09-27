const express = require("express");
const authUser = require("../middleware/authentication");
const router = express.Router();
const {
  getContent,
  addSth,
  editSth,
  deleteSth,
} = require("../controllers/content");
/**
 * @swagger
 * components:
 *   schemas:
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
 *
 */
/**
 * @swagger
 * tags:
 *   name: Content
 *   description: The content managing API
 * /get/{website}&{subheader}:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: get website content
 *     tags: [Content]
 *     parameters:
 *     - name: website
 *       description: website to filter
 *       in: path
 *       required: false
 *       default: all
 *       type: String
 *     - name: subheader
 *       description: subheader to filter
 *       in: path
 *       required: false
 *       default: all
 *       type: String
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Operation success
 *                 message:
 *                   type: string
 *                   description: success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     websites:
 *                      type: object
 *               example:
 *                 success: true
 *                 message: Successfull
 *                 data:
 *                   Test App:
 *                     Main:
 *                       Features:
 *                         dynamicID: 0
 *                         title: Features of Test App
 *                         feature1:
 *                           title: Sharing
 *                           description: Sharing is caring
 *                           media: Photo
 *       400:
 *         description: Bad request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 */
router.get("/get/:website&:subheader", authUser, getContent);

/**
 * @swagger
 * tags:
 *   name: Content
 *   description: The content managing API
 * /add:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: add website content
 *     tags: [Content]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *                 Test App:
 *                   Main:
 *                     Features:
 *                       title: Features of Test App
 *                       feature1:
 *                         title: Sharing
 *                         description: Sharing is caring
 *                         media: Photo
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Operation success
 *                 message:
 *                   type: string
 *                   description: success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     websites:
 *                      type: object
 *               example:
 *                 success: true
 *                 message: Successfull
 *                 data:
 *                   Test App:
 *                     Main:
 *                       Features:
 *                         dynamicID: 0
 *                         title: Features of Test App
 *                         feature1:
 *                           title: Sharing
 *                           description: Sharing is caring
 *                           media: Photo
 *       400:
 *         description: Bad request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 */
router.route("/add").post(addSth);
/**
 * @swagger
 * tags:
 *   name: Content
 *   description: The content managing API
 * /edit:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: edit website content
 *     tags: [Content]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contentType:
 *                 type: object
 *                 required: true
 *               path:
 *                 type: object
 *                 properties:
 *                   website:
 *                     type: string
 *                   subheader:
 *                     type: string
 *               edit:
 *                 type: object
 *                 required: true
 *             example:
 *                 contentType: dynamic
 *                 path:
 *                   website: Test App
 *                   subheader: Main
 *                 edit:
 *                   Features:
 *                     feature1:
 *                       title: Share
 *                       description: Sharing is caring
 *                       media: Photo
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Operation success
 *                 message:
 *                   type: string
 *                   description: success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     changed:
 *                      type: array
 *                      items:
 *                        type: object
 *               example:
 *                 success: true
 *                 message: Editing successfull
 *                 data:
 *                   changed: [{Features: {feature1: {title: Share, description: Sharing is caring, media: Photo }}}]
 *       400:
 *         description: Bad request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 */
router.route("/edit").post(editSth);

/**
 * @swagger
 * tags:
 *   name: Content
 *   description: The content managing API
 * /delete:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: delete website content
 *     tags: [Content]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contentType:
 *                 type: object
 *                 required: true
 *               path:
 *                 type: object
 *                 properties:
 *                   website:
 *                     type: string
 *                   subheader:
 *                     type: string
 *               action:
 *                 type: string
 *                 required: true
 *               toDelete:
 *                 type: array
 *                 required: true
 *             example:
 *                 contentType: dynamic
 *                 action: select
 *                 path:
 *                   website: Test App
 *                   subheader: Main
 *                 toDelete: ["Features","Featur"]
 *
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Operation success
 *                 message:
 *                   type: string
 *                   description: success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     changed:
 *                      type: array
 *                      items:
 *                        type: object
 *               example:
 *                 success: true
 *                 message: Deletion successfull
 *                 data:
 *                   changed: [{Features: {feature1: {title: Share, description: Sharing is caring, media: Photo }, isActive: false, title: New Title}}]
 *       400:
 *         description: Bad request error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 */
router.route("/delete").post(deleteSth);

module.exports = router;
