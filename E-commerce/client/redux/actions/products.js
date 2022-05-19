import axios from "axios"; 
import alert from 'sweetalert2';
import { GET_PRODUCTS,
    GET_PRODUCTS_BY_NAME,
    GET_DETAIL,
} from "./actionstype";

export const BASEURL = 'https://fakestoreapi.com';

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
    const response = await axios.get(`${BASEURL}/products/:${name}`);
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
    // const responseProduct = await axios.get(`${BASEURL}/products/${id}`);
    console.log(id)
    const response = await axios.get(`${BASEURL}/products/${id}`);
    console.log('hola')
    return dispatch({
      type: GET_DETAIL,
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