import {
  GET_PRODUCTS,
  GET_DETAIL,
  GET_PRODUCTS_BY_NAME,
  ORDER_PRODUCTS_BY_PRICE,
  ORDER_PRODUCTS_BY_NAME,
  FILTER_BY_CATEGORIES,
  GET_PRODUCT_REVIEWS,
  GET_PRODUCT_TOP
} from '../actions/actionstype.js' 

const initialState = {
  products: [],
  filter: [],
  productsTop: [],
  details: {},
  reviews: {},
  backUp: [],
}

export default function productReducer(state= initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
    return {
        ...state,
        products: action.payload,
        filter: action.payload,
        productsTop: action.payload.sort((a,b)=>{
          if(a.rating > b.rating) return -1;
          if(a.rating < b.rating) return 1;
          else return 0;
        }).slice(0,12)
      }
      
    case GET_DETAIL: 
      return {
        ...state,
        details: action.payload
      }

    case FILTER_BY_CATEGORIES:
    const todo = state.filter
    const categoriesProducts = 
      action.payload === 'All'
        ? todo
        : todo.filter(e => {
          if(Array.isArray(e.category)){
            if(e.category.includes(action.payload))
              return e
          }
        })
        return {
          ...state,
          products: categoriesProducts,
        }
        
    case GET_PRODUCTS_BY_NAME:
      return {
        ...state,
        products: action.payload.filter(e => e.stock > 0),
      }


    case ORDER_PRODUCTS_BY_PRICE:
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
      // }else if(action.payload === 'A-Z') {
      //   let psOrdered = state.products.sort((a,b)=>{
      //     if(a.name < b.name) return -1;
      //     if(a.name > b.name) return 1;
      //     else return 0;
      //   });
      //   return {
      //     ...state,
      //     products: psOrdered,
      // }
      // }else if(action.payload === 'Z-A') {
      //   let psOrdered = state.products.sort((a,b)=>{
      //     if(a.name < b.name) return 1;
      //     if(a.name > b.name) return -1;
      //     else return 0;
      //   });
        // return {
        //     ...state,
        //     products: psOrdered,
        // }
    }

    case ORDER_PRODUCTS_BY_NAME:
      if(action.payload === 'A-Z') {
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
    case GET_PRODUCT_REVIEWS: 
    return {
      ...state,
      reviews: action.payload
    }
    case GET_PRODUCT_TOP:
      let psOrdered = state.products.sort((a,b)=>{
        if(a.rating > b.rating) return -1;
        if(a.rating < b.rating) return 1;
        else return 0;
      });
      let psTop = psOrdered.slice(0,12)
      return {
      ...state,
      productsTop: psTop
      }
    default:
      return state;
  }
}

