DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  dep_name VARCHAR(30),
  -- PRIMARY KEY (id),
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  -- PRIMARY KEY (id),
  FOREIGN KEY department_id,
  REFERENCES department(id),
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT
  -- PRIMARY KEY (id),
  FOREIGN KEY role_id,
  REFERENCES role(id),
  ON DELETE SET NULL,
);

