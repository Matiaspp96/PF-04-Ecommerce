import axios from "axios";
import { CREATE_ORDER_USER, GET_ORDERS_USER, UPDATE_ORDER_USER } from "./actionstype";
import { BASEURL } from "./products";


export const getOrdersUser = (id) => {
  try {
    return async (dispatch) => {
      const response = await axios.get(`${BASEURL}/orders/${id}` );
      return dispatch({
        type: GET_ORDERS_USER,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const createOrderUser = (productsCart) => {
  try {
    return async (dispatch) => {
      const response = await axios.post(`${BASEURL}/orders`, productsCart);
      return dispatch({
        type: CREATE_ORDER_USER,
        payload: response.data._id,
      })
    };
  } catch (error) {
    console.log(error); 
  }
};


export const updateOrderUser = (id, shippingAddress) => {
  try {
    return async (dispatch) => {
        const response = await axios.put(`${BASEURL}/orders/${id}`, shippingAddress);
        return dispatch({
            type: UPDATE_ORDER_USER,
            payload: response.data,
          })
    };
  } catch (error) {
    console.log(error);
  }
};
