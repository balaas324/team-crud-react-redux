import {
    CREATE_MEMBER,
    RETRIEVE_MEMBERS,
    BELONGTO_MEMBER,
    UPDATE_MEMBER,
    DELETE_MEMBER
} from "./types"

import MemberServices from "../services/MemberService"

export const createMember = (name, teamId, birthYear, injury) => async(dispatch) => {
    try {
        const res = await MemberServices.create({ name, teamId, birthYear, injury })

        dispatch({
            type: CREATE_MEMBER,
            payload: res.data
        })

        return Promise.resolve(res.data)
    } catch (err){
        return Promise.reject(err)
    }
}

export const retrieveMembers = () => async (dispatch) => {
    try {
        const res = await MemberServices.getAll()

        dispatch({
            type: RETRIEVE_MEMBERS,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const updateMember = (id, data) => async (dispatch) => {
    try {
        const res = await MemberServices.update(id, data)

        dispatch({
            type: UPDATE_MEMBER,
            payload: data
        })

        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const deleteMember = (id) => async (dispatch) => {
    try {
      await MemberServices.remove(id);
  
      dispatch({
        type: DELETE_MEMBER,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

export const findMemberByName = (title) => async (dispatch) => {
    try {
      const res = await MemberServices.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_MEMBERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const memberBelongsToTeam =(teamId)=>async(dispatch)=>{
  try{
    const res = await MemberServices.memberBelongsToTeam(teamId)

    dispatch({
      type: BELONGTO_MEMBER,
      payload: res.data
    })
  } catch (err){
    console.log(err);
  }
}