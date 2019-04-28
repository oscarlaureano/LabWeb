CREATE DATABASE agrotech;

CREATE TABLE Egresos (
    id_Egreso int NOT NULL AUTO_INCREMENT,
    Tipo varchar(255),
    Costo float,
    Fecha date,
    PRIMARY KEY (id_Egreso)
);

CREATE TABLE Sensores (
    id_Sensor int NOT NULL AUTO_INCREMENT,
    Calidad_Tierra varchar(255),
    Timestamp_ datetime,
    Temperatura float,
    Humedad float,
    Tipo_Cultivo varchar(255),
    Area_Cultivo varchar(255),
    PRIMARY KEY (id_Sensor)
);

CREATE TABLE Usuario (
    id int NOT NULL AUTO_INCREMENT,
    Nombre_Completo varchar(255),
    Correo varchar(255),
    Contraseña varchar(255),
    Tipo_Usuario bit,
    PRIMARY KEY (id)
);

CREATE TABLE Producto (
    id_Producto int NOT NULL AUTO_INCREMENT,
    tipo varchar(255),
    descripcion varchar(255),
    PRIMARY KEY (id_Producto)
);

CREATE TABLE Venta (
	id_Venta int NOT NULL AUTO_INCREMENT,
	Fecha date,
	Total_Cajas float,
	Importe float,
	KGMS float,
	PRIMARY KEY (id_Venta)
);

CREATE TABLE Produccion (
    id_Produccion int NOT NULL AUTO_INCREMENT,
    fecha Date,
    Total_Cajas float,
    KGMS float,
    id_Producto int,
    PRIMARY KEY (id_Produccion),
    FOREIGN KEY (id_Producto) REFERENCES Producto(id_Producto)
);

CREATE TABLE Venta_Producto (
	id_Venta int,
	id_Producto int,
	PRIMARY KEY (id_Venta, id_Producto),
	FOREIGN KEY (id_Venta) REFERENCES Venta(id_Venta),
	FOREIGN KEY (id_Producto) REFERENCES Producto(id_Producto)
);