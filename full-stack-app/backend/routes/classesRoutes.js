const express = require("express");
const router = express.Router();
const {
  getClasses,
  getClassByID,
  createClass,
  updateClass,
} = require("../controllers/classesController");

router.get("/", getClasses);
router.get("/:classID", getClassByID);
router.post("/", createClass);
router.put("/:classID", updateClass);

module.exports = router;
