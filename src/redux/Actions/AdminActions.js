import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from '../Constants/AdminConstants';
import axios from 'axios';
import { URL } from '../Url';

//LOGIN
export const adminLogin = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `${URL}/api/users/login`,
      { email, password },
      config
    );
    if (!data.isAdmin === true) {
      dispatch({ type: ADMIN_LOGIN_FAIL, payload: 'you are not Admin' });
    } else {
      dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });
    }

    localStorage.setItem('adminInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem('adminInfo');
  dispatch({ type: ADMIN_LOGOUT });
};

// GET ALL USERS
export const listUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: adminInfo.token,
      },
    };

    const { data } = await axios.get(`${URL}/api/users`, config);
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
