import express from "express";
const app = express.Router();


// -----------------------view data------------------
// Importing studentController with a view named export
import { view } from "../controllers/studentConnections.js";
// Setting up the route to view all
app.get("/", view);



//--------------------------addData----------------------
// Importing studentController with a addUser named export
import { addUser } from "../controllers/studentConnections.js";
// Setting up the route  to view addUser/Student page
app.get("/adduser", addUser);

// Importing studentController with a addUserSubmit named export
import { addUserSubmit } from "../controllers/studentConnections.js";
// Setting up the route for adding new data
app.post("/adduser", addUserSubmit);



//------------------------editData--------------------------
// Importing studentController with a edituser named export
import { edituser } from "../controllers/studentConnections.js";
// Setting up the routeto edit user
app.get("/edituser/:id", edituser);

// Importing studentController with a  editUserSubmit named export
import { editUserSubmit } from "../controllers/studentConnections.js";
// Setting up the route to set the edited content in the database
app.post("/edituser/:id", editUserSubmit);

// Importing studentController with a resultTemplate named export
import { resultTemplate } from "../controllers/studentConnections.js";
// Setting up the route to view update is success
app.get("/resultTemplate", resultTemplate);



//--------------------------DeleteData------------------------
// Importing studentController with a deleteuser named export
import { deleteuser } from "../controllers/studentConnections.js";
// Setting up the route to delete data
app.get("/deleteuser/:id", deleteuser);



//-------------------------truncate Data-------------------------
// Importing studentController with a truncate named export
import { truncate } from "../controllers/studentConnections.js";
// Setting up the route to reset database
app.get("/truncate", truncate);


export default app;
