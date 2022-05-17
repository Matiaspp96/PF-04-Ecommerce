//import actions
import {
  SEARCH_BY_NAME
} from "./rootReducer"


const initialState = {
  incognita: [],
  filter: [],
  backUp: []
}

export const reducer = (state = initialState, action) =>{
    switch (action.payload) {
        case value:

        case GET_ALL: 
        return {
          ...state,
          incognita: action.payload,
          filter: action.payload
        }

        case SEARCH_BY_NAME:
          const nameSearch = state.incognita.filter((e) => {
            return e.name === action.payload;
          });
          if (nameSearch.length !== 0) {
            return {
              ...state,
              backUp: nameSearch,
            };

          }       
        default:
            break;
    }
}
