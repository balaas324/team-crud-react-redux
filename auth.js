import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";

 import AuthService from "../../services/auth.services/auth.service";

export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password)
        .then((res)=>{
            dispatch({
                type:REGISTER_SUCCESS,
            })
            dispatch({
                type:SET_MESSAGE,
                payload: res.data.message,
            })

            return Promise.resolve()
        },
        (err)=>{
            const message = 
            (err.response &&
              err.response.data &&
              err.response.data.message) ||
            err.message ||
            err.toString() 

            dispatch({
                type: REGISTER_FAIL
            })

            dispatch({
                type:SET_MESSAGE,
                payload: message
            })

            return Promise.reject()
        }
        )
}

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username,  password)
        .then((res)=>{
            console.log(res);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: res },
            });

            return Promise.resolve()
        },
        (err)=>{
            const message = 
            (err.response&&
                err.response.data &&
                err.response.data.message) ||
              err.message ||
              err.toString() 

            dispatch({
                type:LOGIN_FAIL
            })
            dispatch({
                type:SET_MESSAGE,
                payload: message
            })

            return Promise.reject()
        }
        )
}

export const logout = () => (dispatch) => {
    AuthService.logout()

    dispatch({
        type: LOGOUT
    })
}