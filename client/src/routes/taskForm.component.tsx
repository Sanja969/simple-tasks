import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveTask, updateTask, getTasks } from "../redux/tasks-reducer";
import { Data } from "../redux/form-reducer";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import { AppDispatch } from "../redux/store";

export default function TaskForm() {
  const form = useSelector((state: {formReducer: Data}) => state.formReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const gotToHome = () => {
    navigate('/');
  };

  const [formFields, setFormFields] = useState(form);
  const {
    id,
    title,
    description,
    completed,
    dueDate,
  } = formFields;

  const resetFormFields = () => {
    setFormFields({
      id: undefined,
      title: '',
      description: '',
      completed: false,
      dueDate: undefined,
    });
  };

  const createTask = (title: string, description: string, completed: boolean, dueDate: string | undefined) => dispatch(saveTask({
    title,
    description,
    completed,
    dueDate,
  }));

  const editTask = (title: string, description: string, completed: boolean, dueDate: string | undefined, id: string) => dispatch(updateTask({
    title,
    description,
    id,
    completed,
    dueDate,
  }));

  const submitTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(id) {
      editTask(title, description, completed, dueDate, id);
    } else {
      createTask(title, description, completed, dueDate);
      dispatch(getTasks())
    }
    gotToHome();
    resetFormFields();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target as HTMLInputElement; // Type assertion
    const name = target.name; // Explicitly define the name
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="flex flex-col items-center pt-10">
      <form className="flex flex-col gap-2 w-[50%]" onSubmit={submitTask}>
        <input 
          className="border h-8 w-[100%] p-2"
          type="text"
          name="title" 
          placeholder="Title"
          onChange={handleChange}
          value={title}
          required 
        />
        <textarea 
          className="border h-40 w-[100%] p-2"
          name="description" onChange={handleChange}
          placeholder="Description"
          value={description}
        />
        <label className="flex justify-between w-full">
          <p>Completed:</p>
          <input
            className="border h-8 w-[100%] p-2 w-[32px]"
            type="checkbox"
            checked={completed}
            name="completed"
            onChange={handleChange}
          />
        </label>
        <label className="flex justify-between w-full">
          <p>Due Date:</p>
          <input
            className="border h-8 w-[100%] p-2 w-[200px]"
            type="date"
            name="dueDate"
            placeholder="Due Date"
            onChange={handleChange}
            value={dueDate}
          />
        </label>
        <Button className="border bg-black hover:bg-dark-500 text-white p-2" type="submit">SAVE TASK</Button>
      </form>
    </div>
  )
}