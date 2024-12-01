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
const getSpecialties = async (req, res) => {
  try {
    // Select all rows from the "Specialties" table
    const query = "SELECT * FROM Specialties";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching specialties from the database:", error);
    res.status(500).json({ error: "Error fetching specialties" });
  }
};

// Returns a single specialty by their unique ID from Specialties
const getSpecialtyByID = async (req, res) => {
  try {
    const specialtyID_recvd = req.params.specialtyID;
    const query = "SELECT * FROM Specialties WHERE specialtyID = specialtyID_recvd";
    const [result] = await db.query(query, [specialtyID_recvd]);
    // Check if specialty was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Specialty not found" });
    }
    const specialty_found = result[0];
    res.json(specialty_found);
  } catch (error) {
    console.error("Error fetching specialty from the database:", error);
    res.status(500).json({ error: "Error fetching specialty" });
  }
};

// Returns status of creation of new specialty in Specialties
const createSpecialty = async (req, res) => {
  try {
    const { specialtyName } = req.body;
    const query =
      "INSERT INTO Specialties (specialtyName) VALUES (?)";

    const response = await db.query(query, [
      specialtyName
    ]);
    console.log("New specialty created.");
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating specialty:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating specialty" });
  }
};


const updateSpecialty = async (req, res) => {
  // Get the specialty ID
  const specialtyID_recvd = req.params.specialtyID;
  console.log(`Received specialtyID: ${specialtyID_recvd}`);
  // Get the specialty object
  const newSpecialty = req.body;
  console.log(`newSpecialty: ${JSON.stringify(newSpecialty)}`);

  try {
    const [data] = await db.query("SELECT * FROM Specialties WHERE specialtyID = ?", [
      specialtyID_recvd,
    ]);

    const oldSpecialty = data[0];
    console.log(`oldSpecialty: ${JSON.stringify(oldSpecialty)}`);

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newSpecialty, oldSpecialty)) {
      const query =
        "UPDATE Specialty SET specialtyName=? WHERE specialtyID= ?";

      // // Homeoworld is NULL-able FK in bsg_people, has to be valid INT FK ID or NULL
      // const duration = newClass.duration === "" ? null : parseInt(duration);

      const values = [
        newSpecialty.specialtyName,
        specialtyID_recvd,
      ];
      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Specialty updated successfully." });
    }

    res.json({ message: "Specialty is the same, no update" });
  } catch (error) {
    console.log("Error updating specialty", error);
    res
      .status(500)
      .json({ error: `Error updating the specialty with id ${specialtyID_recvd}` });
  }
};


// Endpoint to delete a specialty from the database
const deleteSpecialty = async (req, res) => {
  const specialtyID = req.params.specialtyID;
  console.log("Deleting specialty with id:", specialtyID);
  

  try {
    // Ensure the specialty exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM Specialties WHERE specialtyID = ?",
      [specialtyID]
    );

    // If the specialty doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Specialty not found.");
    }

    // Delete related records from the Specialties table
    await db.query("DELETE FROM Specialties WHERE specialtyID = ?", [specialtyID]);

    // Return the appropriate status code
    res.json({ message: "Specialty deleted successfully." })
  } catch (error) {
    console.error("Error deleting specialty from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getSpecialties,
  getSpecialtyByID,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty
};
