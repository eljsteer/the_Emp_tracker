INSERT INTO department (dep_name)
VALUES  ("Engineers"),
        ("Human Resources"),
        ("Finance"),
        ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES  ("Software Engineer Manager", 195000.00, 1),
        ("Software Engineer", 120000.00, 1),
        ("People and Culture Director", 185000.00, 2),
        ("HR Manager", 85000.00, 2),
        ("Finance Manager", 165000.00, 3),
        ("Finance Analyst", 90000.00, 3),
        ("Marketing Manager", 140000.00, 4),
        ("Marketing Specialist", 85000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Thomas", "Shelby", 1, NULL),
        ("Arthur", "Shelby", 2, 1),
        ("John", "Shelby", 2, 1),
        ("Ada", "Shelby", 4, 2),
        ("Polly", "Gray", 3, NULL),
        ("Finn", "Shelby", 2, 1),
        ("Michael", "Gray", 5, NULL),
        ("Grace", "Shelby", 7, NULL),
        ("Gina", "Gray", 8, 4),
        ("Esme", "Shelby", 6, 3),
        ("Lizzie", "Shelby", 6, 1);
