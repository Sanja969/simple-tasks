import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home.component';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTasks } from './redux/tasks-reducer';
import { AppDispatch } from './redux/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
}

export default App;
