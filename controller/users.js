var db = require('./connectionDB')
// SELECCIONANDO INFORMACION DE USUARIOS
var promise = new Promise(function(resolve,reject){
  var users = []
  db.connect(function (err) {
    if (err) throw err
    db.query("SELECT id,Nombre_Completo,Correo,Tipo_Usuario FROM usuario", function (err, result, fields) {
      if (err) throw err
      for(i = 0; i < result.length; i++){
        user = {id: result[i].id, name: result[i].Nombre_Completo, email: result[i].Correo, role: result[i].Tipo_Usuario.toString()}
        users.push(user)
      }
      resolve(users)
    });
  });
})
module.exports = promise



