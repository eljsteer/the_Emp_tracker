const dbConnect = require("../db/connection");
const answers = require("../index");

class dbQuery {
  constructor (connect) {
    this.connection = connect;
  }

// Query function to SQL to view all Departments 
  viewDepartments() { 
    return dbConnect.promise().query(`SELECT department.id, department.dep_name AS Department FROM department`);
  };

// Query function to SQL to View all Job Roles
viewRoles() {
  return dbConnect.promise()
  .query(
  `SELECT role.id, title as Title, salary AS Salary, department.dep_name AS Department
  FROM role
  INNER JOIN department AS Department ON (role.department_id = department.id)`
  );
}

// Query function to SQL to view all Employees 
viewEmployees() {
  return dbConnect.promise()
  .query(`SELECT e.id, e.first_name AS FirstName, e.last_name AS LastName, r.title AS Title, d.dep_name AS Department, r.salary AS Salary, CONCAT(m.first_name, " ", m.last_name) AS Manager 
        FROM employee e
        LEFT JOIN role r
          ON e.role_id = r.id
        LEFT JOIN department d
        ON d.id = r.department_id
        LEFT JOIN employee m
          ON m.id = e.manager_id`);
}

// Query function to SQL to Add a Department
addDepartment(answers) {
  console.log(answers)
  const values = [answers[0].depName];
  return dbConnect.promise().query(`INSERT INTO department (dep_name) VALUES(?)`, values);
};

// Query function to SQL to add a New Job Role
  addJobRole(answers) {
    const values = [
      answers.title, 
      answers.salary, 
      answers.roleDep
    ];
      console.log(values)
    return dbConnect.promise()
    .query(`INSERT INTO role (title, salary, department_id) VALUES(?,?,?)`, 
    values
    );
  };

// Query function to SQL to add a New EMployee
  addEmployee(answers) {
      const values = [
        answers.firstName, 
        answers.lastName, 
        answers.empRole,
        answers.manager
      ];
      console.log(values)
      return dbConnect.promise()
      .query(`INSERT INTO employee(first_name , last_name , role_id , manager_id) VALUES(?,?,?,?)`, 
      values
      );
    };

// Query function to SQL to Update an Employee
  updateEmployeeRole(answers) {
    const values = [
      answers.updEmpRole
    ];
    return db
    .query(`UPDATE employee (role_id) VALUES (?)`, 
    values
    );
  };

  // Function to retrieve all Managers
  viewManagers() {
    return dbConnect.promise()
    .query(
    `SELECT employee.id, CONCAT (employee.first_name," ",employee.last_name) AS ManagerName FROM employee WHERE manager_id IS NULL`
    );
};


};


module.exports = new dbQuery(dbConnect);
