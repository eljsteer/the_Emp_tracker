const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');
const Employee = require("./lib/organisation");
const Role = require("./lib/organisation");
const Department = require("./lib/organisation");

function validateInput(data) {
  if(data != "") {
    return true;
  } else {
    return "Please enter a response to the query"
  }
};

function mainMenu() {
  return inquirer.prompt([
    {
      type: "list",
      name: "mainMenu",
      message: "What Action Would You Like To Take?", 
      choices: [
      "View All Employees", 
      "Add Employee", 
      "Update Employee Role",
      "View All Roles",
      "Add Job Role",
      "View All Departments",
      "Add Department",
      "Update Manager",
      "View Employees by Filter"
      ],
      validate: validateInput,
    }
  ])
    .then(data => {
      switch (data.mainMenu) {
        case 'View All Employees':
          Employee.viewEmployees();
          break;
        case 'Add Employee':
          Employee.addEmployee();
          break;
        case 'Update Employee Role':
          Employee.updateEmployeeRole();
          break;
        case 'View All Roles':
          Role.viewRoles();
          break;
        case 'Add Job Role':
          Role.addJobRole();
          break;
        case 'View All Departments':
          Department.viewDepartments();
          break;
        case 'Add Department':
          Department.addDepartment();
          break;
      };
    });
};

function init() {
  mainMenu();
};

init();