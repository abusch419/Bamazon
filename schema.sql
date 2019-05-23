DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE Product (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR (100) NOT NULL,
    department VARCHAR (150) NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL,
    PRIMARY KEY (id)
)


INSERT INTO Product (name, department, price, stock) VALUES ("Pearl 5-Piece Complete Drum Set", "Drums" , 299, 7);
INSERT INTO Product (name, department, price, stock) VALUES ("Gretsch Maple Snare Drum", "Drums" , 299, 3);
INSERT INTO Product (name, department, price, stock) VALUES ("Mark 14 Bass Amp", "Amps", 649, 8);
INSERT INTO Product (name, department, price, stock) VALUES ("Yamaha 6 String Bass Guitar", "Basses", 549, 12);
INSERT INTO Product (name, department, price, stock) VALUES ("Fender 6 String Stratocaster", "Guitars", 499, 20);
INSERT INTO Product (name, department, price, stock) VALUES ("Fender DeVille Guitar Amp", "Amps", 399, 40);
INSERT INTO Product (name, department, price, stock) VALUES ("Logic Pro X", "Software", 499, 0);
INSERT INTO Product (name, department, price, stock) VALUES ("Pro Tools 12.8.3", "Software", 499, 2);
INSERT INTO Product (name, department, price, stock) VALUES ("12 Pack VicFirth Drum Sticks", "Drum Accessories", 39, 3);
INSERT INTO Product (name, department, price, stock) VALUES ("Les Paul Custom 6 String Guitar", "Guitars", 1299, 3);
