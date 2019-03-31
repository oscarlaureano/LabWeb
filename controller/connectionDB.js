var mysql = require('mysql');
var db = 'agrotech'

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: db
});

// DEBUG CONNECTION MESAGE
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

module.exports = con;

