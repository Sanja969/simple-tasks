#Simple Tasks

- This React application is a fully functional example of CRUD (Create, Read, Update, Delete) operations using an API. It features an interactive interface where users can view a list of tasks and perform actions such as editing, updating, and deleting these tasks. This app showcases practical implementations of common web application functionalities.

## Built With

- React, TypeScript, NodeJS

### Download it as a ZIP file

or

### Clone it in your local machine using GIT

to get a local copy , clone the repository using git clone
(git@github.com:Sanja969/simple-crud.git)

After you clone it run the following commands

### Option 1: You can run both server and client directly from the simple tasks directory. You can now view client in the browser -  Local: http://localhost:8000

- cd simple-tasks
- npm install
- npm run deploy

### Option 2: You can run server and client separatly. You can now view client in the browser -  Local: http://localhost:3000, and server - Local: http://localhost:8000

### Run client: 
- cd simple-tasks/client
- npm install
- npm start

### Run server: 
- cd simple-tasks/server
- npm install
- npm start

## Server instructions

### TASKS:

Get all tasks: 
  endpoint: /api/v1/tasks;
  method: GET
Get task with id, for example id = 1: 
  endpoint: /api/v1/tasks/1;
  method: GET
Create task for example with title = 'Title': 
  endpoint: /api/v1/tasks;
  method: POST
  body: { title: 'Title' }
Update task with id, for example id = 1, for example with new title = 'new Title': 
  endpoint: /api/v1/tasks/1;
  method: POST;
  body: { title: 'new Title' }
Delete task with id, for example id = 1: 
  endpoint: /api/v1/tasks/1;
  method: DELETE

### USER:

Login: 
  endpoint: /api/v1/login;
  method: POST;
  body: { name: string, password: string }

Signup: 
  endpoint: /api/v1/signup;
  method: POST;
  body: { name: string, password: string }

## Authors

👤 **Sanja Mandic**

I am an aspiring web developer from Serbia.

- GitHub: [@sanjaGit](https://github.com/Sanja969)
- Twitter: [@sanjaTwit](https://twitter.com/SanjaMandic42)
- LinkedIn: [@sanjaIn](https://linkedin.com/in/sanja-mandic-823995a2/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Sanja969/simple-tasks/issues).

## Show your support
