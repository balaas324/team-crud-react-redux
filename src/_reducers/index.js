import { combineReducers } from "redux"
import members from "./members"
import teams from "./teams"
import auth from "./aut.reducers/auth"
import message from "./aut.reducers/message"


export default combineReducers({
    members,
    teams,
    auth,
    message
})