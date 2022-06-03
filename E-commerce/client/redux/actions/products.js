import axios from "axios"; 
import alert from 'sweetalert2';
import { 
    GET_PRODUCTS,
    GET_PRODUCTS_BY_NAME,
    GET_DETAIL,
    ORDER_PRODUCTS,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT_REVIEWS
} from "./actionstype";

<<<<<<< HEAD
export const BASEURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : `${process.env.API_URL}api`;
=======
export const BASEURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : `${process.env.API_URL}/api`;
>>>>>>> 56eecf2d20b2c2bd0df7dbf2f7e105c4a9213391
// export const BASEURL = `${process.env.API_URL}/api`;

export const getAllProducts = () => async (dispatch) => {
  console.log(process.env.API_URL)
  console.log(process.env.NODE_ENV)
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
export const addProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASEURL}/products`, product);
    return dispatch({
      type: CREATE_PRODUCT,
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


export const updateProduct = (id, data) => async (dispatch) => { 
  try {
    const response = await axios.put(`${BASEURL}/products/${id}`, data);
    return dispatch({
      type: UPDATE_PRODUCT,
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

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${BASEURL}/products/${id}`);
    return dispatch({
      type: DELETE_PRODUCT,
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

export const getProductReviews = (id)=> async (dispatch) => {
  try {
    const response = await axios.get(`${BASEURL}/reviews/${id}`);
    return dispatch ({
      type: GET_PRODUCT_REVIEWS,
      payload: response.data.data
    })
  } catch (error) {
    console.log(error)
    alert.fire({
      title: 'Error!',
      text: 'We could not find any reviews for this product',
      icon: 'error',
      confirmButtonText: 'Close'
    })
  }
}


