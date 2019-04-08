const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt');

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

// To parse incoming request bodies in a middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Avoiding CORS errors
var cors = require('cors')
app.use(cors())

// Obtener los usuarios ( id, Nombre_Completo, Correo, Tipo_Usuario )
app.get('/users', (req, res) => {
  // Avoiding CORS errors
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  // Vars for response
  var users = []
  var user

  // Query
  var sql = 'SELECT id, Nombre_Completo, Correo, Tipo_Usuario FROM usuario'

  db.query(sql, function (err, result, fields) {
    if (err) throw err
    // Fetching and formatting data
    for (var i = 0; i < result.length; i++) {
      user = { id: result[i].id, name: result[i].Nombre_Completo, email: result[i].Correo, role: result[i].Tipo_Usuario.readInt8() }
      if (user.role === 1) {
        user.role = 'Admin'
      } else {
        user.role = 'User'
      }
      users.push(user)
    }
    // Returning answer
    res.json(users)
  })
})

// Obtener los productos ( id_Producto, tipo )
app.get('/products', (req, res) => {
  // Avoiding CORS errors
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  // Vars for response
  var products = []
  var product

  // Query
  var sql = 'SELECT id_Producto, tipo FROM producto'

  db.query(sql, function (err, result, fields) {
    if (err) throw err
    // Fetching and formatting data
    for (var i = 0; i < result.length; i++) {
      product = { id: result[i].id_Producto, name: result[i].tipo }
      products.push(product)
    }
    // Returning answer
    res.json(products)
  })
})

// Obtener los egresos ( id_Egreso, Tipo, Costo, Fecha )
app.get('/expenses', (req, res) => {
  // Avoiding CORS errors
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  // Vars for response
  var expenses = []
  var expense

  // Query
  var sql = 'SELECT id_Egreso, Tipo, Costo, Fecha FROM egresos'

  db.query(sql, function (err, result, fields) {
    if (err) throw err
    // Fetching and formatting data
    for (var i = 0; i < result.length; i++) {
      expense = { id: result[i].id_Egreso, type: result[i].Tipo, cost: result[i].Costo, date: result[i].Fecha.toISOString() }
      expense.date = expense.date.substring(0, 10)
      expenses.push(expense)
    }
    res.json(expenses)
  })
})

// Obtener las ventas ( id_Venta, Fecha, Total_Cajas, KGMS, Importe, producto.tipo)
app.get('/sales', (req, res) => {
  // Avoiding CORS errors
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  // Vars for response
  var sales = []
  var sale

  // Query
  var sql = 'SELECT v.id_Venta, v.Fecha, v.Total_Cajas, v.KGMS, v.Importe, p.tipo FROM venta v INNER JOIN venta_producto e on v.id_Venta = e.id_Venta INNER JOIN producto p on e. id_Producto = p.id_Producto'
  db.query(sql, function (err, result, fields) {
    if (err) throw err
    // Fetching and formatting data
    for (var i = 0; i < result.length; i++) {
      sale = { id: result[i].id_Venta, date: result[i].Fecha.toISOString(), boxes: result[i].Total_Cajas, kgms: result[i].KGMS, total: result[i].Importe, product: result[i].tipo }
      sale.date = sale.date.substring(0, 10)
      sales.push(sale)
    }
    res.json(sales)
  })
})

// Obtener la produccion ( id_Produccion, fecha, Total_Cajas, KGMS)
app.get('/production', (req, res) => {
  // Avoiding CORS errors
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // Vars for response
  var production = []
  var product

  // Query
  var sql = 'SELECT id_Produccion, fecha, Total_Cajas, KGMS, id_Producto FROM produccion'

  db.query(sql, function (err, result, fields) {
    if (err) throw err
    // Fetching and formatting data
    for (var i = 0; i < result.length; i++) {
      product = { id: result[i].id_Produccion, date: result[i].fecha.toISOString(), boxes: result[i].Total_Cajas, kgms: result[i].KGMS, productID: result[i].id_Producto }
      product.date = product.date.substring(0, 10)
      production.push(product)
    }
    res.json(production)
  })
})

// Agregar usuario ( Nombre_Completo, Correo, Tipo_Usuario)
app.post('/user', (req, res) => {
  let body = req.body
  var sql = `INSERT INTO Usuario(Nombre_Completo, Correo, Contraseña, Tipo_Usuario)
    VALUES ('${body.name}', '${body.email}', '${bcrypt.hashSync(body.pass, 10)}', ${body.role});`
  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('1 record inserted')
  })
  res.json({
    ok: true,
    body
  })
})

app.listen(process.env.PORT || '3000', () => {
  console.log('Server started on port 3000')
})
