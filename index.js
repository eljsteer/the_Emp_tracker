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
          viewEmployees();
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
          exit();
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
  console.table(depData[0]);
  mainMenu();
};

// Function to add a Department
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
  console.log(answers);
  await dbQuery.addDepartment([answers]);
  } catch (err) {
    console.log(err);
  };
  mainMenu();
};

// Function to View all Roles
async function viewEmployees() {
  let employeeData = await dbQuery.viewEmployees();
  console.table(employeeData[0]);
  mainMenu();
};

// Function to View all Roles
async function viewRoles() {
  let roleData = await dbQuery.viewRoles();
  console.table(roleData[0]);
  mainMenu();
};

// Function to add a Job Role
addJobRole = async () => {
  try {
  let depArr = await dbQuery.viewDepartments();
  depOpt = depArr[0].map(x => x.dep_name);
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
  } catch (err) {
    console.log(err);
  };
  mainMenu();
};

// Function to Add a New Employee
addEmployee = async () => {
  try {
    let roleArr = await dbQuery.viewRoles();
    roleOpt = roleArr[0].map(x => x.Title);
    console.log(roleOpt);
    let mngrArr = await dbQuery.viewManagers();
    console.log(mngrArr);
    //   if(x.manager_id == null) {
    //     x.concat(x.first_name,"",x.last_name)}

    // );
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
      // {
      // type: "list",
      // name: "manager",
      // message: "Who is the Employee's Manager?",
      // choices: mngrOpt,
      // validate:validateInput,
      // },
  ]);
    console.log(answers);
    await dbQuery.addEmployee(answers);
  } catch (err) {
    console.log(err);
  };
    mainMenu();
};

// Function to update an existing Employee's Role
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

// function promptDataHelper(answers) {
//   let answerArray = [];
//   answerArray.push(answers);
// }

async function exit() {
  return prompt.ui.close();
};

// const Name = await dbQuery.function();


function init() {
  mainMenu();
};

init();