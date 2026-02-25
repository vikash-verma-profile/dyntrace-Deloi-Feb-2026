CREATE DATABASE ecommerce8;
USE ecommerce8;

CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255));
INSERT INTO users (username, password) VALUES ('admin', 'password123');
CREATE USER 'ecommerce8user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON ecommerce8.* TO 'ecommerce8user'@'localhost';
FLUSH PRIVILEGES;
EXIT;