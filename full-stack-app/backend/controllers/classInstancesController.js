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

// Returns all rows of classes in ClassInstances
const getClassInstances = async (req, res) => {
  try {
    // Select all rows from the "ClassInstances" table
    const query = "SELECT * FROM ClassInstances LEFT JOIN Classes ON ClassInstances.classID = Classes.classID LEFT JOIN Kitchens ON ClassInstances.kitchenID = Kitchens.kitchenID;";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching classesInstances from the database:", error);
    res.status(500).json({ error: "Error fetching classesInstances" });
  }
};

// Returns a single person by their unique ID from ClassInstances
const getClassInstancesByID = async (req, res) => {
  try {
    const classInstanceID_recvd = req.params.classInstanceID;
    const query = "SELECT * FROM ClassInstances WHERE classInstanceID = ?";
    const [result] = await db.query(query, [classInstanceID_recvd]);
    // Check if class was found
    if (result.length === 0) {
      return res.status(404).json({ error: "ClassInstance not found" });
    }
    const classInstance_found = result[0];
    res.json(classInstance_found);
  } catch (error) {
    console.error("Error fetching classInstance from the database:", error);
    res.status(500).json({ error: "Error fetching classInstance" });
  }
};

// Returns status of creation of new class in Classes
const createClassInstance = async (req, res) => {
  try {
    const { classID, classDate, classTime, kitchenID, privateEvent } = req.body;
    const query =
      "INSERT INTO ClassInstances (classID, classDate, classTime, kitchenID, privateEvent) VALUES (?, ?, ?, ?, ?)";
    const response = await db.query(query, [
      classID,
      classDate,
      classTime,
      kitchenID === "" ? null : parseInt(kitchenID),
      privateEvent
    ]);
    console.log("New classInstance created.");
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating classInstance:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating classInstance" });
  }
};


const updateClassInstance = async (req, res) => {
  // Get the person ID
  const classInstanceID_recvd = req.params.classInstanceID;
  console.log(`Received classInstanceID: ${classInstanceID_recvd}`);
  // Get the person object
  const newClassInstance = req.body;
  console.log(`newClassInstance: ${JSON.stringify(newClassInstance)}`);

  try {
    const [data] = await db.query("SELECT * FROM ClassInstances WHERE classInstanceID = ?", [
      classInstanceID_recvd,
    ]);

    const oldClassInstance = data[0];
    console.log(`oldClassInstance: ${JSON.stringify(oldClassInstance)}`);

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newClassInstance, oldClassInstance)) {
      const query =
        "UPDATE ClassInstances SET classID=?, classDate=?, classTime=?, kitchenID=?, privateEvent=? WHERE classInstanceID= ?";

      // kitchenID is NULL-able FK in classInstances, has to be valid INT FK ID or NULL
      const kitchenID_confirmed = newClassInstance.kitchenID === "" ? null : parseInt(newClassInstance.kitchenID);

      const values = [
        parseInt(newClassInstance.classID),
        newClassInstance.classDate,
        newClassInstance.classTime,
        kitchenID_confirmed,
        newClassInstance.privateEvent,
        classInstanceID_recvd
      ];
      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Scheduled class updated successfully." });
    }

    res.json({ message: "Scheduled class details are the same, no update" });
  } catch (error) {
    console.log("Error updating classInstance", error);
    res
      .status(500)
      .json({ error: `Error updating the classInstance with id ${classInstanceID_recvd}` });
  }
};

// Export the functions as methods of an object
module.exports = {
  getClassInstances,
  getClassInstancesByID,
  createClassInstance,
  updateClassInstance
  // deletePerson,
};
