const mysql = require('mysql2')

 

const connection  = mysql.createConnection({
host: 'localhost',
database: 'mytestdb2',
user: 'myuser2',
password: 'mypass2'
})


function getAllPersons(){

    return new Promise(function(resolve,reject){
     connection.query(
         `SELECT * FROM persons`,
         function(err,rows,cols){
             if(err)
             reject(err)
             else {
                 resolve(rows)
             }
         })
    })
}

function addNewPerson(name,ate,thick,material,time,job){
    return new Promise (function(resolve,reject){
        connection.query(
            `INSERT INTO persons (name,ate,thick,material,time,job) VALUES (?,?,?,?,?,?)`,
            [name,ate,thick,material,time,job],
            function(err, results){
                if(err){
                    reject(err)
                } else { 
                    resolve()
                }

            }
        )
    })
}


exports = module.exports = {
    getAllPersons,
    addNewPerson
}