import axios from "axios"

const API_URL = "http://localhost:3030/api/auth/"

const register = (username, email, password) => {
    return axios.post(API_URL + "signup",{
        username,
        email,
        password
    })
}

const login = async (username, password) => {
    const res = await axios
        .post(API_URL + "signin", {
            username,
            password
        })

        console.log(JSON.stringify(res.data));
    if (res.data.accesToken) {
        localStorage.setItem("user", JSON.stringify(res.data))
    }
    console.log(localStorage);
    return res.data
}

const logout =()=>{
    localStorage.removeItem("user")
}

export default {
    register,
    login,
    logout
}