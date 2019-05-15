const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt')

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

// // Avoiding CORS errors
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

// Obtener los productos ( id_Producto, tipo, descripcion )
app.get('/products', (req, res) => {
  // Avoiding CORS errors
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // Vars for response
  var products = []
  var product

  // Query
  var sql = 'SELECT id_Producto, estado, tipo, descripcion FROM producto'

  db.query(sql, function (err, result, fields) {
    if (err) throw err
    // Fetching and formatting data
    for (var i = 0; i < result.length; i++) {
        product = { id: result[i].id_Producto, estado: result[i].estado, name: result[i].tipo, description: result[i].descripcion }
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

// Obtener las ventas ( id_Venta, Fecha, Total_Cajas, KGMS, Importe, producto.tipo )
app.get('/sales', (req, res) => {
  // Avoiding CORS errors
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  // Vars for response
  var sales = []
  var sale

  var query = `SELECT venta.id_venta, venta.Importe, venta.KGMS, venta.Total_Cajas, venta.Fecha, venta_producto.id_Producto, producto.tipo FROM venta_producto INNER JOIN producto INNER JOIN venta ON producto.id_Producto = venta_producto.id_Producto AND venta_producto.id_Venta = venta.id_Venta`
  db.query(query, function (err, result, fields) {
    if (err) throw err
    var ids = []
    for (var i = 0; i < result.length; i++) {
      if (ids.indexOf(result[i].id_venta) === -1) {
        sale = { id: result[i].id_venta, date: result[i].Fecha.toISOString(), boxes: result[i].Total_Cajas, kgms: result[i].KGMS, total: result[i].Importe, products: [] }
        sales.push(sale)
        ids.push(result[i].id_venta)
      }
    }

    for (var j = 0; j < sales.length; j++) {
      result.map((saleProd) => {
        if (saleProd.id_venta === sales[j].id) {
          sales[j].products.push(saleProd.tipo)
        }
      })
    }
    console.log(sales)
    res.json(sales)
  })
})

// Obtener la produccion ( id_Produccion, fecha, Total_Cajas, KGMS )
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
      product = { id: result[i].id_Produccion, date: result[i].fecha.toISOString(), 
        boxes: result[i].Total_Cajas, kgms: result[i].KGMS, productID: result[i].id_Producto }
      product.date = product.date.substring(0, 10)
      production.push(product)
    }
    res.json(production)
  })
})

// Agregar usuario ( Nombre_Completo, Correo, Contraseña, Tipo_Usuario )
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

// Agregar egreso ( Tipo, Costo, Fecha )
app.post('/expense', (req, res) => {
  let body = req.body
  var sql = `INSERT INTO Egresos (Tipo, Costo, Fecha)
          VALUES ('${body.type}',${body.cost},'${body.date}');`
  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('1 record inserted')
  })
  res.json({
    ok: true,
    body
  })
})

// Agregar venta ( Fecha, Total_Cajas, Importe, KGMS, ProductosIds )
app.post('/sale', (req, res) => {
  let body = req.body
  var sql = `INSERT INTO Venta(Fecha, Total_Cajas, Importe, KGMS)
    VALUES ('${body.date}', ${body.boxes}, ${body.total}, ${body.kgms});`

  var productsIds = body.products

  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('1 record inserted', result)
    productsIds.forEach((productId) => {
      var sqlProdSale = `INSERT INTO Venta_Producto(id_Venta, id_Producto) 
      VALUES (${result.insertId}, ${productId});`
      db.query(sqlProdSale, function (err, result) {
        if (err) throw err
        console.log('1 record inserted')
      })
    })
  })
  res.json({
    ok: true,
    body
  })
})

// Agregar producto ( tipo, descripcion )
app.post('/product', (req, res) => {
  let body = req.body
  var sql = `INSERT INTO Producto(estado, tipo, descripcion)
    VALUES (true, '${body.name}', '${body.description}');`
  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('1 record inserted')
  })
  res.json({
    ok: true,
    body
  })
})

// Agregar producción ( fecha, Total_Cajas, KGMS, id_Producto )
app.post('/production', (req, res) => {
  let body = req.body
  var sql = `INSERT INTO Produccion(fecha, Total_Cajas, KGMS, id_Producto)
    VALUES ('${body.date}', ${body.boxes}, ${body.kgms}, ${body.product});`
  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('1 record inserted')
  })
  res.json({
    ok: true,
    body
  })
})

