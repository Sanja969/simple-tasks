import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTasks } from './redux/tasks-reducer';
import { AppDispatch } from './redux/store';
import Navigation from './routes/navigation.component';
import Home from './routes/home.component';
import TaskForm from './routes/taskForm.component';
import Login from './routes/login.component';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/form" element={<TaskForm />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
