/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8500;

// Middleware:

// If on FLIP, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173 
// EX (FLIP/classwork) http://flip3.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// API Routes for backend CRUD:
const classesRouter = require("./routes/classesRoutes"); 
app.use("/api/classes", classesRouter);

const kitchensRouter = require("./routes/kitchensRoutes");
app.use("/api/kitchens", kitchensRouter);

const instructorsRouter = require("./routes/instructorsRoutes");
app.use("/api/instructors", instructorsRouter);

const specialtiesRouter = require("./routes/specialtiesRoutes");
app.use("/api/specialties", specialtiesRouter);


// Add your Connect DB Activitiy Code Below:
// ...

// ...
// End Connect DB Activity Code.


const os = require("os");
const hostname = os.hostname();

app.listen(PORT, () => {
  // flip server should automatically match whatever server you're on 
  console.log(`Server running:  http://${hostname}:${PORT}...`);
});
