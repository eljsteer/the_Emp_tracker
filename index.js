const inquirer = require("inquirer");
const db = require("./db/connection");
const cTable = require('console.table');
const { Employee, Role, Department } = require("./lib/dbQuery");

function validateInput(answers) {
  if(answers != "") {
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
        "View All Departments",
        "View All Employees", 
        "View All Roles",
        "Add a Department",
        "Add a Employee",
        "Add a Role", 
        "Update Employees Role",
        "Update Employees Managers",
        "View Employees by Manager",
        "View Employees by Department",
        "View Department by Budget",
        "Delete an Employee, Role or Department",
        "Quit"
      ],
      validate: validateInput,
    }
  ])
    .then(mmData => {
      switch (mmData.mainMenu) {
        case 'View All Departments':
          viewDep();
          break;
        case 'View All Employees':
          Employee.viewEmployees();
          break;
        case 'View All Roles':
          Role.viewRoles();
          break;
        case 'Add Department':
          Department.addDepartment();
          break;
        case 'Add Employee':
          Employee.addEmployee();
          break;
        case 'Add Role':
          Role.addJobRole();
          break;
        case 'Update Employees Role':
          Employee.updateEmpRole();
          break;
        case 'Update Employees Managers':
          Employee.updateEmpManager();
          break;
        case 'View Employees by Manager':
          Employee.viewEmpByMgmt();
          break;
        case 'View Employees by Department':
          Employee.viewEmpByDep();
          break;
        case 'View Department Budget':
          Employee.depBudget();
          break;
        case 'Delete an Employee, Role or Department':
          Employee.deleteFunc();
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
      name: "empRole",
      message: "What is the Employee's Role?",
      choices: [""],
      validate:validateInput,
      }, {
      type: "list",
      name: "manager",
      message: "Who is the Employee's Manager?",
      validate:validateInput,
      },
  ]).then((answers)=> {
    const employee = new employee(answers.firstName, answers.lastName, answers.role, answers.manager);
    
      mainMenu();
    })
};
updateEmployeeRole = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "updEmpRole",
      message: "What is the Role that you want to assign to the employee?", 
      validate: validateInput,
      },
  ]).then((answers)=> {
    mainMenu();
  })
};
addJobRole = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
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
      name: "roleDep",
      message: "Which department does the role belong to?", 
      validate: validateInput,
      },
  ]).then((answers)=> {
      mainMenu();
  })
};
addDepartment = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "depName",
      message: "What is the Name of the new Department?", 
      validate: validateInput,
      },
  ]).then((answers)=> {
      mainMenu();
  })
};

viewDep = async () => {
  let deptData = Department.viewDepartments();
  console.log("log", deptData);
  await (([deptData]) => {
    console.table(deptData);
  });
};



function init() {
  mainMenu();
};

init();