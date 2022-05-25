import {
  GET_CATEGORIES,
  FILTER_BY_CATEGORIES
} from '../actions/actionstype.js' 

const initialState = {
  categories: [],
  filter: [],
  backUp: [],
}

export default function categoriesReducer(state = initialState, action) {
  switch(action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      }
      // case CREATE_CATEGORY:
      //     return {
      //         ...state
      //     }
      // case UPDATE_CATEGORY: {
      //     return {
            
      //         ...state
      //     }
      // }
      // case DELETE_CATEGORY: {
      //     return {
      //         ...state
      //     }
      // }

    default:
      return state;
  }
}
