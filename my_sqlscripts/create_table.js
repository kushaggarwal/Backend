
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  database: 'mytestdb2',
  user: 'myuser2',
  password: 'mypass2'
});
 
// simple query
connection.query(
    `CREATE TABLE IF NOT EXISTS persons (
        name VARCHAR(50),
      ate VARCHAR(50),
      thick FLOAT(10,3),
      material VARCHAR(10),
      time VARCHAR(50),
      job VARCHAR(50)
    )`,
    function(err,results) {
        if (err){
            console.error(err)
        } else {
            console.log("Table created successfully")
        }
       connection.close();
    }
)
 
