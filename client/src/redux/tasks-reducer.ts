import { Dispatch } from 'redux';

const url = 'http://localhost:8000/api/v1/tasks';
const GET_TASKS = 'GET_TASKS';

const initialState = {tasks: [], task: {}};

export interface Task {
  id: number,
  title: string,
  description?: string,
  completed: boolean,
  dueDate?: Date,
}

interface GetTasksAction {
  type: string;
  payload: any;
}

const tasksReducer = (state = initialState, action: GetTasksAction) => {
  switch (action.type) {
    case GET_TASKS:
      return {...state, tasks: [...action.payload as Task[]]};
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

export default tasksReducer;