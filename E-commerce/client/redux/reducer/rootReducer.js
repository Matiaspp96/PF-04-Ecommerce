import { combineReducers } from "redux"
import categoriesReducer from "./categories"
import productReducer from "./products"
import shoppingCartReducer from "./shoppingCart"
import favoritesReducer from "./favorites"

const rootReducer = combineReducers({
  categoriesReducer,
  productReducer,
  shoppingCartReducer,
  favoritesReducer,
})

export default rootReducer; 
