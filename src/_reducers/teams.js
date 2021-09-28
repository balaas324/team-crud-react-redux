import {
    CREATE_TEAM,
    RETRIEVE_TEAMS,
    UPDATE_TEAM,
    DELETE_TEAM
} from "../_actions/types"

const initialState = []

const teamReducer = (teams=initialState,action)=>{
    const { type, payload } = action

    switch (type){
        case CREATE_TEAM:
            return [...teams, payload]

        case RETRIEVE_TEAMS:
            return payload

        case UPDATE_TEAM:
            return teams.map((team)=>{
                if (team.id === payload.id){
                    return {
                        ...team,
                        ...payload
                    }
                } else {
                    return team
                }
            })

        case DELETE_TEAM: 
            return teams.filter(({ id })=> id !== payload.id)

        default:
            return teams
    }
}

export default teamReducer
