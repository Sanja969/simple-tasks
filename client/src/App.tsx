import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTasks } from './redux/tasks-reducer';
import { AppDispatch } from './redux/store';
import Home from './components/home.component';
import TaskForm from './components/taskForm.component';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/form" element={<TaskForm />} />
    </Routes>
  );
}

export default App;
