import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:3030/api/list",
    headers: {
        "Content-type": "application/json"
    }
})
