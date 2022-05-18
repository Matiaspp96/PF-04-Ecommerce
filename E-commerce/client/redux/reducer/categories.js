import {
  GET_CATEGORIES,
  FILTER_BY_CATEGORIES
} from './actions/actionstype.js' 

const initialState = {
  categories: [],
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
        let categoriesProducts = 
        action.payload === 'All'
          ? allCategories
          : allCategories.filter(e => e.categoria.nombre === action.payload) // ajustar el categoria.nombre
      return {
        ...state,
        backUp: categoriesProducts,
      }
    default:
      return state;
  }
}
