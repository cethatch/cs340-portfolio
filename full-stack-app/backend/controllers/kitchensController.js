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

// Returns all rows of kitchens in Kitchens
const getKitchens = async (req, res) => {
  try {
    // Select all rows from the "Kitchens" table
    const query = "SELECT * FROM Kitchens";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching kitchens from the database:", error);
    res.status(500).json({ error: "Error fetching kitchens" });
  }
};

// Returns a single kitchen by their unique ID from Kitchens
const getKitchenByID = async (req, res) => {
  try {
    const kitchenID_recvd = req.params.kitchenID;
    const query = "SELECT * FROM Kitchens WHERE kitchenID = kitchenID_recvd";
    const [result] = await db.query(query, [kitchenID_recvd]);
    // Check if kitchen was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Kitchen not found" });
    }
    const kitchen_found = result[0];
    res.json(kitchen_found);
  } catch (error) {
    console.error("Error fetching kitchen from the database:", error);
    res.status(500).json({ error: "Error fetching kitchen" });
  }
};

// Returns status of creation of new kitchen in Kitchens
const createKitchen = async (req, res) => {
  try {
    const { kitchenLocation, capacity } = req.body;
    const query =
      "INSERT INTO Kitchens (kitchenLocation, capacity) VALUES (?, ?)";

    const response = await db.query(query, [
      kitchenLocation,
      capacity=== "" ? null : parseInt(capacity)
    ]);
    console.log("New kitchen created.");
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating kitchen:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating kitchen" });
  }
};


const updateKitchen = async (req, res) => {
  // Get the kitchen ID
  const kitchenID_recvd = req.params.kitchenID;
  console.log(`Received kitchenID: ${kitchenID_recvd}`);
  // Get the kitchen object
  const newKitchen = req.body;
  console.log(`newKitchen: ${JSON.stringify(newKitchen)}`);

  try {
    const [data] = await db.query("SELECT * FROM Kitchens WHERE kitchenID = ?", [
      kitchenID_recvd,
    ]);

    const oldKitchen = data[0];
    console.log(`oldKitchen: ${JSON.stringify(oldKitchen)}`);

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newKitchen, oldKitchen)) {
      const query =
        "UPDATE Kitchens SET kitchenLocation=?, capacity=? WHERE kitchenID= ?";

      // // Homeoworld is NULL-able FK in bsg_people, has to be valid INT FK ID or NULL
      // const duration = newClass.duration === "" ? null : parseInt(duration);

      const values = [
        newKitchen.kitchenLocation,
        newKitchen.capacity,
        kitchenID_recvd,
      ];
      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Kitchen updated successfully." });
    }

    res.json({ message: "Kitchen details are the same, no update" });
  } catch (error) {
    console.log("Error updating kitchen", error);
    res
      .status(500)
      .json({ error: `Error updating the kitchen with id ${kitchenID_recvd}` });
  }
};


// Endpoint to delete a kitchen from the database
const deleteKitchen = async (req, res) => {
  const kitchenID = req.params.kitchenID;
  console.log("Deleting kitchen with id:", kitchenID);
  

  try {
    // Ensure the kitchen exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM Kitchens WHERE kitchenID = ?",
      [kitchenID]
    );

    // If the kitchen doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Kitchen not found.");
    }

    // Delete related records from the Kitchens table
    await db.query("DELETE FROM Kitchens WHERE kitchenID = ?", [kitchenID]);

    // Return the appropriate status code
    res.json({ message: "Kitchen deleted successfully." })
  } catch (error) {
    console.error("Error deleting kitchen from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getKitchens,
  getKitchenByID,
  createKitchen,
  updateKitchen,
  deleteKitchen
};
