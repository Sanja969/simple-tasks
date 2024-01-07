interface Tasks {
  title: string,
  description?: string,
  completed?: boolean,
  dueDate?: Date,
}

const tasks: Tasks[] = [
  {
    title: "Task1",
    description: "Des1",
    completed: false,
    dueDate: new Date("02/01/2024"),
  },
  {
    title: "Task2",
    description: "Des2",
    completed: false,
    dueDate: new Date("02/01/2024"),
  }
]

export default tasks;