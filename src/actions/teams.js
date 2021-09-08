import TeamServices from "../services/TeamService"
import {
    CREATE_TEAM,
    RETRIEVE_TEAMS,
    UPDATE_TEAM,
    DELETE_TEAM
} from "./types"


export const createTeam = (name, nation) => async(dispatch) => {
    try {
        const res = await TeamServices.create({ name, nation })

        dispatch({
            type: CREATE_TEAM,
            payload: res.data
        })

        return Promise.resolve(res.data)
    } catch (err){
        return Promise.reject(err)
    }
}

export const retrieveTeams =()=> async(dispatch)=>{
    try {
        const res = await TeamServices.getAll()

        dispatch({
            type: RETRIEVE_TEAMS,
            payload: res.data
        })
    } catch (err){
        console.log(err);
    }
}

export const updateTeam = (id, data)=>async(dispatch)=>{
    try {
        const res = await TeamServices.update(id,data)

        dispatch({
            type: UPDATE_TEAM,
            payload: data
        })

        return Promise.resolve(res.data)
    } catch(err){
        return Promise.reject(err)
    }
}

export const deleteTeam =(id)=>async(dispatch)=>{
    try{
        await TeamServices.remove(id)

        dispatch({
            type:DELETE_TEAM,
            payload: { id }
        })
    }catch(err){
        console.log(err);
    }
}

export const findTeamByName = (name) => async (dispatch) => {
    try {
      const res = await TeamServices.findByTeam(name);
  
      dispatch({
        type: RETRIEVE_TEAMS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
