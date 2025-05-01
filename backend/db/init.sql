CREATE DATABASE IF NOT EXISTS apollo;
USE apollo;

CREATE TABLE doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  gender VARCHAR(10),
  specialization VARCHAR(100),
  experience INT,
  location VARCHAR(100),
  image_url VARCHAR(255),
  fees INT,
  language VARCHAR(50)
);
