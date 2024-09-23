import mysql from "mysql2";

var con = mysql.createPool({
    connectionLimit:10,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  });
 



//--------------------------ViewData--------------------------

export const view = (req, res) => {
    con.getConnection((err, connection) => {  // Get a connection from DB
        if (err) {
            console.log("Error connection from pool: " + err);
            return res.status(500).send("DB connection error");
        }
        console.log("Connected database!");

        connection.query("SELECT * FROM students", (err, rows) => {
            // release the connection
            connection.release();
            if (!err) {
               res.render("index.ejs", { rows });
            } else {
                console.log("Error executing query: " + err);
            }
        });
    });
};



//-------------------------------------Add Data-----------------------------

export const addUser = (req,res)=>{
    res.render("addUser.ejs");
};

export const addUserSubmit = (req, res) => {
    const { Name, Age, City } = req.body;
    con.query("INSERT INTO students (NAME, AGE, CITY) VALUES (?,?,?)", [Name, Age, City], (err,data) => {
        if (!err) {
            res.redirect("/");
        } else {
            res.send("<h3>Enter all details in a proper format.Click <a href='/'>HERE</a> to try again.</h3>")
        }
    });
};



//---------------------------------Edit Data---------------------------------------

export const edituser = (req,res)=>{
    con.getConnection((err, connection) => {  // Get a connection from DB
        if (err) {
            console.log("Error connecting pool: " + err);
        }
        console.log("Connected database while edituser!");
        let id = req.params.id;
        //console.log(id)  //Check ID is targeted
        connection.query("select* from students where id=?",[id], (err, rows) => {
            // Always release the connection 
            connection.release();
            if (!err) {
                res.render("edituser.ejs", { rows });
            } else {
                console.log("Error executing query: " + err);
            }
        });
    });
};

export const editUserSubmit = (req,res)=>{
    con.getConnection((err, connection) => {  // Get a connection from the pool
        if (err) {
            console.log("Error connection from pool: " + err);
        }
        console.log("Connected database!");
    const { Name, Age, City } = req.body;
    let id = req.params.id;
    connection.query("UPDATE students set Name=?, Age=?, City=? WHERE id=?", [Name, Age, City,id], (err,rows) => {
        connection.release();
        if (!err) {
            res.render("resultTemplates.ejs")
        } else {
            console.log("Error: " + err);
        }
    });

});
};



//------------------------Delete data----------------------------------

export const deleteuser = (req, res) => {
    con.getConnection((err, connection) => {  // Get connected with DB
        if (err) {
            console.log("Error connection from pool: " + err);
            
        }
        console.log("Connected database!");
        let id = req.params.id;
        //console.log(id)  //Check ID is targeted
        connection.query("delete from students where id=?",[id], (err, rows) => {
            // Always release the connection
            connection.release();
            if (!err) {
                res.redirect("/")
            } else {
                console.log("Error executing query: " + err);
            }
        });
    });
};

export const resultTemplate = (req,res) =>{
    res.render("resultTemplate.ejs")
}



//---------------------------truncate Data--------------------------------

export const truncate = (req,res)=>{
    con.getConnection((err, connection) => {  // Get a connection from the pool
        if (err) {
            console.log("Error connection from pool: " + err);
            return res.status(500).send("DB connection error");
        }
        console.log("Connected database!");

        connection.query("truncate students", (err, rows) => {
            // Always release the connection 
            connection.release();
            if (!err) {
               res.redirect("/");
            } else {
                console.log("Error executing query: " + err);
            }
        });
    });

}