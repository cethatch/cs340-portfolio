/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of invoices in Invoices
const getInvoices = async (req, res) => {
  try {
    // Select all rows from the "Invoices" table
    const query = `
    SELECT invoiceID, Students.studentID, Students.firstName, Students.lastName, 
    invoiceDate, invoiceTotal, invoicePaid, comments FROM Invoices
    LEFT JOIN Students ON Invoices.studentID = Students.studentID;
    `;
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching invoices from the database:", error);
    res.status(500).json({ error: "Error fetching invoices" });
  }
};

// Returns the latest entry; used in registrations auto-generation option
const getLatestInvoice = async(req, res) => {
  try {
    const query = "SELECT * from Invoices WHERE invoiceID = LAST_INSERT_ID()";
    const [result] = await db.query(query);
    if (result.length === 0) {
      return res.status(404).json({error: "Invoice not found."})
    }
    const invoice = result[0];
    res.status(200).json(invoice);
  } catch (error) {
    console.log("Error fetching the latest invoice from the database:", error);
    res.status(500).json("Error fetching latest invoice from the database.");
  }
};

// Returns status of creation of new invoice in Invoices
const createInvoice = async (req, res) => {
  try {
    const { studentID, invoiceDate, invoiceTotal, invoicePaid, comments } = req.body;
    const query =
      "INSERT INTO Invoices (studentID, invoiceDate, invoiceTotal, invoicePaid, comments) VALUES (?, ?, ?, ?, ?)";
    
    const response = await db.query(query, [
      studentID=== "" ? null : parseInt(studentID),
      invoiceDate,
      invoiceTotal === "" ? null : parseFloat(invoiceTotal),
      invoicePaid === "" ? null: parseInt(invoicePaid),
      comments === "" ? null : comments
    ]);
    res.status(201);
    return res.json({ message: "Invoice generated successfully." })
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating class:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating class" });
  }
};

const updateInvoice = async (req, res) => {
  // Get the person ID
  const invoiceID_recvd = req.params.invoiceID;
  console.log(`Received invoiceID: ${invoiceID_recvd}`);
  // Get the person object
  const newInvoice = req.body;
  console.log(`newInvoice: ${JSON.stringify(newInvoice)}`);

  try {
    const [data] = await db.query("SELECT * FROM Invoices WHERE invoiceID = ?", [
      invoiceID_recvd,
    ]);

    const oldInvoice = data[0];
    console.log(`oldInvoice: ${JSON.stringify(oldInvoice)}`);

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newInvoice, oldInvoice)) {
      const query =
        "UPDATE Invoices SET studentID=?, invoiceDate=?, invoiceTotal=?, invoicePaid=?, comments=? WHERE invoiceID= ?";

      // studentID is NULL-able FK in invoices, has to be valid INT FK ID or NULL
      const studentID = newInvoice.studentID === "" ? null : parseInt(newInvoice.studentID);

      const values = [
        studentID,
        newInvoice.invoiceDate,
        newInvoice.invoiceTotal,
        newInvoice.invoicePaid,
        newInvoice.comments,
        invoiceID_recvd,
      ];
      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Invoice updated successfully." });
    }

    res.json({ message: "Invoice details are the same, no update" });
  } catch (error) {
    console.log("Error updating invoice", error);
    res
      .status(500)
      .json({ error: `Error updating the invoice with id ${invoiceID_recvd}` });
  }
};

// Export the functions as methods of an object
module.exports = {
  getInvoices,
  getLatestInvoice,
  createInvoice,
  updateInvoice
};
