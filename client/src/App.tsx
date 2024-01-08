import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './routes/navigation.component';
import Home from './routes/home.component';
import TaskForm from './routes/taskForm.component';
import Auth from './routes/auth.component';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/form" element={<TaskForm />} />
        <Route path="/auth" element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;
