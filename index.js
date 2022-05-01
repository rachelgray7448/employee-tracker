const inquirer = require('inquirer');

inquirer
    .prompt({
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
    })
    .then (function(answers) {
        if (answers.main === 'View All Employees') {
            // IF view, display table and reask first question
                    }
                    else if (answers.main === 'Add Employee') {
                // what is employees first name
                // what is employees last name
                // what is employees role - with options
                // who is the employees manager - with options, including none
                // "added (emp name) to db"
                    }
                    else if (answers.main === 'Update Employee Role') {
                // which employee - with options
                // which role do you want to assign to the selected employee --  with options
                // "updated employee's role"
                    }
                    else if (answers.main === 'View All Roles') {
            // IF view, display table and reask first question
                    }
                    else if (answers.main === 'Add Role') {
                // what is the name of the role
                // what is the salary of the role
                // which department does the role belong to - with options
                // "added (role name) to database"
                    }
                    else if (answers.main === 'View All Departments') {
            // IF view, display table and reask first question
                    }
                    else if (answers.main === 'Add Department') {
                // what is the name of the department
                // "added (dp name) to database"
                    }
    }
    );
