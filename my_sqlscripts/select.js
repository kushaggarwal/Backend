const mysql = require('mysql2')

 

const connection  = mysql.createConnection({
host: 'localhost',
database: 'mytestdb2',
user: 'myuser2',
password: 'mypass2'
})


connection.query(
    `SELECT * FROM persons`,
    function(err, results,feilds){
        if(err){
            console.error(err)
        } else {
            console.log(results)
                console.log(feilds)
        }
        connection.close();
    }
    )