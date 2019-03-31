const express = require('express')
const mysql = require('mysql')

// Configuration to connect to DB
var config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agrotech'
}

const db = mysql.createConnection(config)

// Connection to DB
db.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

const app = express()

// Obtener los usuarios ( id, Nombre_Completo, Correo, Tipo_Usuario)
app.get('/getUsers', (req, res) =>{
  // Avoiding CORS errors
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  // Vars for response
  var users = []
  var user

  // Query
  var sql = 'SELECT id,Nombre_Completo,Correo,Tipo_Usuario FROM usuario'

  db.query(sql, function (err, result, fields) {
    if (err) throw err
    // Fetching and formatting data
    for (var i = 0; i < result.length; i++) {
      user = { id: result[i].id, name: result[i].Nombre_Completo, email: result[i].Correo, role: result[i].Tipo_Usuario.readInt8() }
      if (user.role == 1){
        user.role = 'Admin'
      }
      else{
        user.role = 'User'
      }
      users.push(user)
    }
    // Returning answer
    res.json(users)
  })
})

app.listen(process.env.PORT || '3000', () => {
  console.log('Server started on port 3000')
})

