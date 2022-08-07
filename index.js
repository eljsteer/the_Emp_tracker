const inquirer = require("inquirer");
const pool = require("./connection/connection");
const cTable = require('console.table');
const Employee = require("./models/dbQuery");
const Role = require("./models/dbQuery");
const Department = require("./models/dbQuery");


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
      "View Employees by Filter",
      "Quit"
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
        case 'Quit':
          exit();
          break;
      };
    });
};

addEmployee = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the First Name of the Employee?", 
      validate: validateInput,
      }, {
      type: "input",
      name: "lastName",
      message: "What is the Last Name of the Employee?", 
      validate: validateInput,
      }, {
      type: "list",
      name: "role",
      message: "What is the Employee's Role.",
      choices: [""],
      validate:validateInput,
      }, {
      type: "list",
      name: "Manager",
      message: "Who is the Employee's Manager.",

      validate:validateInput,
      },
  ]).then((data)=> {
    const intern = new Intern(data.name, data.id, data.email, data.intrnSchool);
    
    if(data.addEmployee === "Yes") {
      addEmployees();
    } else if (data.addEmployee === "No") {
      let dataInput = genieProfileHTML(team);
      writeFile(dataInput);
    } else {
      console.log("error")
    };
  })
}
updateEmployeeRole = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "empRole",
      message: "What is the Role that you want to assign to the employee?", 
      validate: validateInput,
      },
  ]).then((data)=> {
    const intern = new Intern(data.name, data.id, data.email, data.intrnSchool);
    team.push(intern);
    if(data.addEmployee === "Yes") {
      addEmployees();
    } else if (data.addEmployee === "No") {
      let dataInput = genieProfileHTML(team);
      writeFile(dataInput);
    } else {
      console.log("error")
    };
  })
}
addJobRole = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "What is the Name of the new Role?", 
      validate: validateInput,
      },
    {
      type: "input",
      name: "salary",
      message: "What is the Salary of the new Role?", 
      validate: validateInput,
      },
    {
      type: "list",
      name: "salary",
      message: "Which department does the role belong to?", 
      validate: validateInput,
      },
  ]).then((data)=> {
    const intern = new Intern(data.name, data.id, data.email, data.intrnSchool);
    team.push(intern);
    if(data.addEmployee === "Yes") {
      addEmployees();
    } else if (data.addEmployee === "No") {
      let dataInput = genieProfileHTML(team);
      writeFile(dataInput);
    } else {
      console.log("error")
    };
  })
}
addDepartment = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "depName",
      message: "What is the Name of the new Department?", 
      validate: validateInput,
      },
  ]).then((data)=> {
    const intern = new Intern(data.name, data.id, data.email, data.intrnSchool);
    team.push(intern);
    if(data.addEmployee === "Yes") {
      addEmployees();
    } else if (data.addEmployee === "No") {
      let dataInput = genieProfileHTML(team);
      writeFile(dataInput);
    } else {
      console.log("error")
    };
  })
}

function init() {
  mainMenu();
};

init();