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

// Returns all rows of classes in Classes
const getClassInstructors = async (req, res) => {
  try {
    // Select all rows from the "Classes" table
    const query = `
    SELECT classInstructorID, Instructors.instFirstName, Instructors.instLastName, 
    ClassInstances.classInstanceID, Classes.className, ClassInstances.classDate, ClassInstances.classTime,
    Kitchens.kitchenLocation, ClassInstances.privateEvent FROM ClassInstructors
    LEFT JOIN Instructors ON ClassInstructors.instructorID = Instructors.instructorID
    LEFT JOIN ClassInstances ON ClassInstructors.classInstanceID = ClassInstances.classInstanceID 
    LEFT JOIN Kitchens ON ClassInstances.kitchenID = Kitchens.kitchenID
    JOIN Classes ON ClassInstances.classID = Classes.classID
    `;

    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching instructor assignments from the database:", error);
    res.status(500).json({ error: "Error fetching instructor assignments" });
  }
};

// Returns status of creation of new class in Classes
const createClassInstructor = async (req, res) => {
  try {
    const { instructorID, classInstanceID } = req.body;
    const query =
      "INSERT INTO ClassInstructors (instructorID, classInstanceID) VALUES (?, ?)";

    const response = await db.query(query, [
      instructorID === "" ? null : parseInt(instructorID),
      classInstanceID === "" ? null : parseInt(classInstanceID)
    ]);
    console.log("New instructor assignment created.");
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating instructor assignment:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating instructor assignment" });
  }
};


const updateClassInstructor = async (req, res) => {
  // Get the assignment ID
  const classInstructorID_recvd = req.params.classInstructorID;
  console.log(`Received classInstructorID: ${classInstructorID_recvd}`);
  // Get the person object
  const newClassInstructor = req.body;
  console.log(`newClassInstructor: ${JSON.stringify(newClassInstructor)}`);

  try {
    const [data] = await db.query("SELECT * FROM ClassInstructors WHERE classInstructorID = ?", [
      newClassInstructor.classInstructorID,
    ]);

    const oldClassInstructor = data[0];
    console.log(`oldClassInstructor: ${JSON.stringify(oldClassInstructor)}`);

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newClassInstructor, oldClassInstructor)) {
      const query =
        "UPDATE ClassInstructor SET instructorID=?, classInstanceID=? WHERE classInstructorID= ?";

      // InstructorID is NULL-able FK in ClassInstructors, has to be valid INT FK ID or NULL
      const instructorID_confirmed = newClassInstructor.classInstructorID === "" ? null : parseInt(newClassInstructor.classInstructorID);

      const values = [
        instructorID_confirmed,
        newClassInstructor.classInstanceID,
        classInstructorID_recvd,
      ];
      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Instructor assignment updated successfully." });
    }

    res.json({ message: "Instructor assignment details are the same, no update" });
  } catch (error) {
    console.log("Error updating instructor assignment", error);
    res
      .status(500)
      .json({ error: `Error updating the Instructor assignment with id ${classInstructorID_recvd}` });
  }
};

// Endpoint to delete a instructor from the database
const deleteClassInstructor = async (req, res) => {
  const classInstructorID_recvd = req.params.classInstructorID;
  console.log("Deleting instructor assignment with id:", classInstructorID_recvd);
  

  try {
    // Ensure the instructor exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM ClassInstructors WHERE classInstructorID = ?",
      [classInstructorID_recvd]
    );

    // If the instructor doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Instructor assignment not found.");
    }

    // Delete related records from the Instructors table
    await db.query("DELETE FROM ClassInstructors WHERE classInstructorID = ?", [classInstructorID_recvd]);

    // Return the appropriate status code
    res.json({ message: "Instructor assignment deleted successfully." })
  } catch (error) {
    console.error("Error deleting instructor assignment from the database:", error);
    res.status(500).json({ error: error.message });
  }
};


// Export the functions as methods of an object
module.exports = {
  getClassInstructors,
  createClassInstructor,
  updateClassInstructor,
  deleteClassInstructor
};
