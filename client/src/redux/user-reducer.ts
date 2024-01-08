import { Dispatch } from 'redux';

const url = 'http://localhost:8000/api/v1';
const GET_USER = 'GET_USER';

const initialState = { name: localStorage.getItem('user') ?? '', token: localStorage.getItem('token') ?? '', error: null };

export interface User {
  token: string;
  name: string;
  error: any;
}

export interface Data {
  name: string;
  password: string;
  type: 'login' | 'signup';
}

interface GetUsersAction {
  type: string;
  payload: any;
}

const userReducer = (state = initialState, action: GetUsersAction) => {
  switch (action.type) {
    case GET_USER:
      return {...state, ...action.payload as User};
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
      const errorMessage = data.type === 'login' ? 'There is no user with this name and password' :
      'User with this name already exists'

      dispatch({
        type: GET_USER,
        payload: { error: errorMessage },
      });

      throw new Error(errorMessage);
    }
    const json = await response.json();

    console.log(`response - ${JSON.stringify(json)}`);
    localStorage.setItem('user', json.user);
    localStorage.setItem('token', json.token);
  
    dispatch({
      type: GET_USER,
      payload: { name: json.user, token: json.token, error: null },
    });
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }

};

export const logout = () => {
  localStorage.setItem('user', '');
  localStorage.setItem('token', '');

  return {
    type: GET_USER,
    payload: { name: '', token: ''},
  }
}

export default userReducer;