// Actualizar usuario ( Nombre_Completo, Correo, Contraseña, Tipo_Usuario )
app.put('/user/:id', (req, res) => {
  let id = req.params.id
  let body = req.body

  var sql = `UPDATE Usuario
    SET Nombre_Completo = '${body.name}', Correo = '${body.email}', 
    Contraseña = '${bcrypt.hashSync(body.pass, 10)}', Tipo_Usuario = ${body.role}
    WHERE id = ${id};`

  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('1 record updated')
  })
  res.json({
    ok: true,
    body
  })
})

// Actualizar egreso ( Tipo, Costo, Fecha )
app.put('/expense/:id', (req, res) => {
  let id = req.params.id
  let body = req.body
  var sql = `UPDATE Egresos
    SET Tipo = '${body.type}', Costo = ${body.cost}, 
    Fecha = '${body.date}'
    WHERE id_Egreso = ${id};`

  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('1 record updated')
  })

  res.json({
    ok: true,
    body
  })
})

// Actualizar venta ( Fecha, Total_Cajas, Importe, KGMS )
app.put('/sale/:id', (req, res) => {
  let id = req.params.id
  let body = req.body

  var sql = `UPDATE Venta
    SET Total_Cajas = ${body.boxes}, Importe = ${body.total}, 
    KGMS = ${body.kgms}, Fecha = '${body.date}'
    WHERE id_Venta = ${id};`

  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('1 record updated')
  })

  res.json({
    ok: true,
    body
  })
})

// Actualizar produccion ( Total_Cajas, KGMS )
app.put('/production/:id', (req, res) => {
  let id = req.params.id
  let body = req.body

  var sql = `UPDATE Produccion
    SET Total_Cajas = ${body.boxes}, KGMS = ${body.kgms}
    WHERE id_Produccion = ${id};`

  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('1 record updated')
  })

  res.json({
    ok: true,
    body
  })
})

// Actualizar producto ( tipo, descripcion )
app.put('/product/:id', (req, res) => {
  let id = req.params.id
  let body = req.body

  var sql = `UPDATE Producto
    SET tipo = '${body.name}', descripcion = '${body.description}'
    WHERE id_Producto = ${id};`

  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('1 record updated')
  })

  res.json({
    ok: true,
    body
  })
})

// Eliminar producto
app.delete('/product/:id', (req, res) => {
  let id = req.params.id
/*
  var sql = `DELETE FROM Producto
  WHERE id_Producto = ${id};`
*/

  var sql = `UPDATE Producto
  SET estado = false
  WHERE id_Producto = ${id};`

  db.query(sql, (err, result) => {
    if (!err)
      console.log('1 record deleted')
    res.json({
      ok: !err,
      err
    })

  })

})

// Eliminar usuario
app.delete('/user/:id', (req, res) => {
  let id = req.params.id

  var sql = `DELETE FROM Usuario
    WHERE id = ${id};`

  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('1 record deleted')
  })

  res.json({
    ok: true
  })
})

// Eliminar producción
app.delete('/production/:id', (req, res) => {
  let id = req.params.id

  var sql = `DELETE FROM Produccion
    WHERE id_Produccion = ${id};`

  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('1 record deleted')
  })

  res.json({
    ok: true
  })
})

// Eliminar venta
app.delete('/sale/:id', (req, res) => {
  let id = req.params.id

  var sql = `DELETE FROM Venta_Producto
  WHERE id_Venta = ${id};`

  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('n records deleted')
  })

  sql = `DELETE FROM Venta
    WHERE id_Venta = ${id};`

  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('1 record deleted')
  })

  res.json({
    ok: true
  })
})


// Eliminar egreso
app.delete('/expense/:id', (req, res) => {
  let id = req.params.id

  sql = `DELETE FROM Egresos
    WHERE id_Egreso = ${id};`

  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('1 record deleted')
  })

  res.json({
    ok: true
  })
})


app.listen(process.env.PORT || '3000', () => {
  console.log('Server started on port 3000')
})
