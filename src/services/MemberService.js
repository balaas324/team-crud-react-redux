import http from "../http-common.js"

const getAll =()=>{
    return http.get("/members")
}

const get =(id)=>{
    return http.get(`/member/${id}`)
}

const create =(data)=>{
    return http.post("/createmember", data)
}

const update = (id, data) =>{
    return http.put(`/member/${id}`, data)
}

const remove = (id) =>{
    return http.delete(`/member/${id}`)
}

const findByTitle = (name) => {
    return http.get(`/members?name=${name}`)
}

const MemberServices = {
    getAll,
    get,
    create,
    update,
    remove,
    findByTitle
}

export default MemberServices;