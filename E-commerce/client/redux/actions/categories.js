import axios from 'axios';
import { GET_CATEGORIES,
    FILTER_BY_CATEGORIES,
} from './actionstype.js';
const BASEURL = 'http://localhost:3001/api';


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

export function filterByCategory(payload) {
    return {
       type: FILTER_BY_CATEGORIES,
       payload
    }
}
