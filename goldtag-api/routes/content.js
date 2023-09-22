const express = require("express");
const router = express.Router();
const { getContent, addSth,editSth,deleteSth,helpSth } = require("../controllers/content")
router.route("/get/:website&:subheader").get(getContent);
router.route("/add").post(addSth);
router.route("/edit").post(editSth);
router.route("/delete").post(deleteSth);
router.route("/help/:subject").get(helpSth);
router.route("/help").get(helpSth);

module.exports = router;
