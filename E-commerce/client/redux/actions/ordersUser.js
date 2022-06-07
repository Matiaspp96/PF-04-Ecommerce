import axios from "axios";
import { CREATE_ORDER_USER, GET_ORDERS_USER, UPDATE_ORDER_USER } from "./actionstype";
import { BASEURL } from "./products";


export const getOrdersUser = () => {
  try {
    return async (dispatch) => {
      const response = await axios.get(`${BASEURL}/orders` );
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
        payload: response.data,
      })
    };
  } catch (error) {
    console.log(error); 
  }
};


export const updateOrderUser = (id, shipping_address) => {
  try {
    return async (dispatch) => {
        const response = await axios.put(`${BASEURL}/orders/${id}`, shipping_address);
        return dispatch({
            type: UPDATE_ORDER_USER,
            payload: response.data,
          })
    };
  } catch (error) {
    console.log(error);
  }
};
