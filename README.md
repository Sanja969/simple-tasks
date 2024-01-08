# Simple Tasks

Simple Tasks is a dynamic React application demonstrating CRUD (Create, Read, Update, Delete) operations via an API. It offers an interactive user interface to manage tasks, featuring functionalities such as adding, viewing, editing, and deleting tasks. This project exemplifies essential web application features in a practical setting.

## Built With

- React, TypeScript, NodeJS

### Download it as a ZIP file

or

### Clone it in your local machine using GIT

to get a local copy , clone the repository using git clone
(git@github.com:Sanja969/simple-tasks.git)

### Running the Application

#### Option 1: Option 1: Direct Run
Run both server and client from the 'simple-tasks' directory:

- cd simple-tasks
- npm install
- npm run deploy

Access the app at: http://localhost:8000

#### Option 2: Separate Run
Run client and server separately:

#### Run client: 
- cd simple-tasks/client
- npm install
- npm start

Access at: http://localhost:3000

#### Run server: 
- cd simple-tasks/server
- npm install
- npm start

Access at: http://localhost:8000

### Server instructions

#### TASKS:

- Get All Tasks: GET /api/v1/tasks
- Get Task by ID: GET /api/v1/tasks/{id}
- Create Task: POST /api/v1/tasks with body { title: 'Title' }
- Update Task: POST /api/v1/tasks/{id} with body { title: 'New Title' }
- Delete Task: DELETE /api/v1/tasks/{id}

#### USER:

- Login: POST /api/v1/login with body { name: User 1, password: user1 }
- Signup: POST /api/v1/signup with body { name: User 10, password: user10 }

### Note:

For your convenience, the application includes pre-registered users with the following credentials:

  - name: "User 1", password: "user1"
  - name: "User 2", password: "user2",

You may log in using these credentials to explore the application's features. For a more personalized experience, you have the option to register as a new user.

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
