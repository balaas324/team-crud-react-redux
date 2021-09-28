import { combineReducers } from "redux"
import message from "./message"
import auth from "./auth"

export default combineReducers({
    auth,
    message
})