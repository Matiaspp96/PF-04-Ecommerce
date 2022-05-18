import { combineReducers } from "redux"
import categoriesReducer from "./categories"
import productReducer from "./products"
import shoppingCartReducer from "./shoppingCart"


const rootReducer = combineReducers({
  categoriesReducer,
  productReducer,
  shoppingCartReducer
})

export default rootReducer; 
