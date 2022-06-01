import axios from 'axios';
import { 
  GET_CATEGORIES,
  FILTER_BY_CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORIES,
  UPDATE_CATEGORY,
} from './actionstype.js';

export const BASEURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : `${process.env.API_URL}/api`;

export const getAllCategories = () => async (dispatch) => {
    try {
      const response = await axios.get(`${BASEURL}/categories`); 
      return dispatch({
        type: GET_CATEGORIES,
        payload: response.data.data,
      });
    } catch (err) {
      console.log(err)
    }
  };

export async function createCategory(name) {

  // let value = { payload: name }
  let value = name 
  // return async function (dispatch) {
  try {
    const response = await axios.post(`${BASEURL}/categories`,value);
    return dispatch({
        type: CREATE_CATEGORY,
        payload: response.data
    })
  } catch (error) {
      console.log(error)
  }
}

export async function deleteCategory(id){
  try {
    const response = await axios.delete(`${BASEURL}/categories/${id}`); 
    return dispatch({
      type: DELETE_CATEGORIES,
      payload: response.data,
    });
  } catch (error) {
    console.log(error)
  }
};

export async function updateCategory(name) {
  let value = name
  try {
    const response = await axios.put(`${BASEURL}/categories/${id}`, value);
    return dispatch({
      type: UPDATE_CATEGORY,
      payload: response.data,
    })

  } catch (error) {
    console.log(error)
  }
}

export function filterByCategory(payload) {
    return {
       type: FILTER_BY_CATEGORIES,
       payload
    }
}

