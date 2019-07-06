import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import jwt_decode from 'jwt-decode';
const url = 'https://flixx-v1.herokuapp.com/api';

//register

export const registerUser = (userData, history) => dispatch => {
  axios.post(`${url}/auth/register`, userData)
       .then(res=>{history.push('/login')

     }).catch(err=> dispatch({
       type: GET_ERRORS,
       payload: err.response.data
     }))
}

//login
export const loginUser = (userData)=> dispatch=>{
  axios.post(`${url}/auth/login`, userData)
        .then(res=>{
          //save to local storage
          const {token} = res.data;
          //set token to localstorage
          localStorage.setItem('jwt_token', token);
          //set token to auth header
          setAuthToken(token);
          //decode token to get userData
          const decoded = jwt_decode(token);
          //set current user
          dispatch(setCurrentUser(decoded))

        }).catch(err=> dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }))
}

//set logged in user

export const setCurrentUser = (decoded) =>{
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}


//log out user
export const logoutUser=()=>dispatch=>{
//rm jwt_token
localStorage.removeItem('jwt_token');
//rm auth header
setAuthToken(false);
//set setCurrentUser to {}
dispatch(setCurrentUser({}))


}
