import express from "express";
import bodyparser from "body-parser";
import {} from 'dotenv/config';

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static("public"));

// ==============Routes==============
import routes from "./server/routes/students.js";
app.use("/",routes);

// ====================Listen Port========================
app.listen(port,()=>{
    console.log(`The app is listening at ${port}.`);
})