import {
  AUTH_ERROR,
  CLEAR_RESERVATIONS,
  GET_USER,
  LOADING_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS, LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from "./types";
import axios from "axios";
import {returnErrors} from "./messages";
import {tokenConfig} from "./token";

// CHECK TOKEN & GET USER
export const getUser = () => (dispatch, getState) => {
  // LOADING USER
  dispatch({type: LOADING_USER});

  axios
      .get('http://127.0.0.1:8000/api/auth/user', tokenConfig(getState))
      .then(response => {
        dispatch({
          type: GET_USER,
          payload: response.data
        })
      })
      .catch(error => {
        dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
          type: AUTH_ERROR
        })
      })
};

// LOGIN USER
export const loginUser = (email, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request data
  const data = JSON.stringify({email, password});

  axios
      .post('http://127.0.0.1:8000/api/auth/login', data, config)
      .then(response => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data
        })
      })
      .catch(error => {
        dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
          type: LOGIN_FAIL,
        })
      })
};

// CREATE USER
export const createUser = (user) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  // Request data
  const data = JSON.stringify(user);

  axios
      .post('http://127.0.0.1:8000/api/auth/register', data, config)
      .then(response => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response.data
        })
      })
      .catch(error => {
        dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
          type: REGISTER_FAIL,
        })
      })
};

// LOGOUT USER
export const logoutUser = () => (dispatch, getState) => {
  axios
      .post('http://127.0.0.1:8000/api/auth/logout', null, tokenConfig(getState))
      .then(response => {
        dispatch({type: CLEAR_RESERVATIONS});
        dispatch({
          type: LOGOUT_SUCCESS
        })
      })
      .catch(error => {
        dispatch(returnErrors(error.response.data, error.response.status))
      })
};
