import {
  GET_PRODUCTS,
  GET_DETAIL,
  GET_PRODUCTS_BY_NAME,
  ORDER_PRODUCTS,
  FILTER_BY_CATEGORIES,
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
    return {
        ...state,
        products: action.payload,
        filter: action.payload,
      }
      
    case GET_DETAIL: 
      return {
        ...state,
        details: action.payload
      }

    case FILTER_BY_CATEGORIES:
    const todo = state.filter;
    const categoriesProducts = 
      action.payload === 'All'
        ? todo
        : todo.filter((e) => e.category === action.payload) 
        return {
          ...state,
          products: categoriesProducts,
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

      case ORDER_PRODUCTS:
        if(action.payload === 'MIN'){
            let psOrdered = state.products.sort((a,b)=>{
                if(a.price < b.price) return -1;
                if(a.price > b.price) return 1;
                else return 0;
            });
            return {
                ...state,
                products: psOrdered,
            }
        }else if(action.payload === 'MAX') {
          let psOrdered = state.products.sort((a,b)=>{
              if(a.price < b.price) return 1;
              if(a.price > b.price) return -1;
              else return 0;
          });
          return {
              ...state,
              products: psOrdered,
          }
        }else if(action.payload === 'A-Z') {
          let psOrdered = state.products.sort((a,b)=>{
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            else return 0;
          });
          return {
            ...state,
            products: psOrdered,
        }
        }else if(action.payload === 'Z-A') {
          let psOrdered = state.products.sort((a,b)=>{
            if(a.name < b.name) return 1;
            if(a.name > b.name) return -1;
            else return 0;
          });
          return {
              ...state,
              products: psOrdered,
          }
      }

    default:
      return state;
  }
}

