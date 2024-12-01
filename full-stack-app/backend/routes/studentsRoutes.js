/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentByID,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentsController");

router.get("/", getStudents);
router.get("/:studentID", getStudentByID);
router.post("/", createStudent);
router.put("/:studentID", updateStudent);
router.delete("/:studentID", deleteStudent);


module.exports = router;
