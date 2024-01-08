import { Task } from "./tasks-reducer";

const initialState = {title: "", description: "", completed: false, dueDate: undefined, id: undefined};
const SET_DATA = 'SET_DATA';

interface GetFormAction {
  type: string;
  payload: Task;
}

export interface Data {
  title: string,
  completed: boolean,
  id?: string,
  description: string,
  dueDate?: string,
}
const formReducer = (state = initialState, action: GetFormAction) => {
  switch (action.type) {
    case SET_DATA:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export const setData = (payload: Task) => {
  return {
    type: SET_DATA,
    payload
  }
}

export default formReducer;