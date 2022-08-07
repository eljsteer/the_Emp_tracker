// const util = require("util");
// const db = (dbConnect);
const db = (require("../db/connection"));
const data = require("../index");

class Employee {
// Function to view all Employees 
  viewEmployees() {
    return this.db
    .query("SELECT * FROM employee");
  };

  addEmployee(answers) {
      const values = [
        answers.first_name, 
        answers.last_name, 
        answers.empRole,
        answers.manager
      ];
      return this.db
      .query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?)`, 
      values
      );
    };

  updateEmployeeRole(answers) {
    const values = [
      answers.updEmpRole
    ];
    return this.db
    .query(`UPDATE employee (role_id) VALUES (?)`, 
    values
    );
  };
};

class Role {
// Function to view all Employees 
  viewRoles() {
    return this.db
    .query("SELECT * FROM role")
  };

  addJobRole(answers) {
    const values = [answers.title, answers.salary, answers.roleDep];
    return this.db
    .query(`INSERT INTO role (title, salary, department_id) VALUES(?)`, 
    values
    );
  };
};

class Department {
// Function to view all Employees 
viewDepartments() {
    return this.db
      .query(
        `SELECT * FROM department`,
      );
}
addDepartment(answers) {
    const values = [answers.depName];
    return this.db
      .query(
        `INSERT INTO department (dep_name) VALUES(?)`,
        values
      );
}
};


module.exports = { Employee, Role, Department }
