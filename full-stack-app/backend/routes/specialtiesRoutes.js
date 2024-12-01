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
  getSpecialties,
  getSpecialtyByID,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
} = require("../controllers/specialtiesController");

router.get("/", getSpecialties);
router.get("/:specialtyID", getSpecialtyByID);
router.post("/", createSpecialty);
router.put("/:specialtyID", updateSpecialty);
router.delete("/:specialtyID", deleteSpecialty);


module.exports = router;
