DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

SELECT DATABASE();

DROP TABLE IF EXISTS department;
CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  dep_name VARCHAR(30),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  
  FOREIGN KEY (department_id)
  REFERENCES department(id) ON DELETE SET NULL
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
  FOREIGN KEY (role_id) REFERENCES role(id)
);