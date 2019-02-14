const mysql = require('mysql2')

 const insert = {
     name : process.argv[2],
     ate : process.argv[3],
     thick: parseInt(process.argv[4]),
     material: process.argv[5],
     time: process.argv[6],
     job: process.argv[7]
 }

const connection  = mysql.createConnection({
host: 'localhost',
database: 'mytestdb2',
user: 'myuser2',
password: 'mypass2'
})


connection.query(
    `INSERT INTO persons (name,ate,thick,material,time,job ) VALUES(
        '${insert.name}',
        '${insert.ate}',
        ${insert.thick},
        '${insert.material}',
        '${insert.time}',
        '${insert.job}'


    )`,
    function(err, results){
        if(err){
            console.error(err)
        } else {
            console.log(results)
                console.log("Inserted Successfully")
        }
        connection.close();
    }
    )