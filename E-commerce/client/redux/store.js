import { legacy_createStore as createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./reducer/rootReducer"

const middleware = [thunk]

const makeStore = () => createStore(rootReducer, compose(applyMiddleware(...middleware)))

export const wrapper = createWrapper(makeStore)