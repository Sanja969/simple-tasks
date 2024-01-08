import { Dispatch } from 'redux';

const url = 'http://localhost:8000/api/v1';
const GET_USER = 'GET_USER';

const initialState = {};

export interface User {
  name: string;
  password: boolean;
  id: string;
}

export interface Data {
  name: string;
  password: boolean;
  type: 'login' | 'signup';
}

interface GetUsersAction {
  type: string;
  payload: any;
}

const UsersReducer = (state = initialState, action: GetUsersAction) => {
  switch (action.type) {
    case GET_USER:
      return action.payload as User;
    default:
      return state;
  }
};

export const auth = (data: Data) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`${url}/${data.type}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
       "Content-Type": "application/json"
      },
    });
    if (!response.ok) {
      throw new Error('There is no user with this name and password');
    }
    const user = await response.json();
  
    dispatch({
      type: GET_USER,
      payload: user,
    });
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }

};

export default UsersReducer;