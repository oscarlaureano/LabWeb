INSERT INTO Egresos (Tipo, Costo, Fecha)
VALUES ('Agua',2506.75,'2019-03-09');

INSERT INTO Egresos (Tipo, Costo, Fecha)
VALUES ('Tierra',866.70,'2019-03-08');

INSERT INTO Egresos (Tipo, Costo, Fecha)
VALUES ('Semillas',900.60,'2019-03-07');

INSERT INTO Usuario(Nombre_Completo, Correo, Contraseña, Tipo_Usuario)
VALUES ('Valentin Huerta','vale@gmail.com','pass',0);

INSERT INTO Usuario(Nombre_Completo, Correo, Contraseña, Tipo_Usuario)
VALUES ('Oscar Laureano','laureano@gmail.com','pass',1);

INSERT INTO Usuario(Nombre_Completo, Correo, Contraseña, Tipo_Usuario)
VALUES ('Omar Flores','omar@gmail.com','pass',0);

INSERT INTO Usuario(Nombre_Completo, Correo, Contraseña, Tipo_Usuario)
VALUES ('Ángel Figueroa','angulz@gmail.com','pass',0);

INSERT INTO Sensores(Calidad_Tierra, Timestamp_, Temperatura, Humedad, Tipo_Cultivo, Area_Cultivo)
VALUES ('Buena','2019-03-09 10:34:09', 24.5, 0.61, 'Pimiento', 'A4');

INSERT INTO Sensores(Calidad_Tierra, Timestamp_, Temperatura, Humedad, Tipo_Cultivo, Area_Cultivo)
VALUES ('Buena','2019-03-09 10:35:09', 24.6, 0.605, 'Pimiento', 'A4');

INSERT INTO Sensores(Calidad_Tierra, Timestamp_, Temperatura, Humedad, Tipo_Cultivo, Area_Cultivo)
VALUES ('Buena','2019-03-09 10:36:09', 24.4, 0.62, 'Pimiento', 'A4');

INSERT INTO Sensores(Calidad_Tierra, Timestamp_, Temperatura, Humedad, Tipo_Cultivo, Area_Cultivo)
VALUES ('Buena','2019-03-09 10:37:09', 24.5, 0.609, 'Pimiento', 'A4');

INSERT INTO Venta(Fecha, Total_Cajas, Importe, KGMS)
VALUES ('2019-03-10', 200, 4000, 30);

INSERT INTO Venta(Fecha, Total_Cajas, Importe, KGMS)
VALUES ('2019-03-11', 100, 5000, 33);

INSERT INTO Venta(Fecha, Total_Cajas, Importe, KGMS)
VALUES ('2019-03-12', 800, 3200, 45);

INSERT INTO Venta(Fecha, Total_Cajas, Importe, KGMS)
VALUES ('2019-03-13', 400, 8500, 22);

INSERT INTO Producto(tipo, descripcion)
VALUES ('Brocoli', 'Brocoli comun');

INSERT INTO Producto(tipo, descripcion)
VALUES ('Lechuga', 'Lechuga romana nativa de aguascalientes');

INSERT INTO Producto(tipo, descripcion)
VALUES ('Tomate', 'Tomate saladette híbrido');

INSERT INTO Venta_Producto(id_Venta, id_Producto)
VALUES (1,1);

INSERT INTO Venta_Producto(id_Venta, id_Producto)
VALUES (2,1);

INSERT INTO Venta_Producto(id_Venta, id_Producto)
VALUES (3,2);

INSERT INTO Venta_Producto(id_Venta, id_Producto)
VALUES (4,3);

INSERT INTO Produccion(fecha, Total_Cajas, KGMS, id_Producto)
VALUES ('2019-03-09', 500, 200, 1);

INSERT INTO Produccion(fecha, Total_Cajas, KGMS, id_Producto)
VALUES ('2018-10-03', 400, 150, 1);

INSERT INTO Produccion(fecha, Total_Cajas, KGMS, id_Producto)
VALUES ('2019-03-09', 300, 100, 2);

INSERT INTO Produccion(fecha, Total_Cajas, KGMS, id_Producto)
VALUES ('2019-03-09', 450, 150, 3);