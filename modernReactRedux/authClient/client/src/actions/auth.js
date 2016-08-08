import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:8089';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signinUser({ email, password }) {
  return (dispatch) => {
    // submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(res => {
        // if request is good, update the state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // save the JWT token to localStorage (which is a method available via the window scope)
        localStorage.setItem('token', res.data.token);
        // redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // if request is bad, show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  };
}

export function signupUser({ email, password }) {
  return (dispatch) => {
    // submit email/password to the server
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(res => {
        // if request is good, update the state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // save the JWT token to localStorage (which is a method available via the window scope)
        localStorage.setItem('token', res.data.token);
        // redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(response => {
        // if request is bad, show an error to the user provided by the server
        // api issue with axios, quick fix add extra response object
        dispatch(authError(response.response.data.error));
      });
  };
}

export function signoutUser() {
  // removes JWT token from local storage
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}