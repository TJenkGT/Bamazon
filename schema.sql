DROP DATABASE IF EXISTS bamazon;

DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR (50) NOT NULL,
  department_name VARCHAR (30) NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
  
);

SELECT * FROM products

