const db = require("../index");
const cTable = require('console.table');


class Employee {
// Function to view all Employees 
viewEmployees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    console.log(results);
  });
};
};


// viewEmployees = () => {
//   return inquirer.prompt([
//     {
//       type: "input",
//       name: "name",
//       message: "What is the name of the Intern?", 
//       validate: validateInput,
//     }, {
//       type: "input",
//       name: "id",
//       message: "Please provide the id of the Intern?", 
//       validate: validateInput,
//     }, {
//       type: "input",
//       name: "email",
//       message: "Please provide the Intern's email.",
//       validate: function(data) {
//         if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data)) {
//             return true;
//         } else {
//             return 'Not a valid email address. Please enter in the email again.';
//         }
//       },
//     }, {
//         type: "input",
//         name: "intrnSchool",
//         message: "What is the school that the intern is attending?",
//         validate: validateInput,
//     }, {
//         type: "list",
//         name: "addEmployee",
//         message: "Would you like to add another employee?",
//         choices: ["Yes", "No"],
//         validate: validateInput,
//       },
      
//     ]) .then((data)=>{
//       // data.val().trim();
//       const intern = new Intern(data.name, data.id, data.email, data.intrnSchool);
//       team.push(intern);
//       if(data.addEmployee === "Yes") {
//         addEmployees();
//       } else if (data.addEmployee === "No") {
//         let dataInput = genieProfileHTML(team);
//         writeFile(dataInput);
//       } else {
//         console.log("error")
//       };
//     })
// };

module.exports = Employee
