const dbConnect = require("../db/connection");
const data = require("../index");

class dbQuery {
  constructor (connect) {
    this.connection = connect;
  }

  // Function to view all Employees 
  viewDepartments() { 
    return dbConnect.promise().query(`SELECT * FROM department`);
  };

  addDepartment(answers) {
      const values = [answers.depName];
      return db
      .query(`INSERT INTO department (dep_name) VALUES(?)`,
          values
        );
  };

// Function to view all Employees 
  viewEmployees() {
    return db.query("SELECT * FROM employee");
  }

  addEmployee(answers) {
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
    }

  updateEmployeeRole(answers) {
    const values = [
      answers.updEmpRole
    ];
    return db
    .query(`UPDATE employee (role_id) VALUES (?)`, 
    values
    );
  }

// Function to view all Employees 
  viewRoles() {
    return db.query("SELECT * FROM role")
  }
  
  addJobRole(answers) {
    const values = [answers.title, answers.salary, answers.roleDep];
    return db
    .query(`INSERT INTO role (title, salary, department_id) VALUES(?)`, 
    values
    );
  }
};


module.exports = new dbQuery(dbConnect);
