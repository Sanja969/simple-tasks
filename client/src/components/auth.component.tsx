import { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import { AppDispatch } from "../redux/store";
import { auth } from "../redux/user-reducer";

export default function Auth({action}: {action: 'login' | 'signup'}) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const gotToHome = () => {
    navigate('/');
  };

  const defaultFields = {
    name: '',
    password: '',
  }

  const [formFields, setFormFields] = useState(defaultFields);

  const {
    name,
    password,
  } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFields);
  };

  const createUser = (userName: string, password: string) => dispatch(auth({
    name,
    password,
    type: 'login'
  }));

  const submitTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser(name, password);
    gotToHome();
    resetFormFields();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="flex flex-col items-center pt-10">
      <form className="flex flex-col gap-2 w-[50%]" onSubmit={submitTask}>
        <input 
          className="border h-8 w-[100%] p-2"
          type="text"
          name="name" 
          placeholder="Name"
          onChange={handleChange}
          value={name}
          autoComplete="off"
          required 
        />
        <input 
          className="border h-8 w-[100%] p-2"
          type="password"
          name="password" 
          placeholder="Password"
          onChange={handleChange}
          value={password}
          autoComplete="off"
          required
        />
        <Button className="border bg-black hover:bg-dark-500 text-white p-2" type="submit">LOGIN</Button>
      </form>
    </div>
  )
}