DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

SELECT DATABASE();

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  dep_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id) REFERENCES employee(id) 
  FOREIGN KEY (role_id) 
  REFERENCES role(id)
  ON DELETE SET NULL
);

