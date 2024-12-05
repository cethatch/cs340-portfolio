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
  getRegistrations,
  createRegistration,
  updateRegistration,
  deleteRegistration,
} = require("../controllers/registrationsController");

router.get("/", getRegistrations);
router.post("/", createRegistration);
router.put("/:registrationID", updateRegistration);
router.delete("/:registrationID", deleteRegistration);


module.exports = router;
