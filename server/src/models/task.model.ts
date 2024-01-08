interface Tasks {
  id: number,
  userId: number,
  title: string,
  description?: string,
  completed: boolean,
  dueDate?: Date,
}

const tasks: Tasks[] = [
  {
    id: 1,
    userId: 1,
    title: "Task1",
    description: "Des1",
    completed: false,
    dueDate: new Date("02/01/2024"),
  },
  {
    id: 2,
    userId: 2,
    title: "Task2",
    description: "Des2",
    completed: false,
    dueDate: new Date("02/01/2024"),
  }
]

export default tasks;