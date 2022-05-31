import axios from "axios"; 
import alert from 'sweetalert2';
import { GET_PRODUCTS,
    GET_PRODUCTS_BY_NAME,
    GET_DETAIL,
    ORDER_PRODUCTS
} from "./actionstype";

export const BASEURL = 'http://localhost:3001/api';

export const getAllProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASEURL}/products`);
    return dispatch({
      type: GET_PRODUCTS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err)
  }
};

export const getProductsByName = (name) => async (dispatch) => {
  try {
    // const responseProduct = await axios.get(`${BASEURL}/products?title=${title}`);
    const response = await axios.get(`${BASEURL}/products?name=${name}`);
    console.log(response)
    return dispatch({
      type: GET_PRODUCTS_BY_NAME,
      payload: response.data,
    });
  } catch (err) {
    console.log(err)
    alert.fire({
      title: 'Error!',
      text: 'We cant find these products',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }
};

export const getDetail = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASEURL}/products/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: response.data.data,
    });
  } catch (err) {
    console.log(err)
    alert.fire({
      title: 'Error!',
      text: 'We cant find these products',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }
};

export const orderProducts = (way)=>{
  return {
    type: ORDER_PRODUCTS,
    payload: way
}
}

