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
  console.log("\n");
  console.table(depData[0]);
  mainMenu();
};

// Function to View all Roles
async function viewRoles() {
  let roleData = await dbQuery.viewRoles();
  console.log("\n");
  console.table(roleData[0]);
  mainMenu();
};

// Function to View all Employees
async function viewEmployees() {
  let employeeData = await dbQuery.viewEmployees();
  console.log("\n");
  console.table(employeeData[0]);
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
  mainMenu();
};

// Function to add a New Job Role
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
  console.log(`Added ${answers.title} to the Database`);
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
    let mngrArr = await dbQuery.viewManagers();
    mngrOpt = mngrArr[0].map(x => x.ManagerName);
    mngrOpt.push("None");

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
    console.log(answers);
    if(answers.empRole == roleArr[0].Title) {
      const index = roleArr[0].indexOf(answers.empRole == roleArr.Title);
      answers.splice(index,1,roleArr[0].id);
    };
    console.log(answers)
    if(answers.manager === "None") {
      answers.manager = "";
    } else if (answers.manager = mngrArr[0].ManagerName) {
      answers.manager = mngrArr[0].id;
    };
    console.log(answers);
    await dbQuery.addEmployee(answers);
    console.log(`Added ${concat(answers.firstName, answers.lastName)} to the Database`);
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

async function exit() {
  return prompt.ui.close();
};

// const Name = await dbQuery.function();


function init() {
  mainMenu();
};

init();