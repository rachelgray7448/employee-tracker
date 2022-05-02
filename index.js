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
    const mysql = 'SELECT D.NAME, R.TITLE, R.SALARY, E.FIRST_NAME, E.LAST_NAME, MANAGER_ID FROM DEPARTMENT D, ROLE R, EMPLOYEE E WHERE D.ID = R.DEPARTMENT_ID AND R.ID = E.ROLE_ID ORDER BY D.NAME;';
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
    const mysql = 'SELECT * FROM role;';
    const mysqlemp = 'SELECT * FROM employee;';
    db.query(mysql, function(err, res) {
        if(err) throw err;
        const roleOptions = [];
        for (let i = 0; i < res.length; i++) {
            const roleOption = {
                name: res[i].title,
                value: res[i].id
            }
            roleOptions.push(roleOption);
        }

        db.query(mysqlemp, function(err, res) {
            if(err) throw err;
            const employeeOptions = [];
            for (let i = 0; i < res.length; i++) {
                const employeeOption = {
                    name: `${res[i].first_name} ${res[i].last_name}`,
                    value: res[i].id
                }
                employeeOptions.push(employeeOption);
            }

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
                choices: roleOptions
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is your employees manager?',
                choices: employeeOptions
            }
        ];
    
        inquirer.prompt(questions).then(function(answers) {
            const mysql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
            db.query(mysql, [answers.firstName, answers.lastName, answers.employeeRole, answers.manager], function(err, res) {
                if(err) console.log(err);
                console.log('Employee added to database');
                beginMenu();   
            })
        })
    }) 
})
};

function addRole() {
    const mysql = 'SELECT * FROM department;';
    db.query(mysql, function(err, res) {
        if(err) throw err;
        const departmentOptions = [];
        for (let i = 0; i < res.length; i++) {
            const departmentOption = {
                name: res[i].name,
                value: res[i].id
            }
            departmentOptions.push(departmentOption);
        }
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
                choices: departmentOptions
            },
        ];
    
        inquirer.prompt(questions).then(function(answers) {
            const mysql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`
            db.query(mysql, [answers.roleName, answers.salary, answers.department], function(err, res) {
                if(err) console.log(err);
                console.log('Role added to database');
                beginMenu();   
            })
        })
    })
};


function addDepartment() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?'
        }
    )
    .then(function(answers) {
        const mysql = `INSERT INTO department (name) VALUES (?)`
        db.query(mysql, [answers.departmentName], function(err, res) {
            if(err) console.log(err);
            console.log('Department added to database');
            beginMenu();   
        })
    })
};

function updateEmployee() {
    const mysql = 'SELECT * FROM employee;';
    const mysqlrole = 'SELECT * FROM role;';
    db.query(mysql, function(err, res) {
        if(err) throw err;
        const employeeOptions = [];
        for (let i = 0; i < res.length; i++) {
            const employeeOption = {
                name: `${res[i].first_name} ${res[i].last_name}`,
                value: res[i].id
            }
            employeeOptions.push(employeeOption);
        }

        db.query(mysqlrole, function(err, res) {
            if(err) throw err;
            const roleOptions = [];
            for (let i = 0; i < res.length; i++) {1
                const roleOption = {
                    name: res[i].title,
                    value: res[i].id
                }
                roleOptions.push(roleOption);
            }

            const questions = [
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Which employee would you like to update?',
                    choices: employeeOptions
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Which role do you want to assign to the selected employee?',
                    choices: roleOptions
                }
            ];
        
            inquirer.prompt(questions).then(function(answers) {
                const mysql = `UPDATE employee SET role_id = ? WHERE id = ?;`
                db.query(mysql, [answers.role, answers.employee], function(err, res) {
                    if(err) console.log(err);
                    console.log('Employee role updated in database.');
                    beginMenu();   
                })
            })
        })   
    })
}

beginMenu();