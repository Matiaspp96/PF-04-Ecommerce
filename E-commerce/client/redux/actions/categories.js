import axios from 'axios';
import { GET_CATEGORIES,
    FILTER_BY_CATEGORIES,
} from './actionstype.js';
const BASEURL = 'http://localhost:3000/api';


export const getAllCategories = () => async (dispatch) => {
    try {
      const response = await axios.get(`${BASEURL}/categories`); 
      return dispatch({
        type: GET_CATEGORIES,
        payload: response.data,
      });
    } catch (err) {
      console.log(err)
    }
  };

  export function deleteCategory(id) {
    try {
      const response = await axios.get(`${BASEURL}/categories/${id}`)
      return dispatch({
        type: DELETE_CATEGORIES,
        payload: response.data
      })
    } catch (err) {
      console.log(error)
    }

}

export function filterByCategory(payload) {
    return {
       type: FILTER_BY_CATEGORIES,
       payload
    }
}

