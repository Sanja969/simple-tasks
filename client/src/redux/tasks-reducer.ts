import { Dispatch } from 'redux';
import { Data } from './form-reducer';

const url = 'http://localhost:8000/api/v1/tasks';
const GET_TASKS = 'GET_TASKS';
const GET_TASK = 'GET_TASK';

const initialState = {tasks: [], task: {}};

export interface Task {
  title: string,
  completed: boolean,
  id: string,
  description?: string,
  dueDate?: string,
}

interface GetTasksAction {
  type: string;
  payload: any;
}

const tasksReducer = (state = initialState, action: GetTasksAction) => {
  switch (action.type) {
    case GET_TASKS:
      return {...state, tasks: [...action.payload as Task[]]};
    case GET_TASK:
      return {...state, task: action.payload as Task};
    default:
      return state;
  }
};
const fetchData = async (url: string, options: any) => {
  console.log(`Bearer ${localStorage.getItem('token')}`);
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getTasks = () => async (dispatch: Dispatch) => {
  try {
    const tasks = await fetchData(url, { method: 'GET' });
    dispatch({ type: GET_TASKS, payload: tasks });
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

export const getTask = (id: string) => async (dispatch: Dispatch) => {
  try {
    const task = await fetchData(`${url}/${id}`, { method: 'GET' });
    dispatch({ type: GET_TASKS, payload: task });
  
    dispatch({
      type: GET_TASK,
      payload: task,
    });
  } catch (error) {
    console.error('Fetch error:', error);
  }

};

export const saveTask = (task: Data) => async(dispatch: Dispatch) => {
  try {
    const tasks = await fetchData(url, { method: 'POST', body: JSON.stringify(task)  });

    dispatch({ type: GET_TASKS, payload: task });
  
    dispatch({
      type: GET_TASKS,
      payload: tasks,
    })
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export const updateTask = (task: Task) => async (dispatch: Dispatch) => {
  const { id, ...other } = task;
  try {
    const updatedTasks = await fetchData(`${url}/${id}`, { 
      method: 'POST', 
      body: JSON.stringify(other) 
    });
    dispatch({ type: GET_TASKS, payload: updatedTasks });
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

export const deleteTask = (id: string) => async(dispatch: Dispatch) => {
  try {
    const updatedTasks = await fetchData(`${url}/${id}`, { 
      method: 'DELETE', 
    });

    dispatch({
      type: GET_TASKS,
      payload: updatedTasks,
    })

  } catch (error) {
    console.error('Fetch error:', error);
  }
};

export default tasksReducer;