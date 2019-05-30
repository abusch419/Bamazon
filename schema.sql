DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE Product (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR (100) NOT NULL,
    department VARCHAR (150) NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL,
    imgUrl VARCHAR(150) NOT NULL,
    PRIMARY KEY (id)
)


INSERT INTO Product (name, department, price, stock, imgUrl) VALUES ("Pearl 5-Piece Complete Drum Set", "Drums" , 299, 7, "../images/pearl5piece.jpg");
INSERT INTO Product (name, department, price, stock, imgUrl) VALUES ("Gretsch Maple Snare Drum", "Drums" , 299, 3, "../images/maplesnaredrum.jpg");
INSERT INTO Product (name, department, price, stock, imgUrl) VALUES ("Mark 14 Bass Amp", "Amps", 649, 8, "../images/markamp.jpg");
INSERT INTO Product (name, department, price, stock, imgUrl) VALUES ("Yamaha 6 String Bass Guitar", "Basses", 549, 12, "../images/6stringbass.jpg");
INSERT INTO Product (name, department, price, stock, imgUrl) VALUES ("Fender 6 String Stratocaster", "Guitars", 499, 20, "../images/strat.jpg");
INSERT INTO Product (name, department, price, stock, imgUrl) VALUES ("Fender DeVille Guitar Amp", "Amps", 399, 40, "../images/deville.jpg");
INSERT INTO Product (name, department, price, stock, imgUrl) VALUES ("Logic Pro X", "Software", 499, 0, "../images/logicprox.png");
INSERT INTO Product (name, department, price, stock, imgUrl) VALUES ("Pro Tools 12.8.3", "Software", 499, 2, "../images/protools.jpg");
INSERT INTO Product (name, department, price, stock, imgUrl) VALUES ("12 Pack VicFirth Drum Sticks", "Drum Accessories", 39, 3, "../images/12pack.jpg");
INSERT INTO Product (name, department, price, stock, imgUrl) VALUES ("Les Paul Custom 6 String Guitar", "Guitars", 1299, 3, "../images/lespaul.jpg");
