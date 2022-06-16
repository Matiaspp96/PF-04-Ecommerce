import { GET_USER_DATA, GET_ALL_USERS } from "./actionstype";
import { configAxios } from "../../utils/axiosConfig";
import { BASEURL } from "./products";
import axios from "axios";

export const getUserData = (user)=>{
    return {
      type: GET_USER_DATA,
      payload: user
    }
}

export const getAllUsers = ()=> async(dispatch)=> {
  let axiosConfig = configAxios();
  try {
    const userResponse = await axios.get(`${BASEURL}/users/`, axiosConfig);
    return dispatch({
      type: GET_ALL_USERS,
      payload: userResponse.data.data
    })
  } catch (error) {
    console.log(error)
  } 
}