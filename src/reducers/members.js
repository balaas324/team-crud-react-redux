import {
    CREATE_MEMBER,
    RETRIEVE_MEMBERS,
    UPDATE_MEMBER,
    DELETE_MEMBER
} from "../actions/types"

const initialState = []

const memberReducer = (members = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case CREATE_MEMBER:
            return [...members, payload];
        
        case RETRIEVE_MEMBERS:
            return payload

        case UPDATE_MEMBER:
            return members.map((member)=>{
                if (member.id === payload.id) {
                    return {
                        ...member,
                        ...payload
                    }
                } else {
                    return member
                }
            })

        case DELETE_MEMBER:
            return members.filter(({ id }) =>  id !== payload.id)

        default:
            return members
    }
}

export default memberReducer;