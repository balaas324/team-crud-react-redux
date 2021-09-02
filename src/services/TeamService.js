import http from "../http-common.js"

const getAll =()=>{
    return http.get("/teams")
}

const get =(id)=>{
    return http.get(`/team/${id}`)
}

const create =(data)=>{
    return http.post("/createteam", data)
}

const update = (id, data) =>{
    return http.put(`/team/${id}`, data)
}

const remove = (id) =>{
    return http.delete(`/team/${id}`)
}

const findByTitle = (name) => {
    return http.get(`/teams?name=${name}`)
}

const findByTeam = (teamName) =>{
    return http.get(`/member?teamName=${teamName}`)
}

const TeamServices = {
    getAll,
    get,
    create,
    update,
    remove,
    findByTitle,
    findByTeam
}

export default TeamServices;