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
    case FILTER_BY_CATEGORIES:
      const allCategories = state.filter
      const categoriesProducts = 
        action.payload === 'All'
          ? allCategories
          : allCategories.filter((e) => e.category === action.payload) 
      return {
        ...state,
        backUp: categoriesProducts,
      }
    default:
      return state;
  }
}
