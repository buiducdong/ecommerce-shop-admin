import axios from 'axios';
import {
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from '../Constants/OrderConstants';
import { URL } from '../Url';

// GET ALL ORDER
export const listOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: adminInfo.token,
      },
    };

    const { data } = await axios.get(`${URL}/api/orders`, config);
    console.log(data);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

// GET ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: adminInfo.token,
      },
    };

    const { data } = await axios.get(`${URL}/api/orders/${id}`, config);
    console.log(data);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

// DELIVERED ORDER
export const deliveredOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: adminInfo.token,
      },
    };

    const { data } = await axios.put(
      `${URL}/api/orders/${order._id}/delivered`,
      {},
      config
    );
    dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
