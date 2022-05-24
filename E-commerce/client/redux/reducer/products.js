import {
  GET_PRODUCTS,
  GET_DETAIL,
  GET_PRODUCTS_BY_NAME,
  ORDER_BY_NAME,
} from '../actions/actionstype.js' 

const initialState = {
  products: [],
  filter: [],
  details: {},
  backUp: [],
}

export default function productReducer(state= initialState, action) {
  switch (action.type) {

    case GET_PRODUCTS:
    console.log(action.payload.data)  
    return {
        ...state,
        products: action.payload.data,
        filter: action.payload,
      }
      
    case GET_DETAIL: 
      return {
        ...state,
        details: action.payload
      }

    case GET_PRODUCTS_BY_NAME:
      const nameSearch = state.products.filter((e) => {
        return e.name === action.payload;
      });
      if (nameSearch.length !== 0) {
        return {
          ...state,
          backUp: nameSearch,
        };
      } else {
        return {
          ...state,
          backUp: false
        }
      }
      
    // case ORDER_BY_NAME:
    //   let productsSort =
    //     action.payload === 'A - Z'
    //     ? state.backUp.sort((a, b) => {
    //       if(a.name > b.name) return 1;
    //       else {
    //         return -1;
    //       }
    //     })
    //     : state.backUp.sort((a, b) => {
    //       if(b.name > a.name) return -1;
    //       else {
    //         return 1;
    //       }
    //     })
    //   return {
    //     ...state,
    //     backUp: productsSort,
    //   }
    default:
      return state;
  }
}

