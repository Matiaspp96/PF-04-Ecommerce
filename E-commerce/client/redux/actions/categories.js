import axios from 'axios';
import { GET_CATEGORIES,
    FILTER_BY_CATEGORIES,
} from './actionstype.js';
const BASEURL = 'http://localhost:3001' || process.env.API_URL;


export const getAllCategories = () => async (dispatch) => {
    try {
      const response = await axios.get(`${BASEURL}/products/categories`); // request fake_api
      return dispatch({
        type: GET_CATEGORIES,
        payload: response.data,
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