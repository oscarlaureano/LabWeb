# agrotech

## Setup general
Para poder correr tanto la Webapp como el Backend, se necesita una computadora con casi cualquier sistema operativo (Windows, Linux, MacOS funcionan).

### Software necesitado
Instalar los siguientes paquetes de software, en este caso se utiliza Windows 10 como SO.

1. [NodeJS](https://nodejs.org/dist/v10.15.3/node-v10.15.3-x64.msi)
2. Abrir una terminal y ejecutar el siguiente comando: `npm install vue`
3. Instalar [XAMPP](https://www.apachefriends.org/xampp-files/7.3.5/xampp-windows-x64-7.3.5-1-VC15-installer.exe) o un servicio con phpmyadmin.

### Setup Webapp
1. Clonar este proyecto por medio del comando: `git clone https://github.com/OscarLaureanoXX/LabWeb`
2. Ir al directorio y ejecutar el comando: `npm install`
3. Ir al directorio `/src` y abrir main.js, modificar la linea 10 `Vue.http.options.root = 'http://52.191.252.19:3000/'` , para que en vez de ser la anterior, sea localhost: `Vue.http.options.root = 'http://localhost:3000/'`
4. Ejecutar el comando: `npm run serve`

### Setup Backend
1. Ejecutar XAMPP.
2. Entrar a localhost/phpmyadmin
3. Ir al directorio del proyecto /database y correr el archivo createDB.sql en el portal de phpmyadmin
4. Correr el archivo addRowsDB.sql en el portal de phpmyadmin
5. Abrir una terminal, ir al directorio /controller y ejecutar el comando `node connectionDB.js`

### Setup Producción
Si se quiere hacer build al proyecto (webapp) para exportarlo a un servicio de hosting:
1. Abrir una terminal, ir al directorio del proyecto y ejecutar el comando `npm run build`
2. En la ruta `/labweb/dist` se generaron los archivos necesarios, arrastrar todos al directorio del FTP de su eleccion.
