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
  getInvoices,
  getLatestInvoice,
  createInvoice,
  updateInvoice,
} = require("../controllers/invoicesController");

router.get("/", getInvoices);
// define route for fetching the latest invoiceID.
// Used when auto-generating an invoice from registrations CREATE page
router.get("/latestInvoice", getLatestInvoice)
router.post("/", createInvoice);
router.put("/:invoiceID", updateInvoice);

module.exports = router;
