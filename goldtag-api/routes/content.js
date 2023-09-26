const express = require("express");
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
 * /get/:
 *   get:
 *     summary: get website content
 *     tags: [Content]
 *     parameters:
 *     - name: website
 *       description: website to filter
 *       in: formData
 *       required: false
 *       default: all
 *       type: String
 *     - name: subheader
 *       description: subheader to filter
 *       in: formData
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
router.route("/get/:website&:subheader").get(getContent);

router.route("/add").post(addSth);

router.route("/edit").post(editSth);

router.route("/delete").post(deleteSth);

module.exports = router;
