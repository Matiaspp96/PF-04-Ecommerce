import axios from "axios"; 
import alert from 'sweetalert2';
import { 
    GET_PRODUCTS,
    GET_PRODUCTS_BY_NAME,
    GET_DETAIL,
    ORDER_PRODUCTS_BY_NAME,
    ORDER_PRODUCTS_BY_PRICE,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT_REVIEWS,
    GET_PRODUCT_TOP
} from "./actionstype";

export const BASEURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : `${process.env.API_URL}/api`;
export const HOSTURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `${process.env.HOST_CLIENT}`;

// export const BASEURL = `${process.env.API_URL}/api`;

export const getAllProducts = () => async (dispatch) => {
    console.log(BASEURL)
  // config de axios, enviar headers con token tomado desde localstorage. 
  //  USAR EN RUTAS PROTEGIDAS 
  //  const localUser = localStorage.getItem(
  //    'userInfo');
  //  const userActive = JSON.parse(localUser);
  //    let configAxios = {};
   
  //  if(userActive){
  //   configAxios ={
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `${userActive.token}`,
  //     },
  //   }
  //  };
  try {
    const response = await axios.get(`${BASEURL}/products`);
   
    return dispatch(  {
      type: GET_PRODUCTS,
      payload:response.data.data
    });
  } catch (err) {
    console.log(err)
  }
};

export const getProductsByName = (name) => async (dispatch) => {
  try {
    // const responseProduct = await axios.get(`${BASEURL}/products?title=${title}`);
    const response = await axios.get(`${BASEURL}/products/name?name=${name}`);
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
    
  }
};

export const orderByPrice = (way)=>{
  return {
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: way
  }
}

export const orderByName = (e)=>{
  return {
    type: ORDER_PRODUCTS_BY_NAME,
    payload: e
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
  }
}


export const getProductsTop = () => async (dispatch) => {
  try {
    return dispatch ({
      type: GET_PRODUCT_TOP,
    })
  } catch (error) {
    console.log(error)
  }
}


