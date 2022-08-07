// const util = require("util");
// const db = (dbConnect);
const db = require("../db/connection");
const data = require("../index");

const Department = {
  // Function to view all Employees 
  viewDepartments: () => {
    db.query(`SELECT * FROM department`, function(err,values) {
      console.log(values);
      if (err) {
        console.log(err)
      }
      return values;
    });

  },
  addDepartment: (answers) => {
      const values = [answers.depName];
      return db
      .query(`INSERT INTO department (dep_name) VALUES(?)`,
          values
        );
  },
  };

const Employee = {
// Function to view all Employees 
  viewEmployees: () => {
    return db.query("SELECT * FROM employee");
  },

  addEmployee: (answers) => {
      const values = [
        answers.first_name, 
        answers.last_name, 
        answers.empRole,
        answers.manager
      ];
      return db
      .query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?)`, 
      values
      );
    },

  updateEmployeeRole: (answers) => {
    const values = [
      answers.updEmpRole
    ];
    return db
    .query(`UPDATE employee (role_id) VALUES (?)`, 
    values
    );
  },
};

const Role = {
// Function to view all Employees 
  viewRoles: () => {
    return db.query("SELECT * FROM role")
  },
  addJobRole: (answers) => {
    const values = [answers.title, answers.salary, answers.roleDep];
    return db
    .query(`INSERT INTO role (title, salary, department_id) VALUES(?)`, 
    values
    );
  },
};


module.exports = { Employee, Role, Department }
