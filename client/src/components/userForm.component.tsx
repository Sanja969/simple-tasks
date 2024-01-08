import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import { AppDispatch } from "../redux/store";
import { User, auth } from "../redux/user-reducer";

export default function UserForm({action}: {action: 'login' | 'signup'}) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: {userReducer: User}) => state.userReducer);
  const [errors, setErrors] = useState({
    name: '',
    password: '',
    repeatPassword: '',
    serverError: '',
  });

  useEffect(() => {
    if (user.error) {
      setErrors(prevErrors => ({...prevErrors, serverError: user.error}));
    } else {
      setErrors(prevErrors => ({...prevErrors, serverError: ''}));
    }
  }, [user.error]);

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: '', password: '', repeatPassword: '' };

    if (!name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    if (action === 'signup' && password !== repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors({...errors, ...newErrors});
    return valid;
  };

  const gotToHome = () => {
    navigate('/');
  };

  const defaultFields: {name: string, password: string, repeatPassword?: string} = {
    name: '',
    password: '',
  }

  if (action === 'signup') {
    defaultFields.repeatPassword = ''
  }

  const [formFields, setFormFields] = useState(defaultFields);

  const {
    name,
    password,
    repeatPassword,
  } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFields);
  };

  const createUser = (userName: string, password: string) => dispatch(auth({
    name: userName,
    password,
    type: action
  }));

  const submitTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (action === 'signup' && password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!validateForm()) return;

    createUser(name, password);

    if (!user.error) {
      gotToHome();
      resetFormFields();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="flex-1 flex flex-col items-center pt-10">
      <form className="flex flex-col gap-2 w-[100%]" onSubmit={submitTask}>
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
        <div className="error-message">{errors.name}</div>
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
        <div className="error-message">{errors.password}</div>
        {action === 'signup' &&
          <>
            <input
              className="border h-8 w-[100%] p-2"
              type="password"
              name="repeatPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={repeatPassword}
              autoComplete="off"
              required 
            />
            <div className="error-message">{errors.repeatPassword}</div>
          </>}
          {(errors.serverError.includes('exists') && action === 'signup') && 
            <div className="text-red-400">{errors.serverError}</div>
          }
          {(errors.serverError.includes('password') && action === 'login') && 
            <div className="text-red-400">{errors.serverError}</div>
          }
        <Button className="border bg-black hover:bg-dark-500 text-white p-2" type="submit">
          {action === 'login' ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
    </div>
  )
}