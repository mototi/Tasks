CREATE DATABASE ecom; 
USE ecom;

CREATE TABLE customer (
    id INT AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE products(
    id INT AUTO_INCREMENT,
    price INT NOT NULL,
    discription VARCHAR(255) ,
    PRIMARY KEY (id)
); 

CREATE TABLE orders (
    id INT AUTO_INCREMENT,
    date DATE NOT NULL,
    cutomerId INT NOT NULL UNIQUE,
    PRIMARY KEY (id)
    FOREIGN KEY (cutomerId) REFERENCES customer(id)
);

CREATE TABLE provider (
    id INT AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE deliverdOroders (
    id INT AUTO_INCREMENT,
    date DATE NOT NULL,
    rating INT,
    oerderId INT NOT NULL UNIQUE,
    PRIMARY KEY (id),
    FOREIGN KEY (oerderId) REFERENCES orders(id)
);
--
--many to many relationship between orders and products
--
CREATE TABLE purshasedProducts (
    productsId INT NOT NULL,
    ordersId INT NOT NULL,
    PRIMARY KEY (productsId, ordersId),
    FOREIGN KEY (productsId) REFERENCES products(id),
    FOREIGN KEY (ordersId) REFERENCES orders(id)
);
--
--many to many relationship between provider and products
--
CREATE TABLE providedProducts (
    productsId INT NOT NULL,
    providerId INT NOT NULL,
    PRIMARY KEY (productsId, providerId),
    FOREIGN KEY (productsId) REFERENCES products(id),
    FOREIGN KEY (providerId) REFERENCES provider(id)
);

