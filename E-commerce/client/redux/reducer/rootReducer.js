import { combineReducers } from "redux"
import categoriesReducer from "./categories"
import productReducer from "./products"
import shoppingCartReducer from "./shoppingCart"
import favoritesReducer from "./favorites"
import userReducer from "./user"
import adminReducer from "./admin"

const rootReducer = combineReducers({
  categoriesReducer,
  productReducer,
  shoppingCartReducer,
  favoritesReducer,
  userReducer,
  adminReducer
})

export default rootReducer; 
