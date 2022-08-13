const inquirer = require("inquirer");
const dbConnect = require("./db/connection");
const cTable = require('console.table');
const dbQuery = require("./lib/dbQuery");

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
        "Add an Employee",
        "Add a Role", 
        "Update Employees Role",
        "Update Employees Managers",
        "View Employees by Manager",
        "View Employees by Department",
        "View Department by Budget",
        "Delete an Employee, Role or Department",
        new inquirer.Separator(),
        "Quit",
        new inquirer.Separator()
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
          viewAllEmployees();
          break;
        case 'View All Roles':
          viewRoles();
          break;
        case 'Add a Department':
          addDepartment();
          break;
        case 'Add an Employee':
          addEmployee();
          break;
        case 'Add a Role':
          addJobRole();
          break;
        case 'Update Employees Role':
          updateEmpRole();
          break;
        case 'Update Employees Managers':
          updateEmpManager();
          break;
        case 'View Employees by Manager':
          viewEmpByMgmt();
          break;
        case 'View Employees by Department':
          viewEmpByDep();
          break;
        case 'View Department Budget':
          depBudget();
          break;
        case 'Delete an Employee, Role or Department':
          deleteFunc();
          break;
        case 'Quit':
          dbConnect.quit();
          console.log("Thank you, See you later")
          break;
      };
    });
};

//------------------------------------------------->>
// Functions to Display Tracker Tables & Process Data
//=================================================>>

// Function to View All Departments
async function viewDep() {
  let depData = await dbQuery.viewDepartments();
  console.log("====================================");
  console.table(depData[0]);
  console.log("====================================");
  mainMenu();
};

// Function to View all Roles
async function viewRoles() {
  let roleData = await dbQuery.viewRoles();
  console.log("====================================");
  console.table(roleData[0]);
  console.log("====================================");
  mainMenu();
};

// Function to View all Employees
async function viewAllEmployees() {
  let employeeData = await dbQuery.viewAllEmployees();
  console.log("====================================");
  console.table(employeeData[0]);
  console.log("====================================");
  mainMenu();
};

// Function to add a New Department
addDepartment = async () => {
  try {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "depName",
      message: "What is the Name of the new Department?", 
      validate: validateInput,
      },
  ]);
  await dbQuery.addDepartment([answers]);
  console.log(`Added ${answers.depName} to the Database`);
  } catch (err) {
    console.log(err);
  };
  console.log("====================================");
  mainMenu();
};

// Function to add a New Job Role
addJobRole = async () => {
  try {
  let depArr = await dbQuery.viewDepartments();
  depOpt = depArr[0].map(x => ({
    name:x.Department,
    value:x.id
  }));
  const answers = await inquirer.prompt([
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
      choices: depOpt,
      validate: validateInput,
      },
  ]);
  console.log(answers);
  await dbQuery.addJobRole(answers);
  console.log(`Added ${answers.title} to the Database`);
  } catch (err) {
    console.log(err);
  };
  console.log("====================================");
  mainMenu();
};

// Function to Add a New Employee
addEmployee = async () => {
  try {
    let roleArr = await dbQuery.viewRoles();
    roleOpt = roleArr[0].map(x => ({
      name:x.Title,
      value:x.id
    }));
    let mngrArr = await dbQuery.viewManagers();
    mngrOpt = mngrArr[0].map(x => ({
      name:x.ManagerName,
      value:x.id
    }));
    mngrOpt.push({
      name:"None",
      value:null
    });

    const answers = await inquirer.prompt([
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
      choices: roleOpt,
      validate:validateInput,
      },
      {
      type: "list",
      name: "manager",
      message: "Who is the Employee's Manager?",
      choices: mngrOpt,
      validate:validateInput,
      },
  ]);
    await dbQuery.addEmployee(answers);
    console.log(`Added ${(answers.firstName +""+ answers.lastName)} to the Database`);
  } catch (err) {
    console.log(err);
  };
  console.log("====================================");
  mainMenu();
};

// Function to update an existing Employee's Role
updateEmpRole = async () => {
  try {
  let employArr = await dbQuery.employeeOptions();
    employListOpt = employArr[0].map(x => ({
      name:x.Employee,
      value:x.id
  }));
  let roleArr = await dbQuery.viewRoles();
    roleListOpt = roleArr[0].map(x => ({
      name:x.Title,
      value:x.id
    }));

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "Which Employee do you want to Update?",
      choices: employListOpt,
      validate: validateInput,
      }, {
      type: "list",
      name: "role_id",
      message: "What is the Role that you want to assign to the employee?",
      choices: roleListOpt, 
      validate: validateInput,
      },
  ]);
    await dbQuery.updateEmployeeRole(answers.employee_id, answers.role_id);
    console.log(` Updated the Job role`);
  } catch (err) {
  console.log(err);
  };
  console.log("====================================");
  mainMenu();
};

async function exit() {
  return prompt.ui.close();
};

// const Name = await dbQuery.function();

function init() {
  mainMenu();
};

init();