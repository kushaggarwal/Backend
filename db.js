const mysql = require("mysql2");

// const connection  = mysql.createConnection({
// host: 'localhost',
// database: 'mytestdb2',
// user: 'myuser2',
// password: 'mypass2'
// })
const connection = mysql.createConnection(
  "postgres://jcuvtyqplhxxdu:b0bd587b74ec20c1c95b78b92d0b0f2ebe0a5bcd76c267d469496ee4b606cced@ec2-50-17-90-177.compute-1.amazonaws.com:5432/d32iu12fg6gggj"
);

function getAllPersons() {
  return new Promise(function (resolve, reject) {
    connection.query(`SELECT * FROM persons`, function (err, rows, cols) {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });
}

function addNewPerson(name, ate, thick, material, time, job) {
  return new Promise(function (resolve, reject) {
    connection.query(
      `INSERT INTO persons (name,ate,thick,material,time,job) VALUES (?,?,?,?,?,?)`,
      [name, ate, thick, material, time, job],
      function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

exports = module.exports = {
  getAllPersons,
  addNewPerson,
};
