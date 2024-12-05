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

// Returns all rows of specialties in Specialties
const getRegistrations = async (req, res) => {

  try {
    // Select all rows from the "Registrations" table
    const query = `
    SELECT Registrations.registrationID,
    Students.studentID, ClassInstances.classInstanceID, Invoices.invoiceID, 
    ClassInstances.classDate, ClassInstances.classTime, Classes.className, 
    Classes.classID, Kitchens.kitchenLocation, Students.studentID, 
    Students.firstName, Students.lastName
    FROM Registrations
    LEFT JOIN Students ON Registrations.studentID = Students.studentID
    JOIN ClassInstances ON Registrations.classInstanceID = ClassInstances.classInstanceID
    LEFT JOIN Kitchens ON ClassInstances.kitchenID = Kitchens.kitchenID
    LEFT JOIN Invoices ON Registrations.invoiceID = Invoices.invoiceID
    JOIN Classes ON ClassInstances.classID = Classes.classID
    ORDER BY Registrations.registrationID
    `;
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching registrations from the database:", error);
    res.status(500).json({ error: "Error fetching registrations" });
  }
};

// Returns status of creation of new registration in Registrations
const createRegistration = async (req, res) => {
  try {
    const { studentID, classInstanceID, generateInvoice, invoiceID } = req.body;
    const query =
      "INSERT INTO Registrations (studentID, classInstanceID, generateInvoice, invoiceID ) VALUES (?, ?, ?, ?)";
      const response = await db.query(query, [
      studentID,
      parseInt(classInstanceID),
      generateInvoice,
      invoiceID
    ]);

    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating registration:", error);
    // Inform the client of the error
    // TODO delete the auto-generated invoice.
    res.status(500).json({ error: "Error creating registration! If an invoice was auto-generated, uhoh." });
  }
};


const updateRegistration = async (req, res) => {
  // Get the registration ID
  const registrationID_recv = req.params.registrationID;
  console.log(`Received registrationsID: ${registrationID_recv}`);
  // Get the registration object
  const newRegistration = req.body;
  console.log(`newRegistration: ${JSON.stringify(newRegistration)}`);

  try {
    const [data] = await db.query("SELECT studentID, classInstanceID FROM Registrations WHERE registrationID = ?", [
      registrationID_recv,
    ]);

    const oldRegistration = data[0];
    console.log(`oldRegistration: ${JSON.stringify(oldRegistration)}`);

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newRegistration, oldRegistration)) {
      const query =
        "UPDATE Registrations SET studentID=?, classInstanceID=? WHERE registrationID= ?";

      const values = [
        newRegistration.studentID,
        newRegistration.classInstanceID,
        registrationID_recv
      ];
      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Registration updated successfully." });
    }

    res.json({ message: "Registration details are the same, no update" });
  } catch (error) {
    console.log("Error updating registration", error);
    res
      .status(500)
      .json({ error: `Error updating the registration with id ${registrationID_recv}` });
  }
};

// Endpoint to delete a registration from the database
const deleteRegistration = async (req, res) => {
  const registrationID_recv = req.params.registrationID;
  console.log("Deleting specialty with id:", registrationID_recv);

  try {
    // Ensure the registration exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM Registrations WHERE registrationID = ?",
      [registrationID_recv]
    );

    // If the registration doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Registration not found.");
    }

    // Delete related records from the Registrations table
    await db.query("DELETE FROM Registrations WHERE registrationID = ?", [registrationID_recv]);

    // Return the appropriate status code
    res.json({ message: "Registration deleted successfully." })
  } catch (error) {
    console.error("Error deleting registration from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getRegistrations,
  createRegistration,
  updateRegistration,
  deleteRegistration
};
