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

// Returns all rows of students in Students
const getStudents = async (req, res) => {
  try {
    // Select all rows from the "Students" table
    const query = "SELECT * FROM Students";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching students from the database:", error);
    res.status(500).json({ error: "Error fetching students" });
  }
};

// Returns a single student by their unique ID from Students
const getStudentByID = async (req, res) => {
  try {
    const studentID_recvd = req.params.studentID;
    const query = "SELECT * FROM Students WHERE studentID = studentID_recvd";
    const [result] = await db.query(query, [studentID_recvd]);
    // Check if student was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    const student_found = result[0];
    res.json(student_found);
  } catch (error) {
    console.error("Error fetching student from the database:", error);
    res.status(500).json({ error: "Error fetching student" });
  }
};

// Returns status of creation of new student in Students
const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;
    const query =
      "INSERT INTO Students (firstName, lastName, phoneNumber, email) VALUES (?, ?, ?, ?)";

    const response = await db.query(query, [
      firstName,
      lastName,
      phoneNumber,
      email
    ]);
    console.log("New student created.");
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating student:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating student" });
  }
};


const updateStudent = async (req, res) => {
  // Get the student ID
  const studentID_recvd = req.params.studentID;
  console.log(`Received studentID: ${studentID_recvd}`);
  // Get the student object
  const newStudent = req.body;
  console.log(`newStudent: ${JSON.stringify(newStudent)}`);

  try {
    const [data] = await db.query("SELECT * FROM Students WHERE studentID = ?", [
      studentID_recvd
    ]);

    const oldStudent = data[0];
    console.log(`oldStudent: ${JSON.stringify(oldStudent)}`);

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newStudent, oldStudent)) {
      const query =
        "UPDATE Students SET firstName=?, lastName=?, phoneNumber=?, email=? WHERE studentID= ?";

      // // Homeoworld is NULL-able FK in bsg_people, has to be valid INT FK ID or NULL
      // const duration = newClass.duration === "" ? null : parseInt(duration);

      const values = [
        newStudent.firstName,
        newStudent.lastName,
        newStudent.phoneNumber,
        newStudent.email,
        studentID_recvd
      ];
      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Student updated successfully." });
    }

    res.json({ message: "Student details are the same, no update" });
  } catch (error) {
    console.log("Error updating student", error);
    res
      .status(500)
      .json({ error: `Error updating the student with id ${studentID_recvd}` });
  }
};


// Endpoint to delete a student from the database
const deleteStudent = async (req, res) => {
  const studentID = req.params.studentID;
  console.log("Deleting student with id:", studentID);
  

  try {
    // Ensure the student exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM Students WHERE studentID = ?",
      [studentID]
    );

    // If the student doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Student not found.");
    }

    // Delete related records from the Students table
    await db.query("DELETE FROM Students WHERE studentID = ?", [studentID]);

    // Return the appropriate status code
    res.json({ message: "Student deleted successfully." })
  } catch (error) {
    console.error("Error deleting student from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getStudents,
  getStudentByID,
  createStudent,
  updateStudent,
  deleteStudent
};