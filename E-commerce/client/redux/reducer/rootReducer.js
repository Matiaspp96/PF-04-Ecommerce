import { combineReducers } from "redux"
import categoriesReducer from "./categories"
import productReducer from "./products"
import shoppingCartReducer from "./shoppingCart"
import favoritesReducer from "./favorites"
import userReducer from "./user"

const rootReducer = combineReducers({
  categoriesReducer,
  productReducer,
  shoppingCartReducer,
  favoritesReducer,
  userReducer
})

export default rootReducer; 
