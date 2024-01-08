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

export const getTasks = () => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const tasks = await response.json();
    dispatch({
      type: GET_TASKS,
      payload: tasks,
    });
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export const getTask = (id: string) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const task = await response.json();
  
    dispatch({
      type: GET_TASK,
      payload: task,
    });
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }

};

export const saveTask = (task: Data) => async(dispatch: Dispatch) => {
  try {
    const response = await fetch(url,
      {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
         "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const json = await response.json();
  
    dispatch({
      type: GET_TASKS,
      payload: json,
    })
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export const updateTask = (task: Task) => async(dispatch: Dispatch) => {
  const { id, ...other } = task;

  try {
    const response = await fetch(`${url}/${id}`,
    {
      method: 'POST',
      body: JSON.stringify(other),
      headers: {
       "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const json = await response.json();

    dispatch({
      type: GET_TASKS,
      payload: json,
    })
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export const deleteTask = (id: string) => async(dispatch: Dispatch) => {
  try {
    await fetch(`${url}/${id}`,
    {
      method: 'DELETE',
      headers: {
       "Content-Type": "application/json"
      },
    });

    dispatch({
      type: GET_TASKS,
      payload: id,
    })

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export default tasksReducer;