import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message
})

export const clearMessage =(message)=>({
    type: CLEAR_MESSAGE,
    payload: message
})