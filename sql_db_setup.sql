CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
	product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(20), 
    price INT NOT NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO products
	(product_name, department_name, price, stock_quantity)
VALUES 
	('Arsenal FC Jersey','Football',120,52),
    ('Everton FC Jersey','Football',80,32),
    ('FC Barcelona Jersey','Football',100,4),
    ('Real Madrid Jersey','Football',100,6),
    ('Paris Saint Germain Jersey','Football',90,76),
    ('Toronto FC Jersey','Football',119,123),
    ('Raptors Jersey','Basketball',60,32),
    ('Celtics Jersey','Basketball',55,45),
    ('Golden State Warriors Jersey','Basketball',58,12),
    ('Blue Jays Jersey','Baseball',75,54),
    ('Mets Jersey','Baseball',70,19),
    ('Red Socks Jersey','Baseball',10,90),
    ('Yankees Jersey','Baseball',70,22);