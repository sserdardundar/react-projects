const express = require("express");
const router = express.Router();
const {
  getContent,
  addSth,
  editSth,
  deleteSth,
} = require("../controllers/content");

router.route("/get/:id&:active").get(getContent);
router.route("/add/:belongId").post(addSth);
router.route("/edit/:editId").post(editSth);
router.route("/delete/:id&:active").post(deleteSth);

module.exports = router;
