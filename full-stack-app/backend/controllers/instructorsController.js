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

// Returns all rows of instructors in Instructors
const getInstructors = async (req, res) => {
  try {
    // Select all rows from the "Instructors" table
    const query = "SELECT * FROM Instructors";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching instructors from the database:", error);
    res.status(500).json({ error: "Error fetching instructors" });
  }
};

// Returns a single instructor by their unique ID from Instructors
const getInstructorByID = async (req, res) => {
  try {
    const instructorID_recvd = req.params.instructorID;
    const query = "SELECT * FROM Instructors WHERE instructorID = instructorID_recvd";
    const [result] = await db.query(query, [instructorID_recvd]);
    // Check if instructor was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Instructor not found" });
    }
    const instructor_found = result[0];
    res.json(instructor_found);
  } catch (error) {
    console.error("Error fetching instructor from the database:", error);
    res.status(500).json({ error: "Error fetching instructor" });
  }
};

// Returns status of creation of new instructor in Instructors
const createInstructor = async (req, res) => {
  try {
    const { instFirstName, instLastName, phone, email, hireDate, specialtyID, hourlyRate } = req.body;
    const query =
      "INSERT INTO Instructors (instFirstName, instLastName, phone, email, hireDate, specialtyID, hourlyRate) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Ensure the specialty exists:
    const [specialtyExists] = await db.query(
      "SELECT * FROM Specialties WHERE specialtyID = ?",
      [specialtyID]
    );

    // If the specialty doesn't exist, return an error
    if (specialtyExists.length === 0) {
      return res.status(404).send("Specialty not found.");
    }

    const response = await db.query(query, [
      instFirstName,
      instLastName,
      phone,
      email=== "" ? null : email,
      hireDate,
      specialtyID,
      hourlyRate=== "" ? null : parseFloat(hourlyRate)
    ]);

    console.log("New instructor created.");
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating instructor:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating instructor" });
  }
};


const updateInstructor= async (req, res) => {
  // Get the instructor ID
  const instructorID_recvd = req.params.instructorID;
  console.log(`Received instructorID: ${instructorID_recvd}`);
  // Get the instructor object from request
  const newInstructor = req.body;
  console.log(`newInstructor: ${JSON.stringify(newInstructor)}`);

  try {
    const [data] = await db.query("SELECT * FROM Instructors WHERE instructorID = ?", [
      instructorID_recvd,
    ]);

    const oldInstructor = data[0];
    console.log(`oldInstructor: ${JSON.stringify(oldInstructor)}`);

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newInstructor, oldInstructor)) {
      const query =
        "UPDATE Instructors SET instFirstName=?, instLastName=?, phone=?, email=?, hireDate=?, specialtyID=?, hourlyRate=? WHERE instructorID= ?";

      // Ensure the specialty exists:
      const [specialtyExists] = await db.query(
        "SELECT * FROM Specialties WHERE specialtyID = ?",
        [newInstructor.specialtyID]
      );

      // If the specialty doesn't exist, return an error
      if (specialtyExists.length === 0) {
        return res.status(404).send("Specialty not found.");
      }
      
      // specialtyID is NULLable FK in Instructors, so set to valid ID or NULL
      const specialtyID_confirmed = newInstructor.specialtyID === "" ? null : newInstructor.specialtyID

      const values = [
        newInstructor.instFirstName,
        newInstructor.instLastName,
        newInstructor.phone,
        newInstructor.email,
        newInstructor.hireDate,
        specialtyID_confirmed,
        newInstructor.hourlyRate
      ];
      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Instructor updated successfully." });
    }

    res.json({ message: "Instructor details are the same, no update" });
  } catch (error) {
    console.log("Error updating instructor", error);
    res
      .status(500)
      .json({ error: `Error updating the instructor with id ${instructorID_recvd}` });
  }
};


// Endpoint to delete a instructor from the database
const deleteInstructor = async (req, res) => {
  const instructorID_recvd = req.params.instructorID;
  console.log("Deleting instructor with id:", instructorID_recvd);
  

  try {
    // Ensure the instructor exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM Instructors WHERE instructorID = ?",
      [instructorID_recvd]
    );

    // If the instructor doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Instructor not found.");
    }

    // Delete related records from the Instructors table
    await db.query("DELETE FROM Instructors WHERE kitchenID = ?", [kitchenID]);

    // Return the appropriate status code
    res.json({ message: "Instructor deleted successfully." })
  } catch (error) {
    console.error("Error deleting instructor from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getInstructors,
  getInstructorByID,
  createInstructor,
  updateInstructor,
  deleteInstructor
};
