// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of classes in Classes
const getClasses = async (req, res) => {
  try {
    // Select all rows from the "Classes" table
    const query = "SELECT * FROM Classes";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching classes from the database:", error);
    res.status(500).json({ error: "Error fetching classes" });
  }
};

// Returns a single person by their unique ID from Classes
const getClassByID = async (req, res) => {
  try {
    const classID_recvd = req.params.classID;
    const query = "SELECT * FROM Classes WHERE classID = classID_recvd";
    const [result] = await db.query(query, [classID_recvd]);
    // Check if class was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Class not found" });
    }
    const class_found = result[0];
    res.json(class_found);
  } catch (error) {
    console.error("Error fetching class from the database:", error);
    res.status(500).json({ error: "Error fetching class" });
  }
};

// Returns status of creation of new class in Classes
const createClass = async (req, res) => {
  try {
    const { className, duration, registrationCost, classDescription } = req.body;
    const query =
      "INSERT INTO Classes (className, duration, registrationCost, classDescription) VALUES (?, ?, ?, ?)";

    const response = await db.query(query, [
      className,
      duration=== "" ? null : parseInt(duration),
      registrationCost === "" ? null : parseFloat(registrationCost),
      classDescription === "" ? null : classDescription
    ]);
    console.log("New class created.");
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating class:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating class" });
  }
};


const updateClass = async (req, res) => {
  // Get the person ID
  const classID_recvd = req.params.classID;
  console.log(`Received classID: ${classID_recvd}`);
  // Get the person object
  const newClass = req.body;
  console.log(`newClass: ${JSON.stringify(newClass)}`);

  try {
    const [data] = await db.query("SELECT * FROM Classes WHERE classID = ?", [
      classID_recvd,
    ]);

    const oldClass = data[0];
    console.log(`oldClass: ${JSON.stringify(oldClass)}`);

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newClass, oldClass)) {
      const query =
        "UPDATE Classes SET className=?, duration=?, registrationCost=?, classDescription=? WHERE classID= ?";

      // // Homeoworld is NULL-able FK in bsg_people, has to be valid INT FK ID or NULL
      // const duration = newClass.duration === "" ? null : parseInt(duration);

      const values = [
        newClass.className,
        newClass.duration,
        newClass.registrationCost,
        newClass.classDescription,
        classID_recvd,
      ];
      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Class updated successfully." });
    }

    res.json({ message: "Class details are the same, no update" });
  } catch (error) {
    console.log("Error updating class", error);
    res
      .status(500)
      .json({ error: `Error updating the class with id ${classID_recvd}` });
  }
};

// COMMENTED OUT BC CLASSES CANT BE DELETED

// // Endpoint to delete a customer from the database
// const deletePerson = async (req, res) => {
//   console.log("Deleting person with id:", req.params.id);
//   const personID = req.params.id;

//   try {
//     // Ensure the person exitst
//     const [isExisting] = await db.query(
//       "SELECT 1 FROM bsg_people WHERE id = ?",
//       [personID]
//     );

//     // If the person doesn't exist, return an error
//     if (isExisting.length === 0) {
//       return res.status(404).send("Person not found");
//     }

//     // Delete related records from the intersection table (see FK contraints bsg_cert_people)
//     const [response] = await db.query(
//       "DELETE FROM bsg_cert_people WHERE pid = ?",
//       [personID]
//     );

//     console.log(
//       "Deleted",
//       response.affectedRows,
//       "rows from bsg_cert_people intersection table"
//     );

//     // Delete the person from bsg_people
//     await db.query("DELETE FROM bsg_people WHERE id = ?", [personID]);

//     // Return the appropriate status code
//     res.status(204).json({ message: "Person deleted successfully" })
//   } catch (error) {
//     console.error("Error deleting person from the database:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// Export the functions as methods of an object
module.exports = {
  getClasses,
  getClassByID,
  createClass,
  updateClass
  // deletePerson,
};
