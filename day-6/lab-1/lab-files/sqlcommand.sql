CREATE DATABASE ecommerce7;
USE ecommerce7;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product VARCHAR(255),
  quantity INT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE USER 'ecommerce7user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON ecommerce7.* TO 'ecommerce7user'@'localhost';
FLUSH PRIVILEGES;
EXIT;