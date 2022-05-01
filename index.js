const inquirer = require("inquirer");
const db = require("./db/connection");
const consoletable = require("console.table");

function beginMenu() {
    inquirer
    .prompt({
    type: "list",
    name: "main",
    message: "What would you like to do?",
    choices: [
    "View All Employees",
    "Add Employee",
    "Update Employee Role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department",
    ],
    })
    .then(function (answers) {
        if (answers.main === "View All Employees") {
            allEmployees();
        } else if (answers.main === "View All Departments") {
            allDepartments();
        } else if (answers.main === "View All Roles") {
            allRoles();
        } else if (answers.main === "Add Employee") {
            addEmployee();
        } else if (answers.main === "Update Employee Role") {
            updateEmployee();
        }  else if (answers.main === "Add Role") {
            addRole();
        }  else if (answers.main === "Add Department") {
            addDepartment();
        }
    });
}

function allEmployees() {
    const mysql = 'SELECT * FROM employee;';
    db.query(mysql, function(err, res) {
        if(err) throw err;
        console.table(res);
        beginMenu();
    })
};

function allRoles() {
    const mysql = 'SELECT * FROM role;';
    db.query(mysql, function(err, res) {
        if(err) throw err;
        console.table(res);
        beginMenu();
    })
};

function allDepartments() {
    const mysql = 'SELECT * FROM department;';
    db.query(mysql, function(err, res) {
        if(err) throw err;
        console.table(res);
        beginMenu();
    })
};

function addEmployee() {
    const questions = [
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employees last name?'
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'What is the employees role?',
            choices: ['Sales Lead', 'Sales Person', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is your employees manager?',
            choices: ['none', '']
        }
    ];

    inquirer.prompt(questions).then(answers) // add to db??
    console.log('Employee added to database');
    beginMenu();       
};

function addRole() {
    const questions = [
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does the role belong to?',
            choices: ['Engineering', 'Finance', 'Legal', 'Sales']
        },
    ];

    inquirer.prompt(questions).then(answers) // add to db?
    console.log("Added new role to database");
    beginMenu();
};

function addDepartment() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?'
        }
    )
    .then (answers) //add to db??
    console.log("Added department to database.");
    beginMenu();
};

function updateEmployee() {
        // which employee - with options
          // which role do you want to assign to the selected employee --  with options
          // "updated employee's role"
}
