import { combineReducers } from "redux"
import members from "./members"
import teams from "./teams"

export default combineReducers({
    members,
    teams
